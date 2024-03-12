import type { Config } from "tailwindcss";

const allBelow = "**/*.{js,ts,jsx,tsx,mdx}";
const config: Config = {
    content: [
        `./src/pages/${allBelow}`,
        `./src/components/${allBelow}`,
        `./src/app/${allBelow}`,
        `./src/tailwindStyles/${allBelow}`
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};

export default config;
