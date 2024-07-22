import type { Config } from "tailwindcss";
import { nextui } from '@nextui-org/theme'

const allBelow = "**/*.{js,ts,jsx,tsx,mdx}";
const config: Config = {
    content: [
		`./src/pages/${allBelow}`,
        // `./src/pages/${allBelow}`,
        // `./src/components/${allBelow}`,
        // `./src/app/${allBelow}`,
        // `./src/tailwindStyles/${allBelow}`,
		`./node_modules/@nextui-org/theme/dist/${allBelow}`,
		// single component styles
		"./node_modules/@nextui-org/theme/dist/components/button.js",
		// or you can use a glob pattern (multiple component styles)
		'./node_modules/@nextui-org/theme/dist/components/(button|snippet|code|input).js'
    ],
	theme: {
		extend: {},
	},
	darkMode: "class",
	plugins: [nextui()],
};

export default config;
