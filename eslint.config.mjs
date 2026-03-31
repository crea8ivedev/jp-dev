import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    ignores: [
      "assets/**/*.min.js",
      "assets/**/*.min.css",
      "assets/application.css.liquid",
      "assets/global.js",
      "assets/custom.js",
      "assets/facets.js",
      "assets/cart.js",
      "assets/localization-form.js",
      "assets/pickup-availability.js",
      "assets/product-form.js",
      "assets/product-info.js",
      "assets/product-modal.js",
      "assets/quick-add-bulk.js",
      "quick-order-list.js",
      "assets/quick-order-list.js"
    ],
  },
  {
    files: ["**/*.js"],
    ignores: ["assets/**/*.min.js", "assets/**/*.min.css", "assets/application.css.liquid", "assets/global.js"],
    languageOptions: { sourceType: "module", ecmaVersion: "latest" },
    rules: {
      "no-unused-vars": "warn", // Disallows variables that are declared but never used in the code
      "no-console": "warn", // error about console logs
      "no-debugger": "warn", // Disallows debugger statements
      "no-alert": "warn", // Discourages use of alert, confirm, and prompt
      eqeqeq: ["warn", "always"], // Enforces strict equality (=== and !==)
      curly: "warn", // Requires curly braces for all control statements
      "no-undef": "warn", // Disallows use of undeclared variables
      "no-use-before-define": ["warn", { functions: false, classes: true }], // Prevents usage before declaration
      "no-shadow": "warn", // Disallows variable shadowing
      "prefer-const": "warn", // Enforces use of const where possible
      "no-var": "warn", // Enforces let/const over var
      "prefer-template": "warn", // Encourages template literals instead of string concatenation
      "no-loop-func": "warn", // Disallows function definitions inside loops
      "max-depth": ["warn", 4], // Limits nesting depth
      "no-duplicate-imports": "warn", // Prevents duplicate imports
      "no-implied-eval": "warn", // Prevents use of `setTimeout` and `setInterval` with string arguments
      "no-self-compare": "warn", // Prevents `x == x` which is usually a mistake
      "no-useless-return": "warn", // Disallows redundant `return` statements
      "no-unsafe-optional-chaining": "warn", // Avoids errors from unsafe `?.` operations
      "array-callback-return": "warn", // Ensures `.map()`, `.filter()`, and `.reduce()` have return statements
    },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    rules: {
      "no-undef": "off",
      "no-unused-vars": "off",
      "no-self-assign": "off",
      "no-unreachable": "off",
    },
  },
];
