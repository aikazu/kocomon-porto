import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Iqbal Attila | Cybersecurity Solution Architect",
  description: "Experienced IT Solution Architect and Cybersecurity Professional with over 10 years of expertise in designing, implementing, and securing enterprise technology solutions. CompTIA Security+ Certified.",
  keywords: ["Cybersecurity", "Solution Architect", "Penetration Testing", "VAPT", "CompTIA Security+", "Linux Administration", "Infrastructure Security"],
  authors: [{ name: "Iqbal Attila" }],
  openGraph: {
    title: "Iqbal Attila | Cybersecurity Solution Architect",
    description: "10+ years experience in enterprise security solutions, VAPT, and infrastructure hardening.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
