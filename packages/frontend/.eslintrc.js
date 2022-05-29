const path = require("path")

module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: [
    "eslint:recommended",
    "react-app",
    "plugin:import/recommended",
    "prettier",
  ],
  plugins: ["import", "prettier"],
  ignorePatterns: ["public/**/*.js"],
  rules: {
    "prettier/prettier": "error",
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],
    "import/no-self-import": "error",
  },
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      env: { browser: true, es6: true, node: true },
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "react-app",
        "plugin:import/recommended",
        "plugin:import/typescript",
        "prettier",
      ],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2018,
        sourceType: "module",
        project: path.join(__dirname, "tsconfig.json"),
      },
      plugins: ["@typescript-eslint", "import", "prettier"],
      rules: {
        "@typescript-eslint/no-unused-vars": "error",
      },
    },
  ],
}
