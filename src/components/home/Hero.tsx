"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 bg-black font-sans">
      <div className="container-profile">
        {/* Site Header Area */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold tracking-tight text-white">Portfolio</h2>
        </div>

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 space-y-8"
          >
            <div className="space-y-6">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                Hello, I'm Priyanshu Negi.
              </h1>
              <div className="space-y-4 text-lg text-slate-300 leading-relaxed max-w-xl">
                <p>
                  I'm a <b>Software Developer</b> focused on building systems that are both powerful and <b>human-centric</b>. I enjoy optimizing full-stack applications to be more organized and performant.
                </p>
                <p>
                  My work involves building practical tools from <b>AI assistants</b> to <b>management systems</b>, ensuring every line of code adds real value to the user experience.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <Link 
                href="mailto:priyanshunegi246@gmail.com" 
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-800 bg-black text-[15px] font-semibold text-white hover:bg-zinc-900 transition-all"
              >
                <span>✉</span> Contact Me
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative w-40 h-40 md:w-56 md:h-56 flex-shrink-0"
          >
            <div className="w-full h-full rounded-full border border-zinc-800 overflow-hidden relative">
              <Image
                src="/home/shuu/.gemini/antigravity/brain/63059ba0-2e4c-4971-8c2b-182953c7e704/priyanshu_profile_placeholder_1775459072097.png"
                alt="Priyanshu Negi"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
