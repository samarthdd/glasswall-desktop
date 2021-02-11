module.exports = function () {
  return {
    name: 'Glasswall Desktop',
    files: [
      { pattern: 'src/__tests__/**/*.tsx', instrument: false, load: false, ignore: true },
      { pattern: 'src/App.test.js', ignore: true },
      'src/**/*.ts',
      'src/**/*.tsx',
      { pattern: 'src/electron/index.ts', iinstrument: false, load: false, ignore: true },
      { pattern: 'src/ui/index.tsx', iinstrument: false, load: false, ignore: true }
    ],

    tests: [
      'src/__tests__/views/*.test.tsx',
      'src/__tests__/components/*.test.tsx',
      'src/__tests__/services/loggerService.test.tsx',
      'src/__tests__/services/policyService.test.tsx',
      'src/__tests__/services/dockerService.test.tsx',
      'src/__tests__/utils/utils.test.tsx',
      'src/__tests__/utils/rebuild.test.tsx',
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
    debug: false,
    // reportConsoleErrorAsError: true,
    slowTestThreshold: 300 // 200 ms
  };
};
