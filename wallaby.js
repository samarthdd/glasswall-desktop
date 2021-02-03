module.exports = function () {
  return {
    name: 'Glasswall Desktop',
    files: [
      { pattern: 'src/__tests__/**/*.tsx', instrument: false, load: false, ignore: false },
      { pattern: 'src/App.test.js', ignore: true },
      'src/**/*.ts',
      'src/**/*.tsx'
    ],

    tests: [
      'src/__tests__/views/*.test.tsx',
      'src/__tests__/components/*.test.tsx',
      'src/__tests__/services/loggerService.test.tsx',
      'src/__tests__/services/policyService.test.tsx',
      'src/__tests__/services/rebuildSessionsService.tsx',
      'src/__tests__/services/cloudRebuildService.tsx',
      'src/__tests__/services/threatIntelligenceService.test.tsx',
      'src/__tests__/utils/utils.test.tsx',
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
