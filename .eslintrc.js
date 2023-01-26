module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'standard'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', 'prettier'],
  rules: {
    indent: ['error', 2],
    semi: ['error', 'never'],
    'space-before-function-paren': ['error', 'never'],
    quotes: [1, 'single', { allowTemplateLiterals: true }]
  }
}
//'standard',
