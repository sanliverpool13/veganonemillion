"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const path = usePathname();
  const isHome = path === "/";
  return (
    <nav className="w-full h-auto py-5 px-4">
      <div className="container mx-auto max-w-[1000px] flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">Vegan One Million</h1>
        <p className="font-bold">2499 Slots Left</p>
      </div>
      <div className="container mx-auto max-w-[1000px] flex items-center justify-center mb-4">
        <ul className="container flex gap-4 w-full items-center justify-center h-full px-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/submit-image">Submit Image</Link>
          </li>
          <li>
            <Link href="/how-it-works">How It Works</Link>
          </li>
          <li>
            <Link href="/terms">Terms</Link>
          </li>
        </ul>
      </div>
      {isHome && (
        <div className="container mx-auto max-w-[1000px] flex flex-col items-center justify-center ">
          <p className="text-sm">
            A board of one million pixels for <b>vegan</b> and or{" "}
            <b>non-alcoholic</b> food and beverage brands, restaurants and more.
          </p>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
