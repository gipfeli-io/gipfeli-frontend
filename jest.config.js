/** @type {import('@jest/types').Config.InitialOptions} */
const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['./jest.setup.js'],
  automock: false,
  resetMocks: false
}

module.exports = customJestConfig
