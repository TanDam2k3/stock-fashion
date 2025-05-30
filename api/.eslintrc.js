module.exports = {
  extends: ['airbnb', 'plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020, // Hoặc version tùy thuộc vào ES mà bạn đang sử dụng
    sourceType: 'module'
  },
  rules: {
    'no-unused-vars': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'import/no-unresolved': 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.jsx', '.tsx']
      }
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        '': 'never'
      }
    ],
    'import/prefer-default-export': 0,
    'no-underscore-dangle': 0,
    'max-classes-per-file': 0,
    'max-len': 0,
    'max-lines': 0,
    'no-useless-constructor': 0,
    'no-empty-function': 0,
    'comma-dangle': ['error', 'never'],
    'class-methods-use-this': 0,
    'no-unused-expressions': 0,
    '@typescript-eslint/camelcase': 0,
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'jsx-a11y/anchor-is-valid': 0,
    'import/no-extraneous-dependencies': 0,
    'jsx-a11y/media-has-caption': 0,
    'react/jsx-props-no-spreading': 0,
    'react/state-in-constructor': 0,
    'react/jsx-no-bind': 0,
    'no-shadow': ['error', { hoist: 'never' }],
    'no-alert': 0
  },
  env: {
    commonjs: true,
    node: true,
    jest: true,
    es6: true,
    browser: true,
    worker: true
  },
  globals: {
    localStorage: true,
    window: true,
    File: true,
    Response: true,
    NodeJS: true
  }
};
