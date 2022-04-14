module.exports = {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            fontFamily: {
                'fira': ['Fira Code', 'mono'] 
            },
            dropShadow: {
                '3xl': '0 35px 35px rgba(0, 0, 0, 0.5)'
            }
        }
    },
    plugins: []
    
}