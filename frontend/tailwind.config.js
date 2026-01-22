/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#050505', // Very dark black
                foreground: '#ffffff',
                primary: {
                    DEFAULT: '#FF3B1D', // Kinative Red
                    foreground: '#ffffff',
                },
                secondary: {
                    DEFAULT: '#1A1A1A',
                    foreground: '#ffffff',
                },
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Outfit', 'sans-serif'],
            },
            animation: {
                'spin-slow': 'spin 10s linear infinite',
                'marquee': 'marquee 25s linear infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
            },
        },
    },
    plugins: [],
}
