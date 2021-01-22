module.exports = {
  root: true,
  extends: [
    "plugin:vue/recommended",
    'standard'
  ],
  parserOptions: {
    parser: "babel-eslint", // I guess we have prettier using eslint using babel-eslint? :(
    sourceType: "module"
  },
};
