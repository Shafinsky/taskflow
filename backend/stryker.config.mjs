// @ts-check
/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
const config = {
  packageManager: 'npm',

  testRunner: 'jest',
  reporters: ['html', 'clear-text', 'progress'],

  coverageAnalysis: 'perTest',

  mutate: [
    'src/**/*.ts',
    '!src/**/*.spec.ts',
    '!src/main.ts',
    '!src/app.module.ts',
  ],

  jest: {
    projectType: 'custom',
    configFile: 'jest.config.js',
  },

  thresholds: {
    high: 80,
    low: 60,
    break: 50,
  },
};

export default config;
