export default {
	darkMode: "class", // مهم جدًا
	content: [
	  "./index.html",
	  "./src/**/*.{js,ts,jsx,tsx}"
	],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ['Montserrat-Arabic', 'sans-serif'],
  			cairo: ['Cairo', 'sans-serif'],
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		boxShadow: {
  			gold: '0 4px 20px -2px rgba(201, 162, 78, 0.15)',
  			'gold-glow': '0 0 25px rgba(201, 162, 78, 0.3)',
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			bgPrimary: '#050816',
  			bgSecondary: '#070B14',
  			bgTertiary: '#0A0F1F',
  			cardBg: '#111827',
  			goldPrimary: '#C9A24E',
  			goldSecondary: '#D4AF37',
  			textPrimary: '#FFFFFF',
  			textSecondary: '#CBD5E1',
  			textMuted: '#94A3B8',
  		}
  	}
  },
  extend: {
    colors: {
      primary: "#fbbc05",
      darkBg: "#111827",
      lightBg: "#f9fafb",
    },
  },
  plugins: [require("tailwindcss-animate")],
}
