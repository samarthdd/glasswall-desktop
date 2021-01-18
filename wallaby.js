module.exports = function () {
  return {
    files: [
      'src/**/*.js',
      'src/**/*.ts',
      'src/**/*.tsx'
    ],

    tests: [
      'tests/**/Test*.js'
    ],

    setup: function () {
      global.expect = require('chai').expect;
    },

    env: {
      type: 'node',
      runner: 'node'
    }
  };
};
