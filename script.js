// Global variables
let map;
let allMarkers = [];
let filteredSites = religiousSites;

// Initialize the map when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    populateFilters();
    setupEventListeners();
    updateCountdowns();
    
    // Update countdowns every minute
    setInterval(updateCountdowns, 60000);
});

// Initialize the Leaflet map
function initializeMap() {
    // Create map centered on India with tighter bounds
    map = L.map('map', {
        minZoom: 5,
        maxZoom: 10,
        zoomControl: true,
        attributionControl: true
    }).setView([22.5937, 78.9629], 5);
    
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
    
    // Restrict zoom out to always show India properly
    map.on('zoomend', function() {
        if (map.getZoom() < 5) {
            map.setView([22.5937, 78.9629], 5);
        }
    });
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetMap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 10
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
                    if (feature.properties && feature.properties.NAME_1) {
                        layer.bindPopup(`<strong>${feature.properties.NAME_1}</strong>`);
                    } else if (feature.properties && feature.properties.name) {
                        layer.bindPopup(`<strong>${feature.properties.name}</strong>`);
                    }
                    
                    // Add hover effects
                    layer.on({
                        mouseover: function(e) {
                            const layer = e.target;
                            layer.setStyle({
                                weight: 3,
                                color: '#8e44ad',
                                fillOpacity: 0.2
                            });
                        },
                        mouseout: function(e) {
                            const layer = e.target;
                            layer.setStyle({
                                weight: 1,
                                color: '#8e44ad',
                                fillOpacity: 0.1
                            });
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
    
    // Load India border for reverse mask effect
    fetch('india-border.geojson')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(geojsonData => {
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
            
            // Create a world polygon with India as a hole (reverse mask)
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
                fillOpacity: 0.8,
                weight: 0,
                color: 'transparent'
            });
            
            // Add the mask with hole to map
            worldWithIndiaHole.addTo(map);
            
            // Add India border outline on top
            L.geoJSON(geojsonData, {
                style: function(feature) {
                    return {
                        fillColor: 'transparent',
                        weight: 10,
                        opacity: 1,
                        color: '#8e44ad',
                        fillOpacity: 0
                    };
                }
            }).addTo(map);
            
            console.log('India reverse mask effect loaded successfully');
        })
        .catch(error => {
            console.warn('Could not load India border for mask effect:', error);
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

// Show detailed site information in modal
function showSiteDetailsModal(siteId) {
    const site = typeof siteId === 'object' ? siteId : religiousSites.find(s => s.id === siteId);
    if (!site) return;
    
    const modal = document.getElementById('siteModal');
    const title = document.getElementById('siteModalTitle');
    const content = document.getElementById('siteModalContent');
    
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
    
    // Create photo gallery if photos exist
    const photoGallery = site.photos && site.photos.length > 0 ? `
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
    ` : '';
    
    content.innerHTML = `
        <div class="site-info">
            ${photoGallery}
            
            <div class="site-details">
                <div class="detail-item">
                    <div class="detail-label">Location</div>
                    <div class="detail-value">${site.state}, India</div>
                </div>
                
                <div class="detail-item">
                    <div class="detail-label">Religion</div>
                    <div class="detail-value">${site.religion.charAt(0).toUpperCase() + site.religion.slice(1)}</div>
                </div>
                
                <div class="detail-item">
                    <div class="detail-label">Significance</div>
                    <div class="detail-value">${site.significance}</div>
                </div>
                
                <div class="detail-item">
                    <div class="detail-label">Description</div>
                    <div class="detail-value">${site.description}</div>
                </div>
            </div>
            
            <div class="best-time">
                <h4>🌟 Best Time to Visit</h4>
                <p>${site.bestTimeToVisit}</p>
                ${isOptimal ? 
                    '<div style="color: white; font-weight: bold;">Perfect time to visit now! 🎉</div>' : 
                    `<div style="color: white;">Next optimal time: ${nextOptimal ? nextOptimal.message : 'Check calendar'}</div>`
                }
            </div>
            
            ${upcomingFestivals.length > 0 ? `
                <div class="countdown-timer">
                    <h4>🎊 Upcoming Festivals</h4>
                    ${upcomingFestivals.map(festival => `
                        <div style="margin-bottom: 15px; ${festival.rarity === 'every_144_years' || festival.rarity === 'every_12_years' ? 'border: 2px solid #ff6b35; border-radius: 8px; padding: 10px; background: rgba(255, 107, 53, 0.1);' : ''}">
                            <strong>${festival.name}</strong>
                            ${festival.rarity ? `<span class="festival-rarity rarity-${festival.rarity}">${festival.rarity.replace(/_/g, ' ').toUpperCase()}</span>` : ''}
                            <br>
                            <small>${festival.description}</small><br>
                            ${festival.specialNote ? `<div class="special-note">⭐ ${festival.specialNote}</div>` : ''}
                            <div style="background: rgba(255,255,255,0.2); padding: 8px; border-radius: 5px; margin-top: 8px;">
                                ⏰ ${festival.countdown.message}
                            </div>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            
            <div class="detail-item">
                <div class="detail-label">Travel Information</div>
                <div class="detail-value">
                    <strong>Nearest Airport:</strong> ${site.nearestAirport}<br>
                    <strong>Nearest Railway:</strong> ${site.nearestRailway}<br><br>
                    <strong>Travel Tips:</strong> ${site.travelTips}
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Legacy function for backward compatibility (now redirects to modal)
function showSiteDetails(siteId) {
    showSiteDetailsModal(siteId);
}

// Populate filter dropdowns
function populateFilters() {
    const stateFilter = document.getElementById('stateFilter');
    
    // Add states to filter
    states.forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        stateFilter.appendChild(option);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Religion filter
    document.getElementById('religionFilter').addEventListener('change', applyFilters);
    
    // State filter
    document.getElementById('stateFilter').addEventListener('change', applyFilters);
    
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
    
    // Site details modal
    const siteModal = document.getElementById('siteModal');
    const siteModalClose = siteModal.querySelector('.site-modal-close');
    
    siteModalClose.addEventListener('click', function() {
        siteModal.style.display = 'none';
    });
    
    // Countdown modal
    const countdownBtn = document.getElementById('showCountdowns');
    const modal = document.getElementById('countdownModal');
    const closeModal = modal.querySelector('.close');
    
    countdownBtn.addEventListener('click', showCountdownModal);
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
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

// Apply filters to map markers
function applyFilters() {
    const religionFilter = document.getElementById('religionFilter').value;
    const stateFilter = document.getElementById('stateFilter').value;
    const searchText = document.getElementById('searchBox').value.toLowerCase();
    
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
    
    // Update map view if filtered results are limited
    if (filteredSites.length > 0 && filteredSites.length < religiousSites.length) {
        const group = new L.featureGroup(allMarkers);
        if (group.getBounds().isValid()) {
            map.fitBounds(group.getBounds().pad(0.1));
        }
    }
}

// Show countdown modal with upcoming festivals
function showCountdownModal() {
    const modal = document.getElementById('countdownModal');
    const countdownList = document.getElementById('countdownList');
    
    // Collect all upcoming festivals
    const allFestivals = [];
    filteredSites.forEach(site => {
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
        return `
            <div class="countdown-item ${isRare ? 'rare-event' : ''}" onclick="showSiteDetails(${festival.siteId})">
                <h4>${renderIcon(festival.religion, '16px')} ${festival.name}
                    ${festival.rarity ? `<span class="festival-rarity rarity-${festival.rarity}">${festival.rarity.replace(/_/g, ' ').toUpperCase()}</span>` : ''}
                </h4>
                <div class="location">${festival.siteName}, ${festival.siteState}</div>
                <p>${festival.description}</p>
                ${festival.specialNote ? `<div class="special-note">⭐ ${festival.specialNote}</div>` : ''}
                <div class="countdown-display">
                    ⏰ ${festival.countdown.message}
                    ${isRare ? ' 🌟' : ''}
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
function updateCountdowns() {
    // Update any visible countdowns in the page
    const countdownElements = document.querySelectorAll('.countdown-display');
    // This function can be expanded to update specific countdown displays
}

// Make functions globally available
window.showSiteDetails = showSiteDetails;
window.showCountdownModal = showCountdownModal;
window.openPhotoModal = openPhotoModal;
window.switchMainPhoto = switchMainPhoto;
window.selectSearchResult = selectSearchResult;