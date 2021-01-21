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
  
    // Test spec file resolution pattern
    // Matches parent folder `__tests__` and filename
    // should contain `test` or `spec`.
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    
    coverageDirectory:'coverage',
    collectCoverageFrom:['<rootDir>/src/ui/**/*.tsx', '<rootDir>/src/electron/**/*.ts'],
    coverageReporters: ['html'],
    modulePathIgnorePatterns: ['<rootDir>/src/import-undefined-issue'],

    // Module file extensions for importing
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  }
