const js = require('@eslint/js');
const globals = require('globals');
const reactHooks = require('eslint-plugin-react-hooks');
const reactRefresh = require('eslint-plugin-react-refresh');
const tseslint = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const prettier = require('eslint-plugin-prettier');
const importPlugin = require('eslint-plugin-import');
const path = require('path');

const srcPath = path.resolve(__dirname, 'src');

module.exports = [
  js.configs.recommended,

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.browser,
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },

  {
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },

  {
    plugins: {
      prettier: prettier,
    },
    rules: {
      'prettier/prettier': ['error'],
    },
  },

  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      'import/no-unresolved': ['error'],
      'import/named': 'error',
      'import/default': 'error',
    },

    settings: {
      'import/resolver': {
        alias: {
          map: [
            ['components', path.join(srcPath, 'components')],
            ['config', path.join(srcPath, 'config')],
            ['styles', path.join(srcPath, 'styles')],
            ['assets', path.join(srcPath, 'assets')],
            ['api', path.join(srcPath, 'api')],
            ['hooks', path.join(srcPath, 'hooks')],
            ['helpers', path.join(srcPath, 'helpers')],
            ['stores', path.join(srcPath, 'stores')],
            ['utils', path.join(srcPath, 'utils')],
            ['routes', path.join(srcPath, 'routes')],
          ],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  },
];
