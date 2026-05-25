"use client";

import Link from "next/link";
import { DigitalClock } from "@/components/common/DigitalClock";
import { INFO } from "@/lib/data";

export function Navbar() {
  return (
    <header className="w-full bg-background/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container-blog flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-10 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            <Link href="/" className="hover:text-foreground transition-colors duration-200">
              <span className="text-[#FF4B12] border-b border-[#FF4B12]/60">h</span>ome
            </Link>
            <Link href="/library" className="hover:text-foreground transition-colors duration-200">
              <span className="text-[#FF4B12] border-b border-[#FF4B12]/60">l</span>ibrary
            </Link>
            <button 
              onClick={() => { navigator.clipboard.writeText(INFO.email); }} 
              className="hover:text-foreground transition-colors duration-200 uppercase"
            >
              <span className="text-[#FF4B12] border-b border-[#FF4B12]/60">c</span>opy email
            </button>
            <a href={`mailto:${INFO.email}`} className="hover:text-foreground transition-colors duration-200">
              <span className="text-[#FF4B12] border-b border-[#FF4B12]/60">m</span>ail
            </a>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
              className="hover:text-foreground transition-colors duration-200 uppercase"
            >
              <span className="text-[#FF4B12] border-b border-[#FF4B12]/60">t</span>op
            </button>
          </nav>
        </div>

        <div className="pl-12 hidden md:block">
          <DigitalClock />
        </div>
        
        {/* Mobile Clock Only */}
        <div className="md:hidden block">
          <DigitalClock />
        </div>
      </div>
    </header>
  );
}
