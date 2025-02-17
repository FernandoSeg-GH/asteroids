import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AsteroidsProvider } from "@/context/AsteroidContext";
import Navbar from "@/components/ui/navbar";
import SessionContext from "@/context/SessionContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Asteroids",
  description: "Tech Challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionContext>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <AsteroidsProvider>
            <Navbar />
            <main className="pt-20">
              {children}
            </main>
          </AsteroidsProvider>
        </body>
      </html>
    </SessionContext>
  );
}
