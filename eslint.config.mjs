// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import drizzle from 'eslint-plugin-drizzle'
import tsParser from '@typescript-eslint/parser'

export default withNuxt({}, [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        projectService: true,
      },
    },
    plugins: {
      drizzle,
    },
    rules: {
      'drizzle/enforce-delete-with-where': 'error',
      'drizzle/enforce-update-with-where': 'error',
    },
  },
])
