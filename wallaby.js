module.exports = function () {
  return {
    files: [
      'src/**/*.js',
      'src/**/*.ts',
      'src/**/*.tsx'
    ],

    tests: [
      'src/__tests__/*.test*.tsx'
    ],

    setup: function () {
      global.expect = require('chai').expect;
    },

    env: {
      kind: 'chrome'
    },
    env: {
      kind: 'chrome'
    },
    debug: true
    
  };
};
