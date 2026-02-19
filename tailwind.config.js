/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // ─── Backgrounds (warm-dark, not cold-grey) ───────────────
                'primary-bg': '#13110f',   // Deep warm charcoal
                'secondary-bg': '#1f1a15',   // Warm dark brown-grey
                'card-bg': '#252018',   // Slightly lighter warm card
                'hover-bg': '#2e2820',   // Hover warm shade
                'border-color': '#3d3428',   // Warm border

                // ─── Text ─────────────────────────────────────────────────
                'text-primary': '#f5f0e8', // Warm white (not cold white)
                'text-secondary': '#a89880', // Warm muted tan

                // ─── Accents (vibrant, food-passionate, non-AI) ───────────
                'accent-green': '#00b894', // Jade / fresh herb green
                'accent-orange': '#ff5f40', // Vivid coral-red (paprika vibes)
                'accent-gold': '#ffbe0b', // Rich saffron / amber gold
                'accent-rose': '#ff4d6d', // Deep cherry / berry
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                serif: ['Georgia', 'serif'],
            },
            boxShadow: {
                'card': '0 2px 12px rgba(0, 0, 0, 0.45)',
                'card-hover': '0 6px 24px rgba(0, 0, 0, 0.6)',
                'glow-jade': '0 0 20px rgba(0,184,148,0.25)',
                'glow-coral': '0 0 20px rgba(255,95,64,0.25)',
                'glow-gold': '0 0 20px rgba(255,190,11,0.25)',
            },
        },
    },
    plugins: [],
}

