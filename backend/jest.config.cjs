module.exports = {
  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/**/*.js?(x)',
    '**/?(*.)(spec|test).[jt]s?(x)'
  ],
  transform: {
    '^.+\\.js$': 'babel-jest'
  }
}