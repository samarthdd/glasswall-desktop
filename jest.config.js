  module.exports = {
    // The root of your source code, typically /src
    // `<rootDir>` is a token Jest substitutes
    roots: ['<rootDir>/src'],
  
    // Jest transformations -- this adds support for TypeScript
    // using ts-jest
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
  
    testEnvironmentOptions: {
      enzymeAdapter: 'react16',
    },

    // Runs special logic, adding special
    // extended assertions to Jest
    setupFilesAfterEnv: [
      '@testing-library/jest-dom/extend-expect'
    ],
    // setupFiles: ["<rootDir>/jest.setup.js"],
    // Test spec file resolution pattern
    // Matches parent folder `__tests__` and filename
    // should contain `test` or `spec`.
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    
    coverageDirectory:'coverage',
    collectCoverageFrom:['<rootDir>/src/ui/**/*.tsx', '<rootDir>/src/electron/**/*.ts'],
    coverageReporters: ['lcov'],
    modulePathIgnorePatterns: ['<rootDir>/src/import-undefined-issue'],
    snapshotSerializers: [
      "enzyme-to-json/serializer"
    ],

    // Module file extensions for importing
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
      ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "identity-obj-proxy"
    }
  }
