module.exports = {
  extends: ['@sparing-software/eslint-config', 'plugin:astro/recommended'],
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro']
      },
      rules: {
        // All rules: https://ota-meshi.github.io/eslint-plugin-astro/rules/
      }
    }
  ]
}
