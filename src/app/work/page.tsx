"use client";

import * as React from "react";
import { ProjectCard } from "@/components/home/ProjectCard";
import { motion } from "framer-motion";

const CATEGORIES = ["All", "Full Stack", "Systems", "AI & Tools"];

const PROJECTS = [
  {
    title: "Totia — AI Discord Assistant",
    description: "A responsive AI chatbot integrated into the Discord ecosystem using Google GenAI for complex conversational flows and state management.",
    tags: ["Python", "Discord.py", "Google GenAI"],
    imageUrl: "", 
    href: "https://github.com/priyanshunegi/totia", 
    category: "AI & Tools",
  },
  {
    title: "Automated Client Management",
    description: "Engineered a streamlined system (ACMS) for data processing and retrieval during my tenure at XDAS Technology, improving operational efficiency.",
    tags: ["Next.js", "Zod", "Prisma"],
    imageUrl: "",
    href: "/work/acms",
    category: "Full Stack",
  },
  {
    title: "Internal CMS Optimization",
    description: "Refined architectural structures for internal content management, achieving significant performance gains and responsive design parity.",
    tags: ["React", "TypeScript", "Performance"],
    imageUrl: "",
    href: "/work/cms",
    category: "Systems",
  },
  {
    title: "Technical Archive v1",
    description: "This portfolio itself—built with Next.js and Tailwind CSS—developed as a high-density clinical documentation of engineering artifacts.",
    tags: ["Next.js", "Tailwind CSS", "Design Systems"],
    imageUrl: "",
    href: "/",
    category: "Full Stack",
  },
];

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = React.useState("All");

  const filteredProjects = activeCategory === "All" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-background pt-32 pb-48">
      <div className="container-publication">
        {/* Simple Header */}
        <div className="flex flex-col items-center text-center gap-10 mb-20 md:mb-32">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-serif font-normal tracking-normal text-primary">
              Work
            </h1>
            <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-sans font-medium">
              A curated collection of full-stack applications, system software designs, and technical research artifacts.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 py-6 px-8 border-y border-outline/30">
             {CATEGORIES.map(cat => (
               <button
                 key={cat}
                 onClick={() => setActiveCategory(cat)}
                 className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:text-primary ${activeCategory === cat ? 'text-primary scale-105' : 'text-muted'}`}
               >
                 {cat}
               </button>
             ))}
          </div>
        </div>

        {/* Unified Project List */}
        <div className="flex flex-col">
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.title} 
              {...project} 
            />
          ))}
        </div>
      </div>
    </main>
  );
}
