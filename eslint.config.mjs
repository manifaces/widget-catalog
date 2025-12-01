import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh';
import eslintJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginRouter from '@tanstack/eslint-plugin-router';
import typescriptEslint from 'typescript-eslint';

const frontFiles = ['src/**/*.{ts,tsx}'];
const frontImportTypes = ['components', 'features', 'hooks', 'routes', 'store', 'services', models];

export default [
  // global ignores
  { ignores: ['**/.*', 'node_modules', 'dist'] },

  // FRONT: typescript-eslint
  { ...eslintJs.configs.recommended, files: frontFiles },
  ...typescriptEslint.configs.strictTypeChecked.map((config) => ({ ...config, files: frontFiles })),
  ...typescriptEslint.configs.stylisticTypeChecked.map((config) => ({ ...config, files: frontFiles })),
  { files: frontFiles, languageOptions: { parserOptions: { ecmaVersion: 'latest', projectService: true } } },

   // FRONT: eslint-plugin-react
  { ...eslintPluginReact.configs.flat.recommended, files: frontFiles },
  { ...eslintPluginReact.configs.flat['jsx-runtime'], files: frontFiles },
  // если не указать версию, то eslint-plugin-react показывает warning
  { files: frontFiles, settings: { react: { version: 'detect' } } },

  // FRONT: @tanstack/eslint-plugin-router
  ...eslintPluginRouter.configs['flat/recommended'],

  {
    // FRONT: custom rules
    files: frontFiles,
    plugins: {
      'react-hooks': eslintPluginReactHooks,
      'react-refresh': eslintPluginReactRefresh,
      import: eslintPluginImport
    },
    rules: {
      'no-irregular-whitespace': [1, { skipJSXText: true }],
      '@typescript-eslint/no-unused-vars': [2, { caughtErrors: 'none' }],
      '@typescript-eslint/no-unused-expressions': [2, { allowShortCircuit: true }],
      '@typescript-eslint/no-unnecessary-type-parameters': 0,
      '@typescript-eslint/no-misused-promises': [2, { checksVoidReturn: { attributes: false, arguments: false } }],
      ...eslintPluginReactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [1, { allowConstantExport: true }],
      'import/order': [
        1,
        {
          'newlines-between': 'never',
          alphabetize: { order: 'asc', caseInsensitive: true },
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
          pathGroups: [
            { pattern: 'react', group: 'external', position: 'before' },
            ...frontImportTypes.map((frontImportType) => ({
              pattern: `${frontImportType}/**/*`,
              group: 'internal'
            })),
            { pattern: './*.module.scss', group: 'sibling', position: 'after' }
          ],
        }
      ]
    }
  },

  // global prettier
  eslintConfigPrettier
];