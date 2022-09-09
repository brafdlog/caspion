const releaseRules = {
  preset: 'eslint',
  releaseRules: [
    { tag: 'Breaking', release: 'major' },
    { tag: 'Build', release: 'minor' },
    { tag: 'Chore', release: 'minor' },
    { tag: 'Fix', release: 'patch' },
    { tag: 'New', release: 'minor' },
    { tag: 'Update', release: 'minor' },
    { tag: 'Upgrade', release: 'minor' }
  ]
};

module.exports = {
  branches: ['master'],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      releaseRules
    ],
    [
      '@semantic-release/release-notes-generator',
      releaseRules
    ],
    '@semantic-release/github',
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md'
      }
    ],
    [
      '@semantic-release/git',
      {
        assets: ['package.json', 'CHANGELOG.md'],
        // eslint-disable-next-line no-template-curly-in-string
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
      }
    ]
  ]
};
