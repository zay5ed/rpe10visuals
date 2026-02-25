import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400","500","600","700"]
})

export const metadata: Metadata = {
  title: "RPE 10 Visuals",
  description: "Powerlifting media",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${oswald.variable} antialiased bg-[#050505] text-white`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
