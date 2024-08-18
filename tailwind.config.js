/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,jsx,tsx}'],
    theme: {
        extend: {
            width: {
                '128': '36rem',
            },
            colors: {
                "side-bar": "#4b687a",
                "content": "#e9ecef"
            },
            fontFamily: {
                poppins: ['"Poppins-Medium"', "sans-serif"],
                "poppins-light": ['"Poppins-Light"', "sans-serif"],
                "poppins-bold": ['"Poppins-Bold"', "sans-serif"]
            },
        },
    },
    plugins: []
}

