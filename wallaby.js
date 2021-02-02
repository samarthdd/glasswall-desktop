module.exports = function () {
  return {
    files: [
      {pattern: 'src/__tests__/**/*.tsx',  instrument: false, load: false, ignore: false },
      {pattern: 'src/App.test.js', ignore: true },
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

    testFramework: 'mocha',

    env: {
      kind: 'chrome'
    },
    env: {
      kind: 'chrome'
    },
    debug: true
    
  };
};
