const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/app/**/*.{js,ts,jsx,tsx}',
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {},
	},
	darkMode: 'class',
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
		require('@tailwindcss/forms'),
	],
}
