import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const hostGrotesk = localFont({
  src: [
    {
      path: "../public/fonts/Host_Grotesk/HostGrotesk-VariableFont_wght.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../public/fonts/Host_Grotesk/HostGrotesk-Italic-VariableFont_wght.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-body",
  display: "swap",
});

const calSans = localFont({
  src: [
    {
      path: "../public/fonts/Cal_Sans/CalSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-heading",
  display: "swap",
});

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
      <body className={`${hostGrotesk.variable} ${calSans.variable} antialiased bg-[#050505] text-white`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
