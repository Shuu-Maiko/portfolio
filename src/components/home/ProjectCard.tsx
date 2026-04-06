"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  href: string;
  className?: string;
}

export function ProjectCard({ title, description, tags, imageUrl, href, className }: ProjectCardProps) {
  return (
    <article
      className={cn(
        "group py-12 md:py-20 border-b border-outline/30 last:border-0",
        className
      )}
    >
      <div className="flex flex-col md:flex-row gap-12 md:items-center">
        <div className="flex-1 space-y-8 text-left md:text-left">
          <div className="flex flex-wrap gap-4">
             {tags.map((tag) => (
               <span key={tag} className="px-3 py-1 bg-surface-highest/10 border border-outline/30 rounded-lg text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
                 {tag}
               </span>
             ))}
          </div>

          <div className="space-y-6">
            <Link href={href} className="block">
              <h3 className="font-serif text-3xl md:text-5xl font-normal tracking-normal text-primary leading-tight group-hover:text-primary/70 transition-colors">
                {title.replace(/_/g, " ")}
              </h3>
            </Link>

            <p className="text-muted text-lg md:text-xl leading-relaxed line-clamp-3 max-w-2xl font-sans font-medium opacity-80">
              {description}
            </p>
          </div>

          <div className="pt-4">
            <Link 
              href={href}
              className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] flex items-center gap-2 group/link"
            >
              View Case Study
              <span className="group-hover/link:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </div>
        </div>
        
        <div className="relative aspect-[4/3] w-full md:w-96 group-hover:opacity-100 transition-all rounded-2xl overflow-hidden border border-outline/30 bg-surface-low order-first md:order-last shadow-2xl">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60 group-hover:opacity-100"
            />
          )}
          {!imageUrl && (
             <div className="w-full h-full bg-gradient-to-br from-surface-high/50 to-surface-low flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] uppercase font-bold tracking-[0.4em] opacity-10 group-hover:opacity-40 italic">Engineering Artifact</span>
             </div>
          )}
        </div>
      </div>
    </article>
  );
}
