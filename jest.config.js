const customJestConfig = {
  preset: 'ts-jest',
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.ts|tsx?$': 'ts-jest'
  },
  automock: false,
  resetMocks: false,

  /**
     * In order to use CSS Modules, this proxy has to be used.
     * See https://stackoverflow.com/a/59283057
     */
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  }
}

module.exports = customJestConfig
