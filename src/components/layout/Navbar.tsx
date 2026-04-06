"use client";

import Link from "next/link";

export function Navbar() {
  return (
    <header className="w-full bg-background">
      <div className="container-blog flex h-14 items-center justify-between">
        <Link
          href="/"
          className="text-base font-semibold text-primary no-underline hover:no-underline"
        >
          Priyanshu Negi
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/work"
            className="text-sm text-muted no-underline hover:text-primary hover:no-underline transition-colors"
          >
            Work
          </Link>
          <Link
            href="mailto:priyanshunegi246@gmail.com"
            className="text-sm text-muted no-underline hover:text-primary hover:no-underline transition-colors"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
