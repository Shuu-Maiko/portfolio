"use client";

import * as React from "react";
import { PostCard } from "@/components/home/PostCard";
import { motion } from "framer-motion";

const POSTS = [
  {
    title: "Building State-Aware Discord Bots with Python",
    excerpt: "Exploring the integration of Google GenAI with Discord.py to create contextual, state-persistent conversational agents.",
    date: "Mar 24, 2024",
    readTime: "8 min",
    category: "AI & Tools",
    slug: "state-aware-discord-bots",
  },
  {
    title: "Optimizing Next.js for Production Latency",
    excerpt: "A deep dive into system software techniques for reducing TTFB and improving component hydration in modern web applications.",
    date: "Mar 15, 2024",
    readTime: "6 min",
    category: "Full Stack",
    slug: "nextjs-production-latency",
  },
  {
    title: "Full Stack Type Safety with Prisma & Zod",
    excerpt: "Implementing robust schema validation and type-safe database interactions in distributed MERN systems.",
    date: "Feb 10, 2024",
    readTime: "10 min",
    category: "Engineering",
    slug: "prisma-zod-type-safety",
  },
];

export default function WritingPage() {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredPosts = POSTS.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-background pt-32 pb-48">
      <div className="container-publication">
        {/* Simple Header */}
        <div className="flex flex-col items-center text-center gap-10 mb-20 md:mb-32">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-serif font-normal tracking-normal text-primary">
              Writing
            </h1>
            <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-sans font-medium">
              Technical retrospectives, development logs, and architectural research from the engineering field.
            </p>
          </div>
          
          <div className="w-full max-w-xl relative group">
             <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none opacity-40 group-focus-within:opacity-100 transition-opacity">
                <span className="text-[11px] font-bold text-primary uppercase tracking-[0.2em]">Search</span>
             </div>
             <input
               type="text"
               placeholder="Stories & Artifacts..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full bg-surface-highest/10 border border-outline/30 rounded-2xl py-5 pl-24 pr-8 text-[14px] font-sans font-medium focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary transition-all text-primary placeholder:text-muted/40"
             />
             <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none text-[10px] font-bold text-muted uppercase tracking-[0.2em]">
                {filteredPosts.length} Artifacts Found
             </div>
          </div>
        </div>

        {/* Post List */}
        <div className="flex flex-col">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCard key={post.slug} {...post} />
            ))
          ) : (
             <div className="py-32 text-center text-muted uppercase text-[11px] font-bold tracking-[0.3em] font-sans opacity-40">
                No artifacts found for "{searchQuery}"
             </div>
          )}
        </div>
      </div>
    </main>
  );
}
