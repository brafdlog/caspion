// Check if the renderer and main bundles are built
import path from 'path';
import chalk from 'chalk';
import fs from 'fs';

function CheckBuildsExist() {
  const rendererPath = path.join(
    __dirname,
    '..',
    '..',
    'app',
    'dist',
    'renderer.prod.js'
  );

  if (!fs.existsSync(rendererPath)) {
    throw new Error(
      chalk.whiteBright.bgRed.bold(
        'The renderer process is not built yet. Build it by running "yarn build-renderer"'
      )
    );
  }
}

CheckBuildsExist();
