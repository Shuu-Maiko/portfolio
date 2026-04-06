"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PostCardProps {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
  className?: string;
}

export function PostCard({ title, excerpt, date, readTime, category, slug, className }: PostCardProps) {
  return (
    <article
      className={cn(
        "group py-12 md:py-20 border-b border-outline/30 last:border-0",
        className
      )}
    >
      <div className="flex flex-col md:flex-row gap-12 md:items-center">
        <div className="flex-1 space-y-8 text-left md:text-left">
          <div className="flex items-center gap-6 text-[10px] font-bold tracking-[0.2em] uppercase text-muted">
            <span className="text-primary">{category}</span>
            <span className="opacity-20">&middot;</span>
            <span className="font-normal opacity-60 tracking-widest">{date}</span>
          </div>

          <div className="space-y-6">
            <Link href={`/writing/${slug}`} className="block">
              <h3 className="font-serif text-3xl md:text-5xl font-normal tracking-normal text-primary leading-tight group-hover:text-primary/70 transition-colors">
                {title.replace(/_/g, " ")}
              </h3>
            </Link>

            <p className="text-muted text-lg md:text-xl leading-relaxed line-clamp-3 max-w-2xl font-sans font-medium opacity-80">
              {excerpt}
            </p>
          </div>

          <div className="flex items-center gap-8 pt-4">
            <span className="text-[10px] font-bold text-muted uppercase tracking-[0.15em]">{readTime} read</span>
            <Link 
              href={`/writing/${slug}`}
              className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] flex items-center gap-2 group/link"
            >
              Read full story 
              <span className="group-hover/link:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </div>
        </div>
        
        <div className="hidden lg:block w-48 h-48 bg-surface-low rounded-2xl overflow-hidden flex-shrink-0 border border-outline/30 group-hover:border-primary/20 transition-all">
          <div className="w-full h-full bg-gradient-to-br from-surface-high/50 to-surface-low flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity">
             <span className="text-[10px] uppercase font-bold tracking-[0.4em] opacity-10 group-hover:opacity-40 italic">Technical Log</span>
          </div>
        </div>
      </div>
    </article>
  );
}
