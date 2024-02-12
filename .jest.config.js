module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.scss$': 'jest-transform-css',
  },
};