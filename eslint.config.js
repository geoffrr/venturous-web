import js from "@eslint/js";
import astro from "eslint-plugin-astro";
import prettier from "eslint-config-prettier";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";

export default [
  // Recommended JavaScript rules
  js.configs.recommended,
  // Astro plugin configuration (handles parsing for .astro files automatically)
  ...astro.configs.recommended,
  // Prettier config (disables conflicting ESLint rules)
  prettier,
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        console: "readonly",
        document: "readonly",
        window: "readonly",
        HTMLElement: "readonly",
        HTMLAnchorElement: "readonly",
        HTMLInputElement: "readonly",
        SVGSVGElement: "readonly",
        NodeListOf: "readonly",
        EventTarget: "readonly",
        navigator: "readonly",
        performance: "readonly",
      },
    },
    rules: {
      "no-console": "warn",
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "no-undef": "error",
      "prefer-const": "warn",
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsparser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        console: "readonly",
        document: "readonly",
        window: "readonly",
        HTMLElement: "readonly",
        HTMLAnchorElement: "readonly",
        HTMLInputElement: "readonly",
        SVGSVGElement: "readonly",
        NodeListOf: "readonly",
        EventTarget: "readonly",
        navigator: "readonly",
        performance: "readonly",
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      "no-console": "warn",
      "no-unused-vars": "off", // Turn off base rule
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "prefer-const": "warn",
    },
  },
  {
    files: ["**/*.astro"],
    rules: {
      "no-console": "warn",
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    // Ignore common directories
    ignores: [
      "node_modules/**",
      "dist/**",
      ".astro/**",
      "public/**",
      "scripts/**",
      "**/*.d.ts", // Ignore type definition files
    ],
  },
];
