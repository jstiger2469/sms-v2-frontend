module.exports = {
    extends: [
      'airbnb', // Airbnb base config
      'plugin:react/recommended',
      'plugin:jsx-a11y/recommended',
      'plugin:import/errors',
      'plugin:import/warnings',
      'plugin:import/react',
      'prettier', // Ensures Prettier settings are applied
    ],
    parser: '@babel/eslint-parser', // Updated parser
    env: {
      browser: true,
      node: true,
      es6: true,
    },
    rules: {
      'prettier/prettier': ['error', { singleQuote: true, trailingComma: 'all' }],
      'react/react-in-jsx-scope': 'off', // Next.js doesn't require React in scope,
      "react/function-component-definition": [2, { "namedComponents": "arrow-function" }],
      "no-underscore-dangle": ["error", { "allow": ["_id"] }]

    },
    plugins: ['prettier'], // Include Prettier plugin
  };
  