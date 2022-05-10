const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: [
    "<rootDir>/src/tests/setupTests.ts"
],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverage: true,
  collectCoverageFrom: [
      "src/**/*.tsx",
      "!src/**/*.spec.tsx",
      "!src/pages/_app.tsx",
      "!src/pages/_document.tsx",
  ],
  coverageReporters: ["lcov", "json"]
}

module.exports = createJestConfig(customJestConfig)