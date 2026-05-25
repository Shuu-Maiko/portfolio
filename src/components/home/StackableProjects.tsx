"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface Project {
  title: string;
  subtitle: string;
  tag: string;
  date: string;
  image: string;
  href: string;
}

interface StackableProjectsProps {
  projects: Project[];
}

export function StackableProjects({ projects }: StackableProjectsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section className="stacked-section relative w-full" ref={containerRef}>
      {/* 
        This absolute wrapper restricts the sticky heading's track. 
        It ends right before the last card finishes, so the heading 
        moves up in sync with the last card leaving the screen.
      */}
      <div
        className="absolute top-0 left-0 w-full pointer-events-none z-20"
        style={{ height: 'calc(100% - 100vh + 124px)' }}
      >
        <h2 className="stacked-heading pointer-events-auto">Projects</h2>
      </div>

      {/* Spacer to maintain the document flow previously taken by the heading */}
      <div className="h-[40px] md:h-[60px]" aria-hidden="true" />

      <div className="stacked-container">
        {projects.map((project, i) => {
          
          const targetScale = 1 - (projects.length - i) * 0.04;
          
          const range = [i * (1 / projects.length), 1];
          const scale = useTransform(scrollYProgress, range, [1, targetScale]);

          
          
          

          return (
            <div
              key={project.title}
              className="stacked-card-wrapper h-[100vh] sticky top-0 pt-24 md:pt-[180px]"
              style={{ zIndex: i + 1 }}
            >
              <motion.div
                style={{
                  scale,
                  top: `calc(${i * 8}px + (min(4vw, 12px) * ${i}))` 
                }}
                className="w-full relative transform origin-top"
              >
                <Link href={project.href} className="stacked-card">
                  <div className="stacked-card-inner">
                    {/* image — padded inside card */}
                    <div className="stacked-card-image-wrap">
                      <div className="stacked-card-image">
                        <Image
                          src={project.image || "/placeholder.png"}
                          alt={project.title}
                          fill
                          className="stacked-card-img"
                        />
                      </div>
                    </div>

                    {/* title bar — distinct dark footer */}
                    <div className="stacked-card-footer">
                      <div className="stacked-card-footer-left">
                        <span className="stacked-card-number">
                          ({String(i + 1).padStart(2, "0")})
                        </span>
                        <h3 className="stacked-card-title">{project.title}</h3>
                        <p className="stacked-card-subtitle">
                          {project.tag} — {project.subtitle}
                        </p>
                      </div>
                      <span className="stacked-card-date">{project.date}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
