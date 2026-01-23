import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                "accent-100": "#f7cb6b", // Yellow/Gold
                "accent-200": "#fba980", // Peach/Soft Orange
                "dark-500": "#111111",   // Black/Dark Grey
            },
            fontFamily: {
                handwriting: ["var(--font-dancing)"],
                serif: ["var(--font-playfair)"],
                sans: ["var(--font-montserrat)"],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1))',
            }
        },
    },
    plugins: [],
};
export default config;
