const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');

// Read and parse the religiousSites.js file more safely
let religiousSitesData;
try {
    const fileContent = fs.readFileSync('religiousSites.js', 'utf8');
    
    // Extract just the religiousSites array using regex
    const match = fileContent.match(/const religiousSites = (\[[\s\S]*?\]);/);
    if (!match) {
        throw new Error('Could not find religiousSites array in the file');
    }
    
    // Use JSON.parse after cleaning up the JavaScript array format
    let arrayContent = match[1];
    
    // Simple approach: create a temporary file to safely evaluate the array
    const tempFile = 'temp_sites.js';
    fs.writeFileSync(tempFile, `module.exports = ${arrayContent};`);
    
    religiousSitesData = require(`./${tempFile}`);
    
    // Clean up temp file
    fs.unlinkSync(tempFile);
    
    console.log(`Found ${religiousSitesData.length} religious sites`);
} catch (error) {
    console.error('Error reading religiousSites.js:', error);
    process.exit(1);
}

// Function to make HTTP/HTTPS requests
function makeRequest(url) {
    return new Promise((resolve, reject) => {
        const client = url.startsWith('https') ? https : http;
        
        client.get(url, (response) => {
            let data = '';
            
            response.on('data', (chunk) => {
                data += chunk;
            });
            
            response.on('end', () => {
                if (response.statusCode === 200) {
                    resolve(data);
                } else {
                    reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
                }
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

// Function to search Wikipedia for a page and get image
async function searchWikipediaImage(siteName) {
    const searchTerms = [
        siteName,
        `${siteName} temple`,
        `${siteName} India`,
        siteName.replace(' Temple', '').replace(' Mosque', '').replace(' Church', '').replace(' Gurudwara', '')
    ];
    
    for (const query of searchTerms) {
        try {
            console.log(`  Trying search term: "${query}"`);
            
            // First, search for the page
            const searchUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
            
            const summaryData = await makeRequest(searchUrl);
            const summary = JSON.parse(summaryData);
            
            if (summary.thumbnail && summary.thumbnail.source) {
                console.log(`  Found thumbnail image from summary`);
                return summary.thumbnail.source;
            }
            
            // If no thumbnail in summary, try getting page images
            const imagesUrl = `https://en.wikipedia.org/api/rest_v1/page/media-list/${encodeURIComponent(query)}`;
            
            const imagesData = await makeRequest(imagesUrl);
            const images = JSON.parse(imagesData);
            
            if (images.items && images.items.length > 0) {
                console.log(`  Found ${images.items.length} media items`);
                
                // Find the first suitable image
                for (const item of images.items) {
                    if (item.type === 'image' && 
                        !item.title.toLowerCase().includes('commons-logo') &&
                        !item.title.toLowerCase().includes('edit-icon') &&
                        !item.title.toLowerCase().includes('wikimedia') &&
                        (item.title.toLowerCase().includes('.jpg') || 
                         item.title.toLowerCase().includes('.jpeg') || 
                         item.title.toLowerCase().includes('.png') ||
                         item.title.toLowerCase().includes('.webp'))) {
                        
                        try {
                            // Get the full resolution image URL
                            const imageInfoUrl = `https://en.wikipedia.org/api/rest_v1/page/media/${encodeURIComponent(item.title)}`;
                            const imageInfo = JSON.parse(await makeRequest(imageInfoUrl));
                            
                            if (imageInfo.original && imageInfo.original.source) {
                                console.log(`  Found full resolution image: ${item.title}`);
                                return imageInfo.original.source;
                            }
                        } catch (err) {
                            console.log(`  Failed to get image info for ${item.title}: ${err.message}`);
                            continue;
                        }
                    }
                }
            }
            
            // Small delay between different search attempts
            await new Promise(resolve => setTimeout(resolve, 500));
            
        } catch (error) {
            console.log(`  Search failed for "${query}": ${error.message}`);
            continue;
        }
    }
    
    return null;
}

// Function to download image from URL
function downloadImage(url, filename) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filename);
        const client = url.startsWith('https') ? https : http;
        
        client.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
                return;
            }
            
            response.pipe(file);
            
            file.on('finish', () => {
                file.close();
                resolve();
            });
            
            file.on('error', (err) => {
                fs.unlink(filename, () => {}); // Delete the file on error
                reject(err);
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

// Function to sanitize filename
function sanitizeFilename(name) {
    return name
        .replace(/[^a-zA-Z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '_') // Replace spaces with underscores
        .toLowerCase()
        .substring(0, 50); // Limit length
}

// Function to get file extension from URL
function getExtension(url) {
    const match = url.match(/\.(jpg|jpeg|png|webp|gif)(\?|$)/i);
    return match ? '.' + match[1].toLowerCase() : '.jpg';
}

// Main function to download images for all sites from Wikipedia
async function downloadAllWikipediaImages() {
    const imgDir = path.join(__dirname, 'img');
    
    // Create img directory if it doesn't exist
    if (!fs.existsSync(imgDir)) {
        fs.mkdirSync(imgDir);
        console.log('Created img directory');
    }
    
    let downloadedCount = 0;
    let errorCount = 0;
    let skippedCount = 0;
    
    console.log(`Starting to download images for ${religiousSitesData.length} sites...\n`);
    
    for (let i = 0; i < religiousSitesData.length; i++) {
        const site = religiousSitesData[i];
        const progress = `[${i + 1}/${religiousSitesData.length}]`;
        
        try {
            const sanitizedName = sanitizeFilename(site.name);
            
            // Try different possible filenames
            const possibleFiles = [
                path.join(imgDir, `${site.id}_${sanitizedName}.jpg`),
                path.join(imgDir, `${site.id}_${sanitizedName}.jpeg`),
                path.join(imgDir, `${site.id}_${sanitizedName}.png`),
                path.join(imgDir, `${site.id}_${sanitizedName}.webp`)
            ];
            
            // Check if any image file already exists
            let fileExists = false;
            for (const filename of possibleFiles) {
                if (fs.existsSync(filename)) {
                    console.log(`${progress} ✓ Image already exists: ${site.name}`);
                    skippedCount++;
                    fileExists = true;
                    break;
                }
            }
            
            if (fileExists) {
                continue;
            }
            
            console.log(`${progress} Searching for image: ${site.name}`);
            
            const imageUrl = await searchWikipediaImage(site.name);
            
            if (!imageUrl) {
                console.log(`${progress} ⚠ No Wikipedia image found for: ${site.name}`);
                errorCount++;
                continue;
            }
            
            const extension = getExtension(imageUrl);
            const filename = path.join(imgDir, `${site.id}_${sanitizedName}${extension}`);
            
            console.log(`${progress} Downloading: ${imageUrl}`);
            
            await downloadImage(imageUrl, filename);
            downloadedCount++;
            console.log(`${progress} ✓ Downloaded: ${site.name} -> ${path.basename(filename)}`);
            
            // Add delay to be respectful to Wikipedia's servers
            await new Promise(resolve => setTimeout(resolve, 1500));
            
        } catch (error) {
            console.error(`${progress} ✗ Error downloading image for ${site.name}:`, error.message);
            errorCount++;
        }
        
        // Add a blank line every 10 items for readability
        if ((i + 1) % 10 === 0) {
            console.log('');
        }
    }
    
    console.log('\n=== Download Summary ===');
    console.log(`Total sites: ${religiousSitesData.length}`);
    console.log(`Successfully downloaded: ${downloadedCount}`);
    console.log(`Already existed (skipped): ${skippedCount}`);
    console.log(`Errors/No images found: ${errorCount}`);
    console.log('\nImages saved in ./img/ folder');
    
    if (downloadedCount > 0) {
        console.log('\nSample files downloaded:');
        const imgFiles = fs.readdirSync(imgDir).slice(0, 5);
        imgFiles.forEach(file => console.log(`  - ${file}`));
        if (imgFiles.length >= 5) {
            console.log(`  ... and ${downloadedCount - 5} more`);
        }
    }
}

// Run the download process
console.log('Wikipedia Image Downloader for Religious Sites');
console.log('============================================\n');

downloadAllWikipediaImages().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});