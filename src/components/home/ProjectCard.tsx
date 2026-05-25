"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  href: string;
  className?: string;
  date?: string;
}

export function ProjectCard({ 
  title, 
  description, 
  tags, 
  imageUrl, 
  href, 
  className,
  date 
}: ProjectCardProps) {
  return (
    <article
      className={cn(
        "group py-12 border-b border-border last:border-0 hover:bg-white/[0.01] transition-colors px-4 -mx-4",
        className
      )}
    >
      <Link href={href} className="flex flex-col md:flex-row gap-10 items-start md:items-center">
        <div className="flex-1 space-y-4">
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
             <span className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">
               Artifact
             </span>
             <span className="w-1 h-1 rounded-full bg-border" />
             <div className="flex flex-wrap gap-3">
                {tags?.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-[10px] font-pixel text-muted-foreground/60 uppercase tracking-tighter">
                    {tag}
                  </span>
                ))}
             </div>
             {date && (
               <>
                 <span className="w-1 h-0.5 bg-border" />
                 <span className="text-[9px] font-pixel text-muted-foreground/60 uppercase tracking-tighter">{date}</span>
               </>
             )}
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground transition-colors group-hover:opacity-80">
              {title}
            </h3>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl line-clamp-2 font-medium opacity-70 group-hover:opacity-100 transition-opacity">
              {description}
            </p>
          </div>
        </div>

        {imageUrl && (
          <div className="relative aspect-video w-full md:w-72 overflow-hidden border border-border bg-muted/10 shrink-0">
            <Image
              src={imageUrl || "/placeholder.png"}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
            />
          </div>
        )}
      </Link>
    </article>
  );
}
