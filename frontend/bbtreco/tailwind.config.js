/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}", "./<components>/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#E4C59E",
				secondary: "#B57C4F",
				tertiary: "#680700",
				dark: "#322C2B",
			},
		},
	},
	plugins: [],
};
