// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

/** @type {import("eslint").Linter.Config} */
const config = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: path.join(__dirname, 'tsconfig.json'),
  },
  plugins: ['@typescript-eslint', 'simple-import-sort', 'unused-imports'],
  extends: ['next/core-web-vitals', 'plugin:@typescript-eslint/recommended'],
  // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
  rules: {
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      },
    ],
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'warn',
    'unused-imports/no-unused-imports': 'error',
  },
}

module.exports = config
