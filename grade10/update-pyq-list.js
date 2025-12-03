const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'PYQ');
const outputPath = path.join(baseDir, 'pyq-list.json');

function buildManifest() {
    if (!fs.existsSync(baseDir)) {
        throw new Error(`Missing PYQ directory at ${baseDir}`);
    }

    const entries = {};
    const subjects = fs.readdirSync(baseDir)
        .filter((name) => fs.statSync(path.join(baseDir, name)).isDirectory());

    subjects.forEach((subject) => {
        const subjectDir = path.join(baseDir, subject);
        const files = fs.readdirSync(subjectDir)
            .filter((fileName) => fileName.toLowerCase().endsWith('.pdf'))
            .sort((a, b) => a.localeCompare(b))
            .map((fileName) => ({
                label: fileName.replace(/\.pdf$/i, ''),
                file: `PYQ/${subject}/${fileName}`,
            }));

        entries[subject] = files;
    });

    fs.writeFileSync(outputPath, `${JSON.stringify(entries, null, 2)}\n`, 'utf8');
    console.log(`Updated PYQ manifest at ${outputPath}`);
}

try {
    buildManifest();
} catch (error) {
    console.error('Failed to update pyq-list.json');
    console.error(error.message);
    process.exitCode = 1;
}
