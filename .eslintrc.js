module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    'indent': ['error', 2], //强制一致的缩进风格
    // 'brace-style': [2, '1tbs', { allowSingleLine: false }], //大括号风格
    'comma-dangle': ['error', 'only-multiline'], //是否允许对象中出现结尾逗号
    //强制使用单引号
    'quotes': ['error', 'single'],
    //强制不使用分号结尾
    'semi': ['error', 'never']
  },
};
