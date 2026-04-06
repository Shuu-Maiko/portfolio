"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface MdxLayoutProps {
  children: React.ReactNode;
  title: string;
  date: string;
  category: string;
}

export default function MdxLayout({ children, title, date, category }: MdxLayoutProps) {
  return (
    <article className="min-h-screen bg-background pt-32 pb-48">
      <div className="container-publication">
        {/* Post Header */}
        <header className="mb-20 md:mb-32 text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-6 text-[10px] font-bold tracking-[0.2em] uppercase text-muted mb-8">
            <span className="text-primary">{category}</span>
            <span className="opacity-20">&middot;</span>
            <span className="font-normal opacity-60 tracking-widest">{date}</span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal tracking-normal text-primary leading-tight mb-12">
            {title.replace(/_/g, " ")}
          </h1>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-10 border-y border-outline/30">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-surface-highest/10 border border-outline/30 flex items-center justify-center overflow-hidden">
                 <div className="w-full h-full bg-gradient-to-br from-primary/10 to-transparent flex items-center justify-center">
                    <span className="text-[10px] font-bold text-primary opacity-40 italic">PN</span>
                 </div>
              </div>
              <div className="text-left">
                <p className="text-[12px] font-bold text-primary uppercase tracking-[0.15em]">Priyanshu Negi</p>
                <p className="text-[11px] text-muted font-medium uppercase tracking-widest">Software Developer &middot; 4 MIN READ</p>
              </div>
            </div>
            
            <Link 
              href="/writing" 
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary hover:opacity-50 transition-opacity"
            >
              Back to index
            </Link>
          </div>
        </header>

        {/* Content Section - Centered Column */}
        <div className="prose prose-publication mx-auto">
          <div className="text-lg md:text-xl text-on-background/90 leading-relaxed font-sans">
            {children}
          </div>
        </div>
      </div>
    </article>
  );
}
