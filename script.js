// Global variables
let map;
let allMarkers = [];
let filteredSites = religiousSites;
let contourPolygons = []; // Store contour polygon references for zoom control

// Initialize the map when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    populateFilters();
    setupEventListeners();
    updateCountdowns();
    populateLegend(); // Add legend population
    setInterval(updateCountdowns, 1000);
});

// Initialize the Leaflet map
function initializeMap() {
    // Create map centered on India with tighter bounds
    map = L.map('map', {
        minZoom: 5,
        maxZoom: 7,
        zoomControl: false,
        attributionControl: true
    }).setView([22.5937, 78.9629], 5);
    
    // Explicitly remove zoom control if it exists
    if (map.zoomControl) {
        map.removeControl(map.zoomControl);
    }
    
    // Define tighter bounds for India only
    // Southwest corner: [6°N, 68°E] (Southern India, Western border)
    // Northeast corner: [37°N, 97°E] (Northern India, Eastern border)
    const indiaBounds = L.latLngBounds([6, 68], [37, 97]);
    
    // Set max bounds to restrict panning
    map.setMaxBounds(indiaBounds);
    
    // Add padding to bounds to allow some movement but stay within India
    map.on('drag', function() {
        map.panInsideBounds(indiaBounds, { animate: false });
    });
    
    // Restrict zoom out to always show India properly and fade contours on zoom in
    map.on('zoomend', function() {
        if (map.getZoom() < 5) {
            map.setView([22.5937, 78.9629], 5);
        }
        
        // Fade contours when zoom level > 3
        const currentZoom = map.getZoom();
        const fadeOpacity = currentZoom > 3 ? Math.max(0.1, 1 - ((currentZoom - 3) * 0.3)) : 1;
        
        contourPolygons.forEach((polygon, index) => {
            if (polygon) {
                const originalOpacity = (index === 0) ? 0.4 : 0.8; // Same as creation logic
                polygon.setStyle({
                    opacity: originalOpacity * fadeOpacity
                });
            }
        });
    });
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetMap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 7
    }).addTo(map);
    
    // Load India administrative boundaries (states)
    loadIndiaStateBoundaries();
    
    // Add all markers to the map
    addMarkersToMap(religiousSites);
}

// Load and display India state boundaries from GeoJSON
function loadIndiaStateBoundaries() {
    // Load state boundaries first
    fetch('india-adm.geojson')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(geojsonData => {
            // Add state boundaries GeoJSON layer to map
            L.geoJSON(geojsonData, {
                style: function(feature) {
                    return {
                        fillColor: 'transparent',
                        weight: 1,
                        opacity: 0.8,
                        color: '#8e44ad',
                        fillOpacity: 0.1
                    };
                },
                onEachFeature: function(feature, layer) {
                    // Add popup with state name if available
                    if (feature.properties && feature.properties.shapeName) {
                        layer.bindPopup(`<strong>${feature.properties.shapeName}</strong>`);
                    } else if (feature.properties && feature.properties.NAME_1) {
                        layer.bindPopup(`<strong>${feature.properties.NAME_1}</strong>`);
                    } else if (feature.properties && feature.properties.name) {
                        layer.bindPopup(`<strong>${feature.properties.name}</strong>`);
                    }
                    
                    // Store original style
                    const originalStyle = {
                        weight: 1,
                        color: '#8e44ad',
                        fillOpacity: 0.1,
                        fillColor: 'transparent'
                    };
                    
                    let stateLabel = null;
                    
                    // Add enhanced hover effects
                    layer.on({
                        mouseover: function(e) {
                            const layer = e.target;
                            const feature = layer.feature;
                            
                            // Fill the state and make it prominent
                            layer.setStyle({
                                weight: 3,
                                color: '#8e44ad',
                                fillColor: '#8e44ad',
                                fillOpacity: 1
                            });
                            
                            // Add state name label
                            const stateName = (feature.properties.shapeName || feature.properties.NAME_1 || feature.properties.name || 'Unknown State').toUpperCase();
                            const bounds = layer.getBounds();
                            const center = bounds.getCenter();
                            
                            // Create a simple text label
                            const labelIcon = L.divIcon({
                                className: 'state-label',
                                html: `<div class="state-name-text">${stateName}</div>`,
                                iconSize: [200, 30],
                                iconAnchor: [100, 15]
                            });
                            
                            stateLabel = L.marker(center, { icon: labelIcon }).addTo(map);
                        },
                        mouseout: function(e) {
                            const layer = e.target;
                            
                            // Restore original style
                            layer.setStyle(originalStyle);
                            
                            // Remove state label
                            if (stateLabel) {
                                map.removeLayer(stateLabel);
                                stateLabel = null;
                            }
                        }
                    });
                }
            }).addTo(map);
            
            console.log('India state boundaries loaded successfully');
        })
        .catch(error => {
            console.warn('Could not load India state boundaries:', error);
            console.log('Make sure india-adm.geojson file is in the same directory as index.html');
        });
    
    // Load India border for offset contours effect AND reverse mask
    fetch('india-border.geojson')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(geojsonData => {
            // Define 4 colors fading from purple (inner) to black (outer)
            const purpleToBlackShades = [
                '#2c2c2cff', // Near black (outermost ring)
                '#3a183aff', // Dark purple-black
                '#632d63ff', // Medium purple
                '#753391ff'  // Bright purple (innermost ring, near border)
            ];
            
            // Create offset distances (in approximate degrees - rough buffer simulation)
            const offsetDistances = [1.2, 0.9, 0.6, 0.3]; // Decreasing distances for inner rings
            
            // Get India's coordinates from the GeoJSON
            const indiaFeature = geojsonData.features[0];
            let indiaCoords = [];
            
            // Handle different geometry types
            if (indiaFeature.geometry.type === 'Polygon') {
                indiaCoords = indiaFeature.geometry.coordinates[0].map(coord => [coord[1], coord[0]]);
            } else if (indiaFeature.geometry.type === 'MultiPolygon') {
                // Use the largest polygon (mainland India)
                let largestPoly = indiaFeature.geometry.coordinates[0];
                for (let poly of indiaFeature.geometry.coordinates) {
                    if (poly[0].length > largestPoly[0].length) {
                        largestPoly = poly;
                    }
                }
                indiaCoords = largestPoly[0].map(coord => [coord[1], coord[0]]);
            }
            
            // Function to create proper offset contours (perpendicular distance buffering)
            function createOffsetContour(coords, distance) {
                const offsetCoords = [];
                
                for (let i = 0; i < coords.length; i++) {
                    const prevIndex = (i - 1 + coords.length) % coords.length;
                    const nextIndex = (i + 1) % coords.length;
                    
                    const prev = coords[prevIndex];
                    const curr = coords[i];
                    const next = coords[nextIndex];
                    
                    // Calculate vectors from current point
                    const v1 = [curr[0] - prev[0], curr[1] - prev[1]];
                    const v2 = [next[0] - curr[0], next[1] - curr[1]];
                    
                    // Normalize vectors
                    const len1 = Math.sqrt(v1[0] * v1[0] + v1[1] * v1[1]);
                    const len2 = Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1]);
                    
                    if (len1 > 0) {
                        v1[0] /= len1;
                        v1[1] /= len1;
                    }
                    if (len2 > 0) {
                        v2[0] /= len2;
                        v2[1] /= len2;
                    }
                    
                    // Calculate perpendicular vectors (rotate 90 degrees)
                    const perp1 = [-v1[1], v1[0]];
                    const perp2 = [-v2[1], v2[0]];
                    
                    // Average the perpendicular vectors for the normal at this point
                    let normal = [(perp1[0] + perp2[0]) / 2, (perp1[1] + perp2[1]) / 2];
                    const normalLen = Math.sqrt(normal[0] * normal[0] + normal[1] * normal[1]);
                    
                    if (normalLen > 0) {
                        normal[0] /= normalLen;
                        normal[1] /= normalLen;
                    }
                    
                    // Apply distance offset in the normal direction
                    offsetCoords.push([
                        curr[0] + normal[0] * distance,
                        curr[1] + normal[1] * distance
                    ]);
                }
                
                return offsetCoords;
            }
            
            // CREATE REVERSE MASK FIRST (black world with India hole)
            const worldWithIndiaHole = L.polygon([
                // Outer ring - covers the entire world
                [
                    [-90, -180],
                    [90, -180], 
                    [90, 180],
                    [-90, 180],
                    [-90, -180]
                ],
                // Inner ring (hole) - India's shape
                indiaCoords
            ], {
                fillColor: 'black',
                fillOpacity: 0.9,
                weight: 0,
                color: 'transparent'
            });
            
            // Add the mask with hole to map FIRST
            worldWithIndiaHole.addTo(map);
            
            // Create 4 offset contour rings (from outer to inner) ON TOP of mask
            contourPolygons = []; // Clear any existing references
            for (let i = 0; i < 4; i++) {
                const bufferedCoords = createOffsetContour(indiaCoords, offsetDistances[i]);
                
                // Set specific opacity for the outermost ring (#1a1a1a)
                const baseOpacity = (i === 0) ? 0.4 : 0.8;
                
                // Apply initial fade based on current zoom level (same as zoom handler)
                const currentZoom = map.getZoom();
                const fadeOpacity = currentZoom > 3 ? Math.max(0.1, 1 - ((currentZoom - 3) * 0.3)) : 1;
                const initialOpacity = baseOpacity * fadeOpacity;
                
                const contourPolygon = L.polygon(bufferedCoords, {
                    fillColor: 'transparent',
                    fillOpacity: 0,
                    weight: 3,
                    opacity: initialOpacity,
                    color: purpleToBlackShades[i]
                }).addTo(map);
                
                // Store reference for zoom-based opacity control
                contourPolygons.push(contourPolygon);
            }
            
            // Add the original India border on top with thick outline
            L.geoJSON(geojsonData, {
                style: function(feature) {
                    return {
                        fillColor: 'transparent',
                        weight: 6,
                        opacity: 1,
                        color: '#663399', // Deep purple for the main border
                        fillOpacity: 0
                    };
                }
            }).addTo(map);
            
            console.log('India offset contours with reverse mask loaded successfully');
        })
        .catch(error => {
            console.warn('Could not load India border for contours and mask:', error);
            console.log('Make sure india-border.geojson file is in the same directory as index.html');
        });
}

// Add markers for religious sites
function addMarkersToMap(sites) {
    // Clear existing markers
    allMarkers.forEach(marker => map.removeLayer(marker));
    allMarkers = [];
    
    sites.forEach(site => {
        // Create custom icon with neutral color
        const icon = L.divIcon({
            className: `custom-marker marker-${site.religion}`,
            html: `<div style="background-color: #ffffffff; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center; font-size: 12px; box-sizing: border-box;">${renderIcon(site.religion, '16px', '', true)}</div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
        
        // Create marker
        const marker = L.marker(site.coordinates, { icon: icon });
        
        // Create hover popup content (simplified)
        const hoverPopupContent = createHoverPopupContent(site);
        marker.bindPopup(hoverPopupContent, {
            autoPan: false,
            closeButton: false
        });
        
        // Add hover events to show popup
        marker.on('mouseover', function() {
            this.openPopup();
        });
        
        marker.on('mouseout', function() {
            this.closePopup();
        });
        
        // Add click event to show detailed modal
        marker.on('click', function() {
            showSiteDetailsModal(site);
        });
        
        // Store site data with marker for filtering
        marker.siteData = site;
        
        marker.addTo(map);
        allMarkers.push(marker);
    });
}

// Create hover popup content for markers (simplified)
function createHoverPopupContent(site) {
    const isOptimal = isOptimalTime(site.bestMonths);
    const optimalStatus = isOptimal ? 
        '<div style="color: green; font-weight: bold; font-size: 0.85em;">🌟 Great time to visit!</div>' : 
        '<div style="color: orange; font-weight: bold; font-size: 0.85em;">⏰ Check best time to visit</div>';
    
    return `
        <div class="hover-popup-content">
            <div class="popup-title" style="font-size: 1.1em; margin-bottom: 5px;">${site.name}</div>
            <div class="popup-religion" style="font-size: 0.9em; margin-bottom: 8px;">${renderIcon(site.religion, '14px')} ${site.religion.charAt(0).toUpperCase() + site.religion.slice(1)} • ${site.state}</div>
            ${optimalStatus}
            <div style="margin-top: 8px; font-size: 0.8em; color: #666;">Click for details</div>
        </div>
    `;
}

// Create popup content for markers (legacy function, now used for hover)
function createPopupContent(site) {
    const isOptimal = isOptimalTime(site.bestMonths);
    const optimalStatus = isOptimal ? 
        '<div style="color: green; font-weight: bold;">🌟 Great time to visit!</div>' : 
        '<div style="color: orange; font-weight: bold;">⏰ Check best time to visit</div>';
    
    const mainPhoto = site.photos && site.photos.length > 0 ? 
        `<img src="${site.photos[0].url}" alt="${site.name}" class="popup-photo" onerror="this.style.display='none'">` : '';
    
    return `
        <div class="popup-content">
            ${mainPhoto}
            <div class="popup-title">${site.name}</div>
            <div class="popup-religion">${renderIcon(site.religion, '16px')} ${site.religion.charAt(0).toUpperCase() + site.religion.slice(1)} • ${site.state}</div>
            ${optimalStatus}
            <button class="popup-btn" onclick="showSiteDetails(${site.id})">View Details</button>
        </div>
    `;
}

// Helper function to render icon (emoji or image)
function renderIcon(religion, size = '16px', className = '', forMarker = false) {
    const iconValue = religionIcons[religion];
    if (!iconValue) return '';
    
    if (forMarker) {
        // For map markers, the icon should fit within the existing colored circle
        if (iconValue.includes('.')) {
            // Make image icons bigger to match emoji visual size
            const imageSize = Math.min(parseInt(size) * 1.2, 16); // Bigger than emojis - max 16px
            return `<img src="${iconValue}" alt="${religion} icon" style="width: ${imageSize}px; height: ${imageSize}px; object-fit: contain; border-radius: 50%;" class="${className}" onerror="this.style.display='none'">`;
        } else {
            // Make emoji bigger for map markers so they're visible
            let markerEmojiSize = Math.min(parseInt(size) * 0.8, 12); // Bigger - max 12px for map markers
            // Make Sikh icon slightly bigger
            if (religion === 'sikh') {
                markerEmojiSize = Math.min(parseInt(size) * 0.9, 14); // Slightly bigger for Sikh
            }
            return `<span style="font-size: ${markerEmojiSize}px;" class="${className}">${iconValue}</span>`;
        }
    } else {
        // For other uses (sidebar, popups), add a white circular background for ALL icons
        const baseSize = parseInt(size);
        const circleSize = Math.max(24, baseSize + 8); // Ensure minimum circle size
        const iconSize = Math.min(baseSize * 0.8, 12); // Same size as map markers - max 12px
        
        if (iconValue.includes('.')) {
            // Image icon - make bigger to match emoji visual size
            const imageIconSize = Math.min(baseSize * 1.2, 16); // Bigger than emojis - max 16px
            return `<div class="icon-circle ${className}" style="width: ${circleSize}px; height: ${circleSize}px; min-width: ${circleSize}px; min-height: ${circleSize}px;">
                        <img src="${iconValue}" alt="${religion} icon" style="width: ${imageIconSize}px; height: ${imageIconSize}px;" onerror="this.parentElement.style.display='none'">
                    </div>`;
        } else {
            // Emoji icon - same size as map markers
            let iconSize = Math.min(baseSize * 0.8, 12); // Same size as map markers - max 12px
            // Make Sikh icon slightly bigger
            if (religion === 'sikh') {
                iconSize = Math.min(baseSize * 0.9, 14); // Slightly bigger for Sikh
            }
            return `<div class="icon-circle ${className}" style="width: ${circleSize}px; height: ${circleSize}px; min-width: ${circleSize}px; min-height: ${circleSize}px;">
                        <span style="font-size: ${iconSize}px;">${iconValue}</span>
                    </div>`;
        }
    }
}

// Helper function to get image filename from site name
function getSiteImagePath(siteName) {
    // Map of site names to their corresponding image files
    const imageMap = {
        'Golden Temple (Harmandir Sahib)': 'Golden-Temple-Amritsar.jpg',
        'Kedarnath Temple': 'Kedarnath-Temple.jpg',
        'Meenakshi Temple, Madurai': 'Meenakshi-Temple.jpg',
        'Madurai Meenakshi Temple': 'Meenakshi-Temple.jpg',
        'Somnath Temple': 'Shree-Somnath-Temple.jpg',
        'Shri Kalkaji Mandir': 'Shri-Kalkaji-Mandir.jpg',
        'Tirupati Balaji Temple': 'tirupati-bala-ji-temple.webp',
        'Venkateswara Temple, Tirumala': 'tirupati-bala-ji-temple.webp',
        'Vaishno Devi Temple': 'vaishno-devi-mandir.jpg'
    };
    
    return imageMap[siteName] ? `img/${imageMap[siteName]}` : null;
}

// Show detailed site information in modal
function showSiteDetailsModal(siteId) {
    const site = typeof siteId === 'object' ? siteId : religiousSites.find(s => s.id === siteId);
    if (!site) return;
    
    const modal = document.getElementById('siteModal');
    const title = document.getElementById('siteModalTitle');
    const content = document.getElementById('siteModalBody');
    
    const isOptimal = isOptimalTime(site.bestMonths);
    const nextOptimal = isOptimal ? null : getNextOptimalTime(site.bestMonths);
    
    const upcomingFestivals = site.festivals
        .map(festival => {
            const countdown = calculateTimeUntil(festival.date);
            return { ...festival, countdown };
        })
        .filter(festival => !festival.countdown.expired)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Set modal title
    title.innerHTML = `${renderIcon(site.religion, '24px')} ${site.name}`;
    
    // Get image path from img folder
    const imagePath = getSiteImagePath(site.name);
    
    // Create photo display (using img folder or existing photos)
    let photoDisplay = '';
    
    if (imagePath) {
        // Use image from img folder
        photoDisplay = `
            <div class="photo-gallery">
                <div class="photo-main" onclick="openPhotoModal('${imagePath}', '${site.name}')">
                    <img src="${imagePath}" alt="${site.name}" onerror="this.style.display='none'">
                    <div class="photo-caption">
                        ${site.name}
                        <div class="photo-credit">📷 Local Image</div>
                    </div>
                </div>
            </div>
        `;
    } else if (site.photos && site.photos.length > 0) {
        // Fallback to existing photos if available
        photoDisplay = `
            <div class="photo-gallery">
                <div class="photo-main" onclick="openPhotoModal('${site.photos[0].url}', '${site.photos[0].caption}')">
                    <img src="${site.photos[0].url}" alt="${site.name}" onerror="this.style.display='none'">
                    <div class="photo-caption">
                        ${site.photos[0].caption}
                        <div class="photo-credit">📷 ${site.photos[0].credit}</div>
                    </div>
                </div>
                ${site.photos.length > 1 ? `
                    <div class="photo-thumbnails">
                        ${site.photos.map((photo, index) => `
                            <div class="photo-thumb ${index === 0 ? 'active' : ''}" 
                                 onclick="switchMainPhoto(${index}, '${site.id}')">
                                <img src="${photo.url}" alt="${photo.caption}" onerror="this.parentElement.style.display='none'">
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    }
    
    content.innerHTML = `
        <div class="site-info">
            ${photoDisplay}
            
            <div class="site-details">
                <div class="location-religion-container">
                    <div class="detail-item compact">
                        <div class="detail-label">Location</div>
                        <div class="detail-value">${site.state}, India</div>
                    </div>
                    
                    <div class="detail-item compact">
                        <div class="detail-label">Religion</div>
                        <div class="detail-value">${site.religion.charAt(0).toUpperCase() + site.religion.slice(1)}</div>
                    </div>
                </div>
                
                <div class="detail-item compact">
                    <div class="detail-label">Description</div>
                    <div class="detail-value">
                        ${site.significance}.
                        ${site.description}
                    </div>
                </div>
                
                <div class="detail-item compact">
                    <div class="detail-label">Travel Information</div>
                    <div class="detail-value">
                        <div class="transport-box">✈️ ${site.nearestAirport}</div>
                        <div class="transport-box">🚂 ${site.nearestRailway}</div>
                        <br><br>
                        ${site.travelTips}
                        The best time to visit is ${site.bestTimeToVisit} which is in
                        ${isOptimal ? 
                            '<span style="color: #4CAF50; font-weight: bold;">Perfect time to visit now! 🎉</span>' : 
                            `<span style="color: #FF9800;">${nextOptimal ? nextOptimal.message : 'Check calendar'}.</span>`
                        }
                    </div>
                </div>
            </div>
            
            ${upcomingFestivals.length > 0 ? `
                <div class="countdown-timer festivals-narrow">
                    <h4>🎊 Upcoming Festivals</h4>
                    ${upcomingFestivals.map(festival => `
                            <div style="margin-bottom: 15px; ${festival.rarity === 'every_144_years' || festival.rarity === 'every_12_years' ? 'border: 2px solid #ff6b35; border-radius: 8px; padding: 10px; background: rgba(255, 107, 53, 0.1);' : ''}">
                                <strong>${festival.name}</strong>
                                ${festival.rarity ? `<span class="festival-rarity rarity-${festival.rarity}">${festival.rarity.replace(/_/g, ' ').toUpperCase()}</span>` : ''}
                                <br>
                                <small>${festival.description}.</small><br>
                                ${festival.specialNote ? `<div class="special-note">⭐ ${festival.specialNote}</div>` : ''}
                                <div style="background: rgba(255,255,255,0.2); padding: 8px; border-radius: 5px; margin-top: 8px;">
                                    ⏰ ${festival.countdown.message}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : `
                    <div class="countdown-timer festivals-narrow">
                        <h4>🎊 Upcoming Festivals</h4>
                        <p>No upcoming festivals scheduled</p>
                    </div>
                `}
        </div>
    `;
    
    modal.style.display = 'block';
}

// Legacy function for backward compatibility (now redirects to modal)
function showSiteDetails(siteId) {
    // Close countdown modal if it's open
    const countdownModal = document.getElementById('countdownModal');
    if (countdownModal && countdownModal.style.display === 'block') {
        countdownModal.style.display = 'none';
    }
    
    showSiteDetailsModal(siteId);
}

// Populate filter dropdowns
function populateFilters() {
    const stateDropdown = document.getElementById('stateDropdown');
    
    // Extract unique states from religious sites
    const states = [...new Set(religiousSites.map(site => site.state))].sort();
    
    // Add states to custom dropdown
    states.forEach(state => {
        const item = document.createElement('div');
        item.className = 'dropdown-item';
        item.setAttribute('data-value', state);
        item.textContent = state;
        stateDropdown.appendChild(item);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Custom dropdown functionality
    setupCustomDropdowns();
    
    // Keep these for compatibility (they'll be used by custom dropdowns)
    // Religion filter - now handled by custom dropdown
    // State filter - now handled by custom dropdown
    
    // Search box with dropdown
    const searchBox = document.getElementById('searchBox');
    const searchDropdown = document.getElementById('searchDropdown');
    
    searchBox.addEventListener('input', function() {
        const searchText = this.value.toLowerCase();
        if (searchText.length >= 2) {
            showSearchDropdown(searchText);
        } else {
            hideSearchDropdown();
        }
        applyFilters();
    });
    
    searchBox.addEventListener('focus', function() {
        const searchText = this.value.toLowerCase();
        if (searchText.length >= 2) {
            showSearchDropdown(searchText);
        }
    });
    
    searchBox.addEventListener('blur', function() {
        // Delay hiding to allow click on dropdown items
        setTimeout(() => hideSearchDropdown(), 200);
    });
    
    // Click outside to close dropdown
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.search-container')) {
            hideSearchDropdown();
        }
    });
    
    // Site details card
    const closeSiteCard = document.getElementById('closeSiteCard');
    
    if (closeSiteCard) {
        closeSiteCard.addEventListener('click', function() {
            const siteDetailsCard = document.getElementById('siteDetailsCard');
            siteDetailsCard.classList.remove('show');
        });
    }
    
    // Countdown modal
    const modal = document.getElementById('countdownModal');
    const closeModal = modal.querySelector('.close');
    
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    // Site details modal
    const siteModal = document.getElementById('siteModal');
    const closeSiteModal = document.getElementById('closeSiteModal');
    
    if (closeSiteModal) {
        closeSiteModal.addEventListener('click', function() {
            siteModal.style.display = 'none';
        });
    }
    
    // Photo modal
    const photoModal = document.getElementById('photoModal');
    const photoModalClose = photoModal.querySelector('.photo-modal-close');
    
    photoModalClose.addEventListener('click', function() {
        photoModal.style.display = 'none';
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
        if (event.target === photoModal) {
            photoModal.style.display = 'none';
        }
        if (event.target === siteModal) {
            siteModal.style.display = 'none';
        }
    });
}

// Setup custom dropdowns to match search dropdown styling
function setupCustomDropdowns() {
    // Initialize filter values
    window.currentReligionFilter = 'all';
    window.currentStateFilter = 'all';
    
    // Religion dropdown
    const religionBtn = document.getElementById('religionFilterBtn');
    const religionDropdown = document.getElementById('religionDropdown');
    
    religionBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        // Close state dropdown if open
        document.getElementById('stateDropdown').style.display = 'none';
        // Toggle religion dropdown
        religionDropdown.style.display = religionDropdown.style.display === 'block' ? 'none' : 'block';
    });
    
    // Religion dropdown items
    religionDropdown.addEventListener('click', function(e) {
        if (e.target.classList.contains('dropdown-item')) {
            const value = e.target.getAttribute('data-value');
            const text = e.target.textContent;
            religionBtn.textContent = text;
            window.currentReligionFilter = value;
            religionDropdown.style.display = 'none';
            applyFilters();
        }
    });
    
    // State dropdown
    const stateBtn = document.getElementById('stateFilterBtn');
    const stateDropdown = document.getElementById('stateDropdown');
    
    stateBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        // Close religion dropdown if open
        religionDropdown.style.display = 'none';
        // Toggle state dropdown
        stateDropdown.style.display = stateDropdown.style.display === 'block' ? 'none' : 'block';
    });
    
    // State dropdown items
    stateDropdown.addEventListener('click', function(e) {
        if (e.target.classList.contains('dropdown-item')) {
            const value = e.target.getAttribute('data-value');
            const text = e.target.textContent;
            stateBtn.textContent = text;
            window.currentStateFilter = value;
            stateDropdown.style.display = 'none';
            applyFilters();
        }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.custom-dropdown')) {
            religionDropdown.style.display = 'none';
            stateDropdown.style.display = 'none';
        }
    });
    
    // Update the filter functions to use our custom values
    window.getCurrentReligionFilter = () => window.currentReligionFilter;
    window.getCurrentStateFilter = () => window.currentStateFilter;
}

// Search dropdown functions
function showSearchDropdown(searchText) {
    const dropdown = document.getElementById('searchDropdown');
    const results = religiousSites.filter(site => 
        site.name.toLowerCase().includes(searchText) ||
        site.state.toLowerCase().includes(searchText) ||
        site.significance.toLowerCase().includes(searchText) ||
        site.description.toLowerCase().includes(searchText)
    ).slice(0, 8); // Limit to 8 results
    
    if (results.length === 0) {
        dropdown.style.display = 'none';
        return;
    }
    
    dropdown.innerHTML = results.map(site => `
        <div class="search-dropdown-item" onclick="selectSearchResult(${site.id})">
            <div class="search-dropdown-title">${site.name}</div>
            <div class="search-dropdown-details">${site.state} • ${site.significance}</div>
            <div class="search-dropdown-religion">${renderIcon(site.religion, '12px')} ${site.religion.charAt(0).toUpperCase() + site.religion.slice(1)}</div>
        </div>
    `).join('');
    
    dropdown.style.display = 'block';
}

function hideSearchDropdown() {
    const dropdown = document.getElementById('searchDropdown');
    dropdown.style.display = 'none';
}

function selectSearchResult(siteId) {
    const site = religiousSites.find(s => s.id === siteId);
    if (site) {
        // Set search box value
        document.getElementById('searchBox').value = site.name;
        
        // Hide dropdown
        hideSearchDropdown();
        
        // Apply filters to show only this site
        applyFilters();
        
        // Center map on the site
        map.setView(site.coordinates, 12);
        
        // Show site details
        showSiteDetails(site);
    }
}

// Handle legend item clicks for filtering
function handleLegendClick(religion) {
    const legendItems = document.querySelectorAll('.legend-item');
    
    // Toggle selection: if clicking the same religion, reset filter
    if (selectedLegendFilter === religion) {
        selectedLegendFilter = null;
        // Remove all filter classes
        legendItems.forEach(item => {
            item.classList.remove('legend-active', 'legend-inactive');
        });
    } else {
        // Set new religion filter
        selectedLegendFilter = religion;
        
        // Update visual states
        legendItems.forEach(item => {
            const itemReligion = item.getAttribute('data-religion');
            if (itemReligion === religion) {
                item.classList.add('legend-active');
                item.classList.remove('legend-inactive');
            } else {
                item.classList.add('legend-inactive');
                item.classList.remove('legend-active');
            }
        });
    }
    
    // Apply the filter to the map
    applyFilters();
}

// Apply filters to map markers
function applyFilters() {
    const religionFilter = selectedLegendFilter || (window.getCurrentReligionFilter ? window.getCurrentReligionFilter() : 'all');
    const stateFilter = window.getCurrentStateFilter ? window.getCurrentStateFilter() : 'all';
    const searchText = document.getElementById('searchBox') ? document.getElementById('searchBox').value.toLowerCase() : '';
    
    filteredSites = religiousSites.filter(site => {
        const matchesReligion = religionFilter === 'all' || site.religion === religionFilter;
        const matchesState = stateFilter === 'all' || site.state === stateFilter;
        const matchesSearch = searchText === '' || 
            site.name.toLowerCase().includes(searchText) ||
            site.state.toLowerCase().includes(searchText) ||
            site.significance.toLowerCase().includes(searchText) ||
            site.description.toLowerCase().includes(searchText);
        
        return matchesReligion && matchesState && matchesSearch;
    });
    
    addMarkersToMap(filteredSites);
    
    // Handle map view updates
    if (filteredSites.length === religiousSites.length || selectedLegendFilter === null) {
        // No filter active or showing all sites - reset to original India view
        map.setView([22.5937, 78.9629], 5);
    } else if (filteredSites.length > 0 && filteredSites.length < religiousSites.length) {
        // Filter active with results - zoom to show filtered markers
        const group = new L.featureGroup(allMarkers);
        if (group.getBounds().isValid()) {
            map.fitBounds(group.getBounds().pad(0.1));
        }
    }
}

// Helper function to create structured countdown display like the next festival overlay
function createStructuredCountdown(countdown) {
    // Use the countdown object properties directly instead of parsing the message
    const days = countdown.days || 0;
    const hours = countdown.hours || 0;
    const minutes = countdown.minutes || 0;
    const seconds = countdown.seconds || 0;
    
    return `
        <div class="countdown-structured">
            <div class="countdown-unit">
                <div class="unit">${String(days).padStart(3, '0')}</div>
                <div class="label">Days</div>
            </div>
            <div class="countdown-unit">
                <div class="unit">${String(hours).padStart(2, '0')}</div>
                <div class="label">Hours</div>
            </div>
            <div class="countdown-unit">
                <div class="unit">${String(minutes).padStart(2, '0')}</div>
                <div class="label">Minutes</div>
            </div>
            <div class="countdown-unit">
                <div class="unit">${String(seconds).padStart(2, '0')}</div>
                <div class="label">Seconds</div>
            </div>
        </div>
    `;
}

// Show countdown modal with upcoming festivals
function showCountdownModal() {
    const modal = document.getElementById('countdownModal');
    const countdownList = document.getElementById('countdownList');
    
    // Collect all upcoming festivals - use religiousSites if filteredSites is not available
    const allFestivals = [];
    const sitesToUse = (typeof filteredSites !== 'undefined' && filteredSites.length > 0) ? filteredSites : religiousSites;
    
    sitesToUse.forEach(site => {
        if (site.festivals) {
            site.festivals.forEach(festival => {
                const countdown = calculateTimeUntil(festival.date);
                if (!countdown.expired) {
                    allFestivals.push({
                        ...festival,
                        siteName: site.name,
                        siteState: site.state,
                        religion: site.religion,
                        countdown: countdown,
                        siteId: site.id
                    });
                }
            });
        }
    });
    
    // Sort by date (earliest first) - handle date ranges properly
    allFestivals.sort((a, b) => {
        // Parse dates the same way calculateTimeUntil does
        let dateA = a.date;
        let dateB = b.date;
        
        // Handle date ranges by using start date
        if (typeof dateA === 'string' && dateA.includes(' to ')) {
            dateA = dateA.split(' to ')[0].trim();
        }
        if (typeof dateB === 'string' && dateB.includes(' to ')) {
            dateB = dateB.split(' to ')[0].trim();
        }
        
        return new Date(dateA) - new Date(dateB);
    });
    
    // Show all festivals
    const displayFestivals = allFestivals;
    
    // Create countdown items
    countdownList.innerHTML = displayFestivals.map(festival => {
        const isRare = festival.rarity === 'every_144_years' || festival.rarity === 'every_12_years' || festival.rarity === 'every_6_years';
        const imagePath = getSiteImagePath(festival.siteName);
        
        return `
            <div class="countdown-item ${isRare ? 'rare-event' : ''}" onclick="showSiteDetails(${festival.siteId})">
                <div class="countdown-item-header">
                    <div class="countdown-item-content">
                        <h4>${renderIcon(festival.religion, '16px')} ${festival.name}
                            ${festival.rarity ? `<span class="festival-rarity rarity-${festival.rarity}">${festival.rarity.replace(/_/g, ' ').toUpperCase()}</span>` : ''}
                        </h4>
                        <div class="location">${festival.siteName}, ${festival.siteState}</div>
                        <p>${festival.description}</p>
                        ${festival.specialNote ? `<div class="special-note">⭐ ${festival.specialNote}</div>` : ''}
                        <div class="countdown-display-structured">
                            ${createStructuredCountdown(festival.countdown)}
                        </div>
                    </div>
                    ${imagePath ? `
                        <div class="countdown-item-thumbnail">
                            <img src="${imagePath}" alt="${festival.siteName}" onerror="this.parentElement.style.display='none'">
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
    
    modal.style.display = 'block';
}

// Photo gallery functions
function openPhotoModal(imageUrl, caption) {
    const modal = document.getElementById('photoModal');
    const modalImg = document.getElementById('modalPhoto');
    const modalCaption = document.getElementById('modalCaption');
    
    modal.style.display = 'block';
    modalImg.src = imageUrl;
    modalCaption.textContent = caption;
}

function switchMainPhoto(photoIndex, siteId) {
    const site = religiousSites.find(s => s.id == siteId);
    if (!site || !site.photos || !site.photos[photoIndex]) return;
    
    const mainPhoto = document.querySelector('.photo-main img');
    const caption = document.querySelector('.photo-caption');
    const credit = document.querySelector('.photo-credit');
    const thumbnails = document.querySelectorAll('.photo-thumb');
    
    // Update main photo
    mainPhoto.src = site.photos[photoIndex].url;
    
    // Update caption and credit
    caption.childNodes[0].textContent = site.photos[photoIndex].caption;
    credit.textContent = `📷 ${site.photos[photoIndex].credit}`;
    
    // Update thumbnail active state
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === photoIndex);
    });
    
    // Update main photo click handler
    document.querySelector('.photo-main').onclick = () => openPhotoModal(site.photos[photoIndex].url, site.photos[photoIndex].caption);
}

// Update all countdowns
// Calculate time until a festival date
function calculateTimeUntil(dateString) {
    try {
        const now = new Date();
        const festivalDate = new Date(dateString);
        
        // Check if date is valid
        if (isNaN(festivalDate.getTime())) {
            return { expired: true, message: "Invalid date" };
        }
        
        // If the date has passed, check next year
        if (festivalDate < now) {
            festivalDate.setFullYear(now.getFullYear() + 1);
        }
        
        const timeDiff = festivalDate - now;
        
        if (timeDiff <= 0) {
            return { expired: true, message: "Festival has passed" };
        }
        
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        
        return {
            expired: false,
            days: isNaN(days) ? 0 : days,
            hours: isNaN(hours) ? 0 : hours,
            minutes: isNaN(minutes) ? 0 : minutes,
            seconds: isNaN(seconds) ? 0 : seconds,
            message: `${days} days, ${hours} hours, ${minutes} minutes`
        };
    } catch (error) {
        console.error('Error calculating time until:', error);
        return { expired: true, message: "Calculation error" };
    }
}

function getFestivalPhoto(festivalName, siteName, religion) {
    // First, try to get the site image from img folder
    const siteImage = getSiteImagePath(siteName);
    if (siteImage) {
        return siteImage;
    }
    
    // Map festivals to appropriate images based on name, site, or religion
    const festivalImageMap = {
        // Hindu festivals and sites
        'maha shivaratri': 'hindu.png',
        'diwali': 'hindu.png', 
        'holi': 'hindu.png',
        'ganesh chaturthi': 'hindu.png',
        'durga puja': 'hindu.png',
        'kedarnath': 'hindu.png',
        'varanasi': 'hindu.png',
        'kumbh': 'hindu.png',
        
        // Buddhist festivals and sites
        'buddha': 'buddhist.webp',
        'vesak': 'buddhist.webp',
        'bodh gaya': 'buddhist.webp',
        
        // Sikh festivals and sites
        'guru': 'sikh.svg',
        'golden temple': 'sikh.svg',
        'amritsar': 'sikh.svg',
        
        // Christian festivals and sites
        'christmas': 'christian.svg',
        'easter': 'christian.svg',
        'goa': 'christian.svg',
        
        // Islamic festivals and sites
        'eid': 'islam.png',
        'ramadan': 'islam.png',
        'mosque': 'islam.png',
        
        // Bahai
        'bahai': 'bahai.png'
    };
    
    // Check festival name first
    const lowerFestivalName = festivalName.toLowerCase();
    for (const [key, image] of Object.entries(festivalImageMap)) {
        if (lowerFestivalName.includes(key)) {
            return image;
        }
    }
    
    // Check site name
    const lowerSiteName = siteName.toLowerCase();
    for (const [key, image] of Object.entries(festivalImageMap)) {
        if (lowerSiteName.includes(key)) {
            return image;
        }
    }
    
    // Fall back to religion-based images
    const religionImageMap = {
        'Hindu': 'hindu.png',
        'Buddhist': 'buddhist.webp', 
        'Sikh': 'sikh.svg',
        'Christian': 'christian.svg',
        'Islam': 'islam.png',
        'Bahai': 'bahai.png'
    };
    
    return religionImageMap[religion] || 'hamsa.png'; // Default fallback
}

function updateCountdowns() {
    // Get all upcoming festivals from all sites
    const allFestivals = [];
    
    religiousSites.forEach(site => {
        if (site.festivals) {
            site.festivals.forEach(festival => {
                const countdown = calculateTimeUntil(festival.date);
                if (!countdown.expired) {
                    allFestivals.push({
                        ...festival,
                        siteName: site.name,
                        siteId: site.id,
                        location: site.state,
                        religion: site.religion,
                        countdown: countdown,
                        siteDescription: site.description,
                        festivalDescription: festival.description
                    });
                }
            });
        }
    });
    
    // Sort by date to get the next upcoming festival
    allFestivals.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    const nextFestival = allFestivals[0];
    
    if (nextFestival) {
        // Debug log to see if seconds are being calculated
        console.log('Updating countdown:', {
            days: nextFestival.countdown.days,
            hours: nextFestival.countdown.hours,
            minutes: nextFestival.countdown.minutes,
            seconds: nextFestival.countdown.seconds
        });
        
        // Update countdown timer
        document.getElementById('days').textContent = String(nextFestival.countdown.days).padStart(3, '0');
        document.getElementById('hours').textContent = String(nextFestival.countdown.hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(nextFestival.countdown.minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(nextFestival.countdown.seconds).padStart(2, '0');
        
        // Update festival photo
        const festivalPhoto = document.getElementById('festivalPhoto');
        if (festivalPhoto) {
            const photoSrc = getFestivalPhoto(nextFestival.name, nextFestival.siteName, nextFestival.religion);
            festivalPhoto.src = photoSrc;
            festivalPhoto.alt = `${nextFestival.name} at ${nextFestival.siteName}`;
            
            // Make festival photo clickable
            festivalPhoto.style.cursor = 'pointer';
            festivalPhoto.style.transition = 'all 0.3s ease';
            
            festivalPhoto.onclick = () => {
                const siteData = religiousSites.find(site => site.id === nextFestival.siteId);
                if (siteData) {
                    map.setView(siteData.coordinates, 12);
                    showSiteDetailsModal(siteData);
                }
            };
            
            // Add hover effect to photo
            festivalPhoto.onmouseenter = () => {
                festivalPhoto.style.transform = 'scale(1.02)';
                festivalPhoto.style.filter = 'brightness(1.1)';
            };
            
            festivalPhoto.onmouseleave = () => {
                festivalPhoto.style.transform = 'scale(1)';
                festivalPhoto.style.filter = 'brightness(1)';
            };
        }
        
        // Update site preview with actual festival data
        const sitePreview = document.querySelector('.site-preview .site-info');
        if (sitePreview) {
            sitePreview.innerHTML = `
                <h4><span class="festival-name-gradient">${nextFestival.name}</span><br><span class="festival-location">in ${nextFestival.siteName}</span></h4>
                <p>${nextFestival.festivalDescription}. ${nextFestival.siteDescription}</p>
            `;
            
            // Make the site preview clickable
            sitePreview.style.cursor = 'pointer';
            sitePreview.style.transition = 'all 0.3s ease';
            
            // Add click event to show details and zoom to location
            sitePreview.onclick = () => {
                const siteData = religiousSites.find(site => site.id === nextFestival.siteId);
                if (siteData) {
                    map.setView(siteData.coordinates, 12);
                    showSiteDetailsModal(siteData);
                }
            };
            
            // Add hover effects (without layout shift)
            sitePreview.onmouseenter = () => {
                sitePreview.style.backgroundColor = 'rgba(102, 126, 234, 0.05)';
                sitePreview.style.borderRadius = '8px';
                sitePreview.style.transform = 'scale(1.02)';
            };
            
            sitePreview.onmouseleave = () => {
                sitePreview.style.backgroundColor = 'transparent';
                sitePreview.style.transform = 'scale(1)';
            };
            
            // Make the site preview clickable
            sitePreview.style.cursor = 'pointer';
            sitePreview.style.transition = 'all 0.3s ease';
            
            // Add click event to show details and zoom to location
            sitePreview.onclick = () => {
                // Find the site data for this festival
                const siteData = religiousSites.find(site => site.id === nextFestival.siteId);
                if (siteData) {
                    // Zoom to location
                    map.setView(siteData.coordinates, 12);
                    // Show details modal
                    showSiteDetailsModal(siteData);
                }
            };
            
            // Add hover effects (without layout shift)
            sitePreview.onmouseenter = () => {
                sitePreview.style.backgroundColor = 'rgba(102, 126, 234, 0.05)';
                sitePreview.style.borderRadius = '8px';
                sitePreview.style.transform = 'scale(1.02)';
            };
            
            sitePreview.onmouseleave = () => {
                sitePreview.style.backgroundColor = 'transparent';
                sitePreview.style.transform = 'scale(1)';
            };
        }
        
        // Update next festival header
        const festivalHeader = document.querySelector('div[style*="Next festival starts in"]');
        if (festivalHeader) {
            festivalHeader.textContent = `${nextFestival.name} starts in`;
        }
    } else {
        // Fallback if no upcoming festivals
        document.getElementById('days').textContent = '000';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        
        // Set default photo
        const festivalPhoto = document.getElementById('festivalPhoto');
        if (festivalPhoto) {
            festivalPhoto.src = 'hamsa.png';
            festivalPhoto.alt = 'Cultural heritage';
        }
        
        const sitePreview = document.querySelector('.site-preview .site-info');
        if (sitePreview) {
            sitePreview.innerHTML = `
                <h4>No Upcoming Festivals</h4>
                <p>Check back later for festival dates and celebrations.</p>
            `;
        }
    }
    
    // Update countdown displays in Upcoming Festivals modal if it's open
    updateModalCountdowns();
}

// Update countdown displays in the Upcoming Festivals modal
function updateModalCountdowns() {
    const modal = document.getElementById('countdownModal');
    if (!modal || modal.style.display !== 'block') {
        return; // Modal is not open, no need to update
    }
    
    const countdownItems = modal.querySelectorAll('.countdown-item');
    const sitesToUse = (typeof filteredSites !== 'undefined' && filteredSites.length > 0) ? filteredSites : religiousSites;
    
    // Get fresh countdown data
    const allFestivals = [];
    sitesToUse.forEach(site => {
        if (site.festivals) {
            site.festivals.forEach(festival => {
                const countdown = calculateTimeUntil(festival.date);
                if (!countdown.expired) {
                    allFestivals.push({
                        ...festival,
                        siteName: site.name,
                        countdown: countdown,
                        siteId: site.id
                    });
                }
            });
        }
    });
    
    // Sort by date (same as in showCountdownModal)
    allFestivals.sort((a, b) => {
        let dateA = a.date;
        let dateB = b.date;
        
        if (typeof dateA === 'string' && dateA.includes(' to ')) {
            dateA = dateA.split(' to ')[0].trim();
        }
        if (typeof dateB === 'string' && dateB.includes(' to ')) {
            dateB = dateB.split(' to ')[0].trim();
        }
        
        return new Date(dateA) - new Date(dateB);
    });
    
    // Update each countdown display in the modal
    countdownItems.forEach((item, index) => {
        if (index < allFestivals.length) {
            const festival = allFestivals[index];
            const countdownUnits = item.querySelectorAll('.countdown-unit .unit');
            
            if (countdownUnits.length >= 4) {
                countdownUnits[0].textContent = String(festival.countdown.days || 0).padStart(3, '0');
                countdownUnits[1].textContent = String(festival.countdown.hours || 0).padStart(2, '0');
                countdownUnits[2].textContent = String(festival.countdown.minutes || 0).padStart(2, '0');
                countdownUnits[3].textContent = String(festival.countdown.seconds || 0).padStart(2, '0');
            }
        }
    });
}

// Global variable to track selected legend filter
let selectedLegendFilter = null;

// Populate legend with actual map icons
function populateLegend() {
    const legendItems = document.getElementById('legendItems');
    if (!legendItems) return;
    
    // Sort religions alphabetically, but keep 'other' at the end
    const religions = ['bahai', 'buddhist', 'christian', 'hindu', 'islam', 'jain', 'sikh', 'other'];
    
    legendItems.innerHTML = religions.map(religion => {
        const icon = renderIcon(religion, '20px');
        const displayName = religion === 'islam' ? 'Islam' : 
                          religion === 'bahai' ? 'Bahá\'í' : 
                          religion.charAt(0).toUpperCase() + religion.slice(1);
        
        return `
            <div class="legend-item" data-religion="${religion}" style="cursor: pointer; transition: opacity 0.3s ease;">
                <div class="legend-icon">
                    ${icon}
                </div>
                <span>${displayName}</span>
            </div>
        `;
    }).join('');
    
    // Add click event listeners to legend items
    const legendItemElements = legendItems.querySelectorAll('.legend-item');
    legendItemElements.forEach(item => {
        item.addEventListener('click', function() {
            const religion = this.getAttribute('data-religion');
            handleLegendClick(religion);
        });
    });
}

// Make functions globally available
window.showSiteDetails = showSiteDetails;
window.showCountdownModal = showCountdownModal;
window.openPhotoModal = openPhotoModal;
window.switchMainPhoto = switchMainPhoto;
window.selectSearchResult = selectSearchResult;