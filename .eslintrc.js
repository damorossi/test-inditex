module.exports = {
  root: true,
  overrides: [
    {
      files: ['*.js'],
      plugins: [
        'react'
      ],
      extends: ['airbnb'],
      rules: {
        'linebreak-style': 'off',
        'arrow-parens': ['error', 'as-needed'],
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'import/prefer-default-export': 'off',
        'no-console': 'off',
        'react/jsx-filename-extension': 'off',
        'import/extensions': 'off',
        'comma-dangle': ['error', 'only-multiline'],
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
      plugins: [
        'react'
      ],
      extends: ['airbnb'],
      rules: {
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'error',
        'linebreak-style': 'off',
        'func-style': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        'react/jsx-indent-props': 'off',
        'react/jsx-closing-tag-location': 'off',
        'comma-dangle': ['error', 'only-multiline'],
        eqeqeq: 'error',
        'no-console': 'warn',
        'template-curly-spacing': ['error', 'never'],
        'object-curly-spacing': [2, 'always'],
        'react/jsx-curly-spacing': [2, 'never', {
          allowMultiline: false,
          spacing: { objectLiterals: 'always' }
        }],
        'newline-after-var': ['error', 'always'],
        'keyword-spacing': ['error', { before: true }],
        'max-len': [1, {
          code: 120, tabWidth: 2, ignoreUrls: true, ignoreComments: true,
        }],
        'space-before-blocks': 1,
        'key-spacing': [1, { afterColon: true }],
        'space-infix-ops': [1, { int32Hint: false }],
        'spaced-comment': ['error', 'always']
      },
    },
  ],
};
