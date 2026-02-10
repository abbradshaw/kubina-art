import fs from 'fs';
import path from 'path';

const uploadsDir = 'src/assets/uploads';
const contentDir = 'src/content/work';

// Ensure content directory exists
if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
}

function toTitleCase(str) {
    return str
        .replace(/[-_]/g, ' ')
        .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

// Recursive function to scan directories
function scanDirectory(dir, defaultCategory = 'Painting') {
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            // Recurse into subdirectory, using the folder name as the Category
            // e.g. src/assets/uploads/Sculpture -> category="Sculpture"
            // Capitalize the folder name to match enum requirements if needed
            const folderName = path.basename(fullPath);
            const category = folderName.charAt(0).toUpperCase() + folderName.slice(1);
            scanDirectory(fullPath, category);
        } else {
            processFile(fullPath, defaultCategory);
        }
    });
}

function processFile(filePath, category) {
    // Basic image extension check
    if (!filePath.match(/\.(jpg|jpeg|png|webp|gif|avif)$/i)) return;

    const fileName = path.basename(filePath);
    const nameWithoutExt = path.basename(fileName, path.extname(fileName));
    const mdFilename = `${nameWithoutExt}.md`;
    const mdPath = path.join(contentDir, mdFilename);

    // Calculate relative path for image frontmatter
    // We need to match how Astro imports it. 
    // If it's in a subfolder, relative path needs to account for that.
    // simpler: relative path from the MD file location (src/content/work) to the image file
    // Image is at: filePath (absolute or relative to cwd)
    // MD is at: mdPath

    // Construct the relative path string manually to be safe and clean
    // src/content/work/foo.md  -->  ../../assets/uploads/foo.jpg
    // src/content/work/foo.md  -->  ../../assets/uploads/Sculpture/foo.jpg

    // Get relative path from CWD to the image
    const relativeToCwd = path.relative(process.cwd(), filePath);
    // Construct path for frontmatter: ../../ + (remove src/ from start)
    // Actually, just use path.relative from contentDir to filePath
    let relativePath = path.relative(contentDir, filePath);

    // Ensure posix style slashes for astro
    relativePath = relativePath.split(path.sep).join('/');

    if (!fs.existsSync(mdPath)) {
        let titleStr = nameWithoutExt;
        let status = "Available";

        // Check for 'private collection'
        if (titleStr.toLowerCase().includes("private") && titleStr.toLowerCase().includes("collection")) {
            status = "Private Collection";
            // Remove the phrase from the title source string before title casing
            // Regex handles: -private-collection, _private_collection, private collection
            titleStr = titleStr.replace(/[-_ ]?private[-_ ]?collection/gi, "");
            // Clean up double dashes or trailing dashes
            titleStr = titleStr.replace(/[-_]{2,}/g, "-").replace(/[-_]+$/, "");
        }

        const title = toTitleCase(titleStr);

        const mediums = {
            'Painting': 'Oil on Canvas',
            'Sculpture': 'Mixed Media Sculpture',
            'Digital': 'Digital Archive Print',
            'Drawing': 'Mixed Media on Paper'
        };
        const medium = mediums[category] || 'Mixed Media';

        const content = `---
title: "${title}"
image: "${relativePath}"
category: "${category}"
status: "${status}"
year: "2000"
medium: "${medium}"
dimensions: "Variable"
---

`;
        fs.writeFileSync(mdPath, content);
        console.log(`[CREATED] ${mdFilename} (Category: ${category})`);
    }
}

console.log(`Scanning ${uploadsDir} for new images...`);
scanDirectory(uploadsDir);
console.log(`\nScan complete.`);
