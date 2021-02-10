module.exports = function () {
  return {
    name: 'Glasswall Desktop',
    files: [
      { pattern: 'src/__tests__/**/*.tsx', instrument: false, load: false, ignore: true },
      'src/**/*.ts',
      'src/**/*.tsx'
    ],

    tests: [
      'src/__tests__/_longrun_tests_/services/*.test.tsx'
    ],
    filesWithNoCoverageCalculated: [],
    testFramework: 'jest',
    env: {
      type: 'node',
      runner: 'node'  // or full path to any node executable
    },
    workers: {
      recycle: true
    },
    debug: true,
    reportConsoleErrorAsError: true,
    slowTestThreshold: 300 // 200 ms
  };
};
