import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import typography from '@tailwindcss/typography';

export default {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        },
        purple: {
          DEFAULT: '#6b5b9a',
          500: '#6b5b9a',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        'menuSlide': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'menuSlide': 'menuSlide 0.2s cubic-bezier(0.23, 1, 0.32, 1)'
      },
      fontFamily: {
        jetbrains: [
          'JetBrains Mono',
          'monospace'
        ],
        sans: [
          'var(--font-sans)',
          'system-ui',
          'sans-serif'
        ]
      },
      typography: {
        DEFAULT: {
          css: {
            'code::before': {
              content: '"'
            },
            'code::after': {
              content: '"'
            },
            code: {
              fontFamily: 'JetBrains Mono, monospace',
              backgroundColor: 'hsl(var(--muted))',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontSize: '0.875em'
            },
            pre: {
              backgroundColor: 'hsl(var(--muted))',
              padding: '1.25em',
              borderRadius: '0.5rem',
              overflow: 'auto'
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
              fontSize: '0.875em'
            },
            blockquote: {
              borderLeftColor: 'hsl(var(--primary) / 0.3)',
              backgroundColor: 'hsl(var(--primary) / 0.05)',
              padding: '1rem',
              borderRadius: '0.25rem'
            },
            h1: {
              fontFamily: 'JetBrains Mono, monospace',
              color: 'hsl(var(--foreground))'
            },
            h2: {
              fontFamily: 'JetBrains Mono, monospace',
              color: 'hsl(var(--foreground))',
              borderBottomColor: 'hsl(var(--border))'
            },
            h3: {
              fontFamily: 'JetBrains Mono, monospace',
              color: 'hsl(var(--foreground))'
            }
          }
        }
      }
    }
  },
  plugins: [animate, typography],
} satisfies Config;