"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { INFO, SOCIALS } from "@/lib/data";

export function Footer() {
  return (
    <footer className="w-full">
      <Separator />
      <div className="container-blog flex flex-col md:flex-row justify-between items-start md:items-center gap-6 py-10">
        <span className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {INFO.name}
        </span>
        <div className="flex gap-6">
          {SOCIALS.map((social) => (
            <Link
              key={social.name}
              href={social.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {social.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
