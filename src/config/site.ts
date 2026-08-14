/**
 * Site-wide configuration
 * Centralized place for app constants and settings
 */
export const siteConfig = {
  name: "Web App",
  description: "AI-friendly Next.js boilerplate for building web applications",
  url: process.env.NEXT_PUBLIC_APP_URL || (
    process.env.NODE_ENV === "production"
      ? "https://example.com"
      : "http://localhost:3000"
  ),
  links: {
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
  creator: "Your Name",
};

export type SiteConfig = typeof siteConfig;
