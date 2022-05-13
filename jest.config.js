const nextJest = require('next/jest')

const createJestConfig = nextJest({
    dir: './',
})

const customJestConfig = {
    moduleDirectories: ['node_modules', '<rootDir>/'],
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['./jest.setup.js'],
    automock: false,
    resetMocks: false,

    transformIgnorePatterns: [
        "node_modules/(?!openid-client)/"
    ]
}

module.exports = createJestConfig(customJestConfig)