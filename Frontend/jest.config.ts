import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
};

export default config;



  
  module.exports = {
    preset: 'ts-jest',
    setupFiles: ['<rootDir>/jest.setup.js'], // This should be correct
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    transformIgnorePatterns: [
      '/node_modules/(?!react-router-dom)/', // Example for handling specific modules
    ],
    // Other Jest configurations...
  };
  