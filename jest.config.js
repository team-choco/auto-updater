module.exports = {
  cacheDirectory: './node_modules/.cache/jest',
  clearMocks: true,
  collectCoverageFrom: [
    'src/**/*.js',
  ],
  coveragePathIgnorePatterns : [
    '<rootDir>/.*/__test__/',
    '<rootDir>/.*/__integration__/',
  ],
  testEnvironment: 'node',
  verbose: Boolean(process.env.CI),
  testTimeout: 5000,
  testRegex: '__test__/[^/.]+\\.spec\\.js$',
};
