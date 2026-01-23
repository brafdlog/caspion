import { execSync } from 'child_process';
import { statSync, existsSync, readdirSync } from 'fs';
import { resolve } from 'path';

const projectRoot = resolve(import.meta.dirname, '..');

function findSourceFiles(dir) {
  const files = [];
  const entries = readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findSourceFiles(fullPath));
    } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx'))) {
      files.push(fullPath);
    }
  }

  return files;
}

function getLatestSourceModificationTime(sourceDir) {
  try {
    const sourceFiles = findSourceFiles(resolve(projectRoot, sourceDir));

    let latestTime = 0;
    for (const file of sourceFiles) {
      const stat = statSync(file);
      if (stat.mtimeMs > latestTime) latestTime = stat.mtimeMs;
    }
    return latestTime;
  } catch {
    return Date.now(); // If error, assume rebuild needed
  }
}

function getBuildOutputModificationTime(distFile) {
  try {
    if (!existsSync(distFile)) return 0;
    return statSync(distFile).mtimeMs;
  } catch {
    return 0;
  }
}

const mainSourceLastModified = getLatestSourceModificationTime('packages/main/src');
const preloadSourceLastModified = getLatestSourceModificationTime('packages/preload/src');
const mainBuildLastModified = getBuildOutputModificationTime(resolve(projectRoot, 'packages/main/dist/index.js'));
const preloadBuildLastModified = getBuildOutputModificationTime(resolve(projectRoot, 'packages/preload/dist/index.js'));

const mainNeedsRebuild = mainSourceLastModified > mainBuildLastModified;
const preloadNeedsRebuild = preloadSourceLastModified > preloadBuildLastModified;

if (mainNeedsRebuild || preloadNeedsRebuild) {
  console.log('Source files changed, rebuilding...');
  if (mainNeedsRebuild) {
    console.log('Building main...');
    execSync('yarn build:main', { stdio: 'inherit', cwd: projectRoot });
  }
  if (preloadNeedsRebuild) {
    console.log('Building preload...');
    execSync('yarn build:preload', { stdio: 'inherit', cwd: projectRoot });
  }
} else {
  console.log('Build is up to date, skipping...');
}

console.log('Starting scrape...');
execSync('electron . --scrape', { stdio: 'inherit', cwd: projectRoot });
