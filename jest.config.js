const customJestConfig = {
  preset: 'ts-jest',
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.ts|tsx?$': 'ts-jest'
  },
  automock: false,
  resetMocks: false
}

module.exports = customJestConfig
