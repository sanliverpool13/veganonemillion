import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import PageLayout from "@/components/pagelayout";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Vegan One Million",
  description:
    "A board of one million pixels for vegan and or non-alcoholic food and beverage brands, restaurants and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script async src="https://tally.so/widgets/embed.js"></script>
      </head>
      <body className="flex flex-col min-h-screen gap-4">
        <Navbar />
        <PageLayout>{children}</PageLayout>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
