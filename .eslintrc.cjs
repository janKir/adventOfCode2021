module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ["prettier"],
  extends: [
    "standard",
    "prettier", // eslint-config-prettier Turns off all rules that are unnecessary or might conflict with Prettier.
    "plugin:prettier/recommended", // extend eslint-config-prettier rules
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {},
};
