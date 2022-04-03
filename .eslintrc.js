/**@type {import('eslint').Linter.Config} */
// eslint-disable-next-line no-undef
module.exports = {
    root: true,
    env: {
        es6: true,
        node: true,
        mocha: true,
    },
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
    ],
    rules: {
        semi: [2, "always"],
        "eol-last": "error",
        "@typescript-eslint/no-unused-vars": 0,
        "@typescript-eslint/no-var-requires": 0,
        "@typescript-eslint/no-explicit-any": 0,
        "@typescript-eslint/explicit-module-boundary-types": 0,
        "@typescript-eslint/no-non-null-assertion": 0,
    },
};
