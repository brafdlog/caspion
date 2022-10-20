const fse = require('fs-extra');
const path = require('path');

const reactBuildDirPath = path.join(__dirname, 'build');
const publicDirPath = path.join(__dirname, '..', 'public');
const distReactPath = path.join(publicDirPath, 'react');
const distStaticResourcesPath = path.join(publicDirPath, 'static');

async function copyReactArtifacts() {
    console.log(`Copying react artifact from ${reactBuildDirPath} to ${distReactPath}`)

    // Cleanup the previous build
    fse.removeSync(distReactPath);
    fse.removeSync(distStaticResourcesPath);

    fse.ensureDirSync(distReactPath);
    fse.copySync(reactBuildDirPath, distReactPath);
    fse.copySync(path.join(distReactPath, 'static'), distStaticResourcesPath);
}

copyReactArtifacts();




