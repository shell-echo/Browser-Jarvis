import pluginJs from "@eslint/js";
import importPlugin from "eslint-plugin-import";
// import pluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
	{ ignores: ["dist"] },
	{ files: ["**/*.{ts,tsx}"] },
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	// pluginReact.configs.flat.recommended,
	{
		plugins: {
			"react-hooks": reactHooks,
			"react-refresh": reactRefresh,
			"import": importPlugin,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			"react-refresh/only-export-components": [
				"warn",
				{ allowConstantExport: true },
			],
			"quotes": ["error", "double", { "avoidEscape": true }],
			"semi": ["error", "always"],
			"import/order": [
				"error",
				{
					"groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
					"newlines-between": "always",
					"alphabetize": { "order": "asc", "caseInsensitive": true },
				},
			],
			"no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0, maxBOF: 0 }],
		},
	},
];