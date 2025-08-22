import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingProvider from "@/components/LoadingProvider";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "CyberStore - Ultimate Gaming Hub",
  description: "Discover the latest games, gear, and digital experiences in our futuristic gaming store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${vazirmatn.variable} font-vazirmatn antialiased pt-16`}>
      <Navbar />
        <LoadingProvider>
          {children}
        </LoadingProvider>
      <Footer />
      </body>
    </html>
  );
}
