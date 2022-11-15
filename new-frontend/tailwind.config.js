/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                'cal-sans': ['Cal Sans', 'sans-serif'],
                'dm-sans': ['DM Sans', 'sans-serif'],
            },
            boxShadow: {
                small: '0px 1px 2px rgba(13, 16, 45, 0.1)',
                base: '0px 2px 4px rgba(13, 16, 45, 0.1), 0px 1px 2px -1px rgba(13, 16, 45, 0.1)',
                medium: '0px 4px 6px -1px rgba(13, 16, 45, 0.1), 0px 2px 4px -2px rgba(13, 16, 45, 0.1)',
                large: '0px 10px 15px -3px rgba(13, 16, 45, 0.1), 0px 4px 6px -4px rgba(13, 16, 45, 0.1)',
                xlarge: '0px 20px 25px -5px rgba(13, 16, 45, 0.1), 0px 8px 10px -6px rgba(13, 16, 45, 0.1)',
                '2xlarge':
                    '0px 12px 24px rgba(13, 16, 45, 0.1), 0px 25px 50px -12px rgba(13, 16, 45, 0.1)',
            },
            colors: {
                accent: {
                    default: '#8358FF',
                    dark: '#7444FF',
                    light: '#9E7CFF',
                    lighter: '#B9A0FF',
                },
                'light-blue': '#F5F8FA',
                jacarta: {
                    50: '#F4F4F6',
                    100: '#E7E8EC',
                    200: '#C4C5CF',
                    300: '#A1A2B3',
                    400: '#7D7F96',
                    500: '#5A5D79',
                    600: '#363A5D',
                    700: '#131740',
                    800: '#101436',
                    900: '#0D102D',
                },
                green: '#10b981',
                orange: '#FEB240',
                red: '#EF4444',
                blue: '#428AF8',
                white: '#FFFFFF',
            },
        },
    },
    plugins: [],
};
