const fs = require('fs');

// Read the religiousSites.js file
const fileContent = fs.readFileSync('religiousSites.js', 'utf8');

// Extract just the religiousSites array definition
const religiousSitesMatch = fileContent.match(/const religiousSites = \[([\s\S]*?)\];/);
if (!religiousSitesMatch) {
    console.log('Could not find religiousSites array');
    process.exit(1);
}

// Create a proper JavaScript that defines the array
const sitesCode = `const religiousSites = [${religiousSitesMatch[1]}];`;

try {
    eval(sitesCode);
    
    // Extract and format site information
    const siteList = religiousSites.map((site, i) => {
        const religionName = site.religion.charAt(0).toUpperCase() + site.religion.slice(1);
        return `${i+1}. ${site.name} (${religionName}) - ${site.state}`;
    });

    console.log('=== ALL RELIGIOUS SITES ===\n');
    console.log(siteList.join('\n'));

    console.log('\n\n=== SUMMARY BY RELIGION ===');
    const religionCounts = {};
    religiousSites.forEach(site => {
        religionCounts[site.religion] = (religionCounts[site.religion] || 0) + 1;
    });

    Object.entries(religionCounts).forEach(([religion, count]) => {
        const religionName = religion.charAt(0).toUpperCase() + religion.slice(1);
        console.log(`${religionName}: ${count} sites`);
    });

    console.log(`\nTotal sites: ${religiousSites.length}`);
    
} catch (error) {
    console.log('Error parsing sites:', error.message);
}