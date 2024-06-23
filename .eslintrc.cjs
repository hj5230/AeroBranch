module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    '@electron-toolkit/eslint-config-ts/recommended',
    '@electron-toolkit/eslint-config-prettier'
  ],
  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-trailing-spaces': 'error',
    'eol-last': ['error', 'always']
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
