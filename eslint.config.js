import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
});

export default [
	{
		ignores: [
			'.storybook/',
			'docs/',
			'i18n/',
			'node_modules/',
			'vendor/',
			'**/eslint.config.js',
			'**/package.json',
			'**/package-lock.json',
			'**/pnpm-lock.yaml',
			'resources/libraries/',
			'Gruntfile.js',
		]
	},
	...compat.extends(
		'wikimedia/client-common',
		"wikimedia/jquery",
		'wikimedia/language/es2022',
		'wikimedia/mediawiki'
	),
	{
		languageOptions: {
			globals: {
				...globals.browser,
				exports: true
			},

			ecmaVersion: 11,
			sourceType: 'module'
		},

		rules: {
			'space-in-parens': 0,
			'no-jquery/no-global-selector': 'off'
		}
	}
];
