const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',

		// Or if using `src` directory:
		'./src/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {},
	},
	plugins: [
		plugin(function ({ addUtilities }) {
			addUtilities({
				/* Hide scrollbar for Chrome, Safari and Opera */
				'.no-scrollbar::-webkit-scrollbar': {
					display: 'none',
				},
				/* Hide scrollbar for IE, Edge and Firefox */
				'.no-scrollbar': {
					'-ms-overflow-style': 'none' /* IE and Edge */,
					'scrollbar-width': 'none' /* Firefox */,
				},
			})
		}),
	],
}
