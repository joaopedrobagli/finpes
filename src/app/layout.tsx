import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: 'FinPes',
  description: 'Controle financeiro pessoal',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geist.variable} h-full antialiased`}>
      <body className={`min-h-full flex flex-col ${geist.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}