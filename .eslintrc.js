module.exports = {
  parser: '@typescript-eslint/parser',

  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'airbnb-base',
    'airbnb-typescript/base',
  ],

    plugins: ['@typescript-eslint', 'import', 'simple-import-sort'],

    parserOptions: {
      ecmaVersion: 2018,
        sourceType: 'module',
        project: './tsconfig.json',
    },

    settings: {
      'import/resolver': {
          node: {
              extensions: ['.js', '.jsx', '.ts', '.tsx'],
              moduleDirectory: ['node_modules', 'src/'],
          },
      },
    },
    ignorePatterns: [
      '.eslintrc.js',
      'commitlint.config.js',
      'test/',
      'node_modules',
      'lib/',
      'coverage/',
      ],
}
