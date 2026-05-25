"use client";

import * as React from "react";
import { ProjectCard } from "@/components/home/ProjectCard";
import { motion } from "framer-motion";
import { ProjectMetadata } from "@/lib/mdx";
import { LIBRARY_HEADER, CATEGORIES } from "@/lib/data";

export default function LibraryPage({ initialProjects }: { initialProjects: ProjectMetadata[] }) {
  const [activeCategory, setActiveCategory] = React.useState("All");

  const filteredProjects = activeCategory === "All" 
    ? initialProjects 
    : initialProjects.filter(p => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-background pt-32 pb-48">
      <div className="container-blog">
        {/* Editorial Header */}
        <header className="mb-16 md:mb-24 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
              {LIBRARY_HEADER.title}
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed font-medium opacity-80">
              {LIBRARY_HEADER.description}
            </p>
          </motion.div>
          
          <div className="flex flex-nowrap items-center gap-x-8 gap-y-4 pt-4 overflow-x-auto hide-scrollbar -mx-5 px-5 md:mx-0 md:px-0">
             {CATEGORIES.map(cat => (
               <button
                 key={cat}
                 onClick={() => setActiveCategory(cat)}
                 className={`text-[10px] font-mono uppercase tracking-[0.2em] transition-all hover:text-[#FF4B12] shrink-0 ${activeCategory === cat ? 'text-[#FF4B12]' : 'text-muted-foreground'}`}
               >
                 {cat}
               </button>
             ))}
          </div>
        </header>

        {/* Unified Project List */}
        <section className="flex flex-col border-t border-border">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 + 0.2, duration: 0.5 }}
            >
              <ProjectCard 
                {...project} 
              />
            </motion.div>
          ))}
        </section>
      </div>
    </main>
  );
}
