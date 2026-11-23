/**
 * Linux on arm64 (e.g. Raspberry Pi). There are no official Caspion release artifacts
 * and no official Chromium builds published for this platform.
 */
export const isLinuxArm64 = process.platform === 'linux' && process.arch === 'arm64';
