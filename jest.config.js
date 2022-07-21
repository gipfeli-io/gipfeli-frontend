const customJestConfig = {
  preset: 'ts-jest',
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.ts|tsx?$': 'ts-jest',
    '^.+\\.(js|jsx|mjs)$': 'babel-jest' // required, because e.g. OpenLayers cannot be transformed directly
  },
  automock: false,
  resetMocks: false,
  transformIgnorePatterns: [
    'node_modules/(?!(ol|dexie|uuid)/)' // Exclude from transform to force babel-jest to bundle it
  ],

  /**
     * In order to use CSS Modules and Image imports, this proxy has to be used.
     * See https://stackoverflow.com/a/59283057
     */
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js'
  }
}

module.exports = customJestConfig
