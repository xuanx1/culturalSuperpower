const fs = require('fs');

// Read the file
const content = fs.readFileSync('religiousSites.js', 'utf8');

// Extract all lines that contain site names (not festival names)
const lines = content.split('\n');
const sites = [];
let currentSite = {};

for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Look for site name pattern (not indented festival names)
    if (line.match(/^name: "([^"]+)",$/) && !lines[i].startsWith('                ')) {
        const name = line.match(/name: "([^"]+)",$/)[1];
        currentSite.name = name;
    }
    
    // Look for religion
    if (line.match(/^religion: "([^"]+)",$/) && currentSite.name) {
        const religion = line.match(/religion: "([^"]+)",$/)[1];
        currentSite.religion = religion;
    }
    
    // Look for state
    if (line.match(/^state: "([^"]+)",$/) && currentSite.name) {
        const state = line.match(/state: "([^"]+)",$/)[1];
        currentSite.state = state;
        
        // We have complete site info, add it
        sites.push({...currentSite});
        currentSite = {};
    }
}

// Display results
console.log('=== ALL RELIGIOUS SITES ===\n');
sites.forEach((site, i) => {
    const religionName = site.religion.charAt(0).toUpperCase() + site.religion.slice(1);
    console.log(`${i+1}. ${site.name} (${religionName}) - ${site.state}`);
});

console.log('\n\n=== SUMMARY BY RELIGION ===');
const religionCounts = {};
sites.forEach(site => {
    religionCounts[site.religion] = (religionCounts[site.religion] || 0) + 1;
});

Object.entries(religionCounts).sort(([,a], [,b]) => b - a).forEach(([religion, count]) => {
    const religionName = religion.charAt(0).toUpperCase() + religion.slice(1);
    console.log(`${religionName}: ${count} sites`);
});

console.log(`\nTotal sites: ${sites.length}`);