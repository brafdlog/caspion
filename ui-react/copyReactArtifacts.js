const fse = require('fs-extra');
const fs = require('fs');
const path = require('path');

const reactBuildDirPath = path.join(__dirname, 'build');
const publicDirPath = path.join(__dirname, '..', 'public');
const distReactPath = path.join(publicDirPath, 'react');
const sourceIndexHtmlPath = path.join(reactBuildDirPath, 'index.html');

async function copyReactArtifacts() {
    await replaceAll(sourceIndexHtmlPath, '/static', '/react/static');

    // Cleanup the previous build
    fse.removeSync(distReactPath);

    fse.ensureDirSync(distReactPath);
    fse.copySync(reactBuildDirPath, distReactPath);
}

async function replaceAll(filePath, from, to) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const result = fileContent.replaceAll(from, to);
    fs.writeFileSync(filePath, result,'utf8');
}

copyReactArtifacts();




