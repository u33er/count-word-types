module.exports = {
    /* The glob patterns Jest uses to detect test files */
    testMatch: ['<rootDir>/**/*.test.{ts,tsx}'],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    /* A map from regular expressions to paths to transformers - synchronous functions for transforming source files. */
    transform: {
      '\\.(ts|tsx)$': 'ts-jest',
    },
    transformIgnorePatterns: [],
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
      // aws-jwt-verify bug workaround: https://github.com/awslabs/aws-jwt-verify/issues/66
      '#node-web-compat': './node-web-compat-node.js',
    },
    testEnvironment: 'node',
  };
  