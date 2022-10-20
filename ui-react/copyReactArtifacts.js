const fse = require('fs-extra');
const fs = require('fs');
const path = require('path');

const reactBuildDirPath = path.join(__dirname, 'build');
const publicDirPath = path.join(__dirname, '..', 'public');
const distReactPath = path.join(publicDirPath, 'react');
const sourceIndexHtmlPath = path.join(reactBuildDirPath, 'index.html');

async function copyReactArtifacts() {
    console.log(`Copying react artifact from ${reactBuildDirPath} to ${distReactPath}`)

    await fixReferencesToStaticFolder(sourceIndexHtmlPath);

    // Cleanup the previous build
    fse.removeSync(distReactPath);

    fse.ensureDirSync(distReactPath);
    fse.copySync(reactBuildDirPath, distReactPath);
}

async function fixReferencesToStaticFolder(filePath) {
    console.log('Fixing references to static folder');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const result = fileContent.replace(/\/static/g, '/react/static');
    fs.writeFileSync(filePath, result,'utf8');
}

copyReactArtifacts();




