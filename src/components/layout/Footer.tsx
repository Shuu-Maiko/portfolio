"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-background border-t border-outline py-10">
      <div className="container-blog flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <span className="text-sm text-muted">
          &copy; {new Date().getFullYear()} Priyanshu Negi
        </span>
        <div className="flex gap-6">
          <Link
            href="https://github.com/priyanshunegi"
            className="text-sm text-muted no-underline hover:text-primary hover:no-underline transition-colors"
          >
            GitHub
          </Link>
          <Link
            href="https://linkedin.com/in/priyanshunegi"
            className="text-sm text-muted no-underline hover:text-primary hover:no-underline transition-colors"
          >
            LinkedIn
          </Link>
          <Link
            href="mailto:priyanshunegi246@gmail.com"
            className="text-sm text-muted no-underline hover:text-primary hover:no-underline transition-colors"
          >
            Email
          </Link>
        </div>
      </div>
    </footer>
  );
}
