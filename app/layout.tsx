import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { PosthogProvider } from "@/components/providers/posthog-provider";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  title: "CasePiiotAI",
  description:
    "CasePiiotAI automates document chasing, status updates, and evidence validation for UK extension and ILR teams so partners focus on exceptions."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} min-h-screen bg-background font-sans text-foreground antialiased`}>
        <PosthogProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </PosthogProvider>
      </body>
    </html>
  );
}
