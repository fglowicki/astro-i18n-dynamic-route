const prettierDefaultConfig = require('@sparing-software/prettier-config')

/** @type {import("prettier").Config} */
module.exports = {
  ...prettierDefaultConfig,
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro'
      }
    }
  ]
}
