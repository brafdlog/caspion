const fs = require('fs-extra');
const path = require('path');

const reactBuildDirPath = path.join(__dirname, 'build');
const publicDirPath = path.join(__dirname, '..', 'public');
const distReactPath = path.join(publicDirPath, 'react');

// Cleanup the previous build
fs.removeSync(distReactPath);

fs.ensureDirSync(distReactPath);

fs.copySync(reactBuildDirPath, distReactPath);