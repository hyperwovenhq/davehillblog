"use client";

import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

export function Navigation() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Blog
        </Link>
        <ModeToggle />
      </div>
    </header>
  );
}