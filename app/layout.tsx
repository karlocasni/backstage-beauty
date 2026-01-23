import type { Metadata } from "next";
import { Dancing_Script, Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Backstage Beauty",
  description: "A beauty podcast for the modern enthusiast.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dancingScript.variable} ${playfairDisplay.variable} ${montserrat.variable}`}>
      <body className="font-sans antialiased text-dark-500 bg-white selection:bg-accent-100 selection:text-dark-500">
        {children}
      </body>
    </html>
  );
}
