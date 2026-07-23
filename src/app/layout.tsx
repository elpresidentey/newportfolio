import React from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import "../styles/globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata = {
  title: "IEL | Frontend Engineer, Product Thinker & User Experience Designer",
  description: "Frontend Engineer, Product Thinker and User Experience Designer specializing in Next.js, React, TypeScript, UI Design, and high-performance digital experiences.",
  keywords: "Frontend Engineer Nigeria, React Developer, Next.js Developer, Product Thinker, UX Designer, TypeScript Developer, Portfolio, Lagos Frontend Engineer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`} suppressHydrationWarning>
      <body className="min-h-full bg-background text-foreground antialiased" suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}