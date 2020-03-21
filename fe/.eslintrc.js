module.exports = {
  extends: ["react-app", "plugin:prettier/recommended"],
  rules: {
    "no-console": "error",
    "import/no-unresolved": "error",
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
      },
    ],
  },
};
