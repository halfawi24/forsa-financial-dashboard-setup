import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/app/providers/theme-provider";
import { NotificationProvider } from "@/app/providers/notification-provider";

export const metadata: Metadata = {
  title: "FORSA Capital Analytics",
  description: "Enterprise-grade financial analysis platform with advanced portfolio analytics, scenario modeling, and audit-ready reasoning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NotificationProvider>
            {children}
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
