import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Downgrade any-type errors to warnings — many UI libs require it
      "@typescript-eslint/no-explicit-any": "warn",
      // Allow _-prefixed variables/params to be unused (standard TS convention)
      "@typescript-eslint/no-unused-vars": ["error", {
        vars: "all",
        args: "after-used",
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      }],
    },
  },
];

export default eslintConfig;
