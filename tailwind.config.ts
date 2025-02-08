import type { Config } from "tailwindcss";

export default {
   darkMode: ["class"],
   content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
   theme: {
      extend: {
         colors: {
            textPrimary: "#1E293B", // Dark Blue-Gray
            textSecondary: "#64748B", // Muted Gray
            success: "#10B981", // Green (Success)
            warning: "#F59E0B", // Orange (Warning)
            error: "#EF4444", // Red (Error)

            background: "#F8FAFC",
            foreground: "hsl(var(--foreground))",
            card: {
               DEFAULT: "#E3F2FD",
               foreground: "hsl(var(--card-foreground))",
            },
            popover: {
               DEFAULT: "hsl(var(--popover))",
               foreground: "hsl(var(--popover-foreground))",
            },
            primary: {
               DEFAULT: "#0077B6",
               foreground: "hsl(var(--primary-foreground))",
            },
            secondary: {
               DEFAULT: "#00A8E8", // Sky Blue
               foreground: "hsl(var(--secondary-foreground))",
            },
            muted: {
               DEFAULT: "hsl(var(--muted))",
               foreground: "hsl(var(--muted-foreground))",
            },
            accent: {
               DEFAULT: "hsl(var(--accent))",
               foreground: "hsl(var(--accent-foreground))",
            },
            destructive: {
               DEFAULT: "hsl(var(--destructive))",
               foreground: "hsl(var(--destructive-foreground))",
            },
            border: "hsl(var(--border))",
            input: "hsl(var(--input))",
            ring: "hsl(var(--ring))",
            chart: {
               "1": "hsl(var(--chart-1))",
               "2": "hsl(var(--chart-2))",
               "3": "hsl(var(--chart-3))",
               "4": "hsl(var(--chart-4))",
               "5": "hsl(var(--chart-5))",
            },
         },
         borderRadius: {
            lg: "var(--radius)",
            md: "calc(var(--radius) - 2px)",
            sm: "calc(var(--radius) - 4px)",
         },
      },
   },
   plugins: [require("tailwindcss-animate")],
} satisfies Config;
