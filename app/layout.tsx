import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Kemtech.be',
  appleMobileWebAppTitle: 'Kemtech.be',
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="Kemtech.be" />
        {/* Add favicon <link> tags here if needed */}
      </head>
      <body>{children}</body>
    </html>
  );
}
