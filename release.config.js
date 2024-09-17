const releaseRules = {
  preset: 'eslint',
  releaseRules: [
    { tag: 'Breaking', release: 'major' },
    { tag: 'Build', release: 'minor' },
    { tag: 'Chore', release: 'minor' },
    { tag: 'Fix', release: 'patch' },
    { tag: 'New', release: 'minor' },
    { tag: 'Update', release: 'minor' },
    { tag: 'Upgrade', release: 'minor' },
    { tag: 'Deps', release: 'patch' },
  ],
};

export default {
  branches: ['master'],
  plugins: [
    ['@semantic-release/commit-analyzer', releaseRules],
    '@semantic-release/github',
  ],
};
