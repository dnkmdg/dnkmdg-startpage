module.exports = {
    darkMode: 'class',
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            fontFamily: {
                'fira': ['Fira Code', 'mono'],
                'inter': ['Inter', 'sans-serif'] 
            },
            dropShadow: {
                '3xl': '0 35px 35px rgba(0, 0, 0, 0.5)'
            }
        }
    },
    plugins: []
    
}