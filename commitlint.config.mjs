/** @type {import('@commitlint/types').UserConfig} */
export default {
	extends: ['@commitlint/config-conventional'],
	rules: {
		// Keep subjects concise but descriptive (matches recent repo history).
		'header-max-length': [2, 'always', 72],
		// Body/footer should be flowing prose — no hard wraps at column 72.
		'body-max-line-length': [2, 'always', 200],
		'footer-max-line-length': [2, 'always', 200],
		'body-leading-blank': [2, 'always'],
		'footer-leading-blank': [2, 'always'],
	},
}
