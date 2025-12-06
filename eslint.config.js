import js from "@eslint/js";
import astro from "eslint-plugin-astro";
import prettier from "eslint-config-prettier";

export default [
  // Recommended JavaScript rules (minimal, catches real issues)
  js.configs.recommended,

  // Astro plugin configuration
  ...astro.configs.recommended,

  // Global ignores
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      ".astro/**",
      "*.config.js",
      "*.config.mjs",
    ],
  },

  // JavaScript/TypeScript files
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        console: "readonly",
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
      },
    },
    rules: {
      // Helpful but not annoying rules
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "no-console": "off", // Allow console.log in development
      "no-debugger": "warn",
      "no-duplicate-imports": "warn",
      "no-unreachable": "warn",
      "prefer-const": "warn",
      "no-var": "warn",
    },
  },

  // Astro files
  {
    files: ["**/*.astro"],
    languageOptions: {
      parser: astro.parser,
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
    },
    rules: {
      // Astro-specific rules
      "astro/no-conflict-set-directives": "error",
      "astro/no-unused-define-vars-in-style": "warn",
      // Disable some rules that are too strict for Astro
      "no-unused-vars": "off", // TypeScript handles this better
    },
  },

  // Prettier integration (disables conflicting rules)
  prettier,
];
