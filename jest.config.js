const { jsWithBabelESM: tsjPreset } = require('ts-jest/presets')
const customJestConfig = {
  preset: 'ts-jest',
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    ...tsjPreset.transform,
    '^.+\\.ts|tsx|js|jsx?$': 'ts-jest'
  },
  automock: false,
  resetMocks: false,
  transformIgnorePatterns: [
    'node_modules/(?!(ol|dexie|geotiff|quick-lru|ol-ext)/)' // Exclude from transform to force babel-jest to bundle it
  ],
  moduleNameMapper: {
    // required to use import css syntax
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // required to use import file (e.g. image) syntax
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js'
  }
}

module.exports = customJestConfig
