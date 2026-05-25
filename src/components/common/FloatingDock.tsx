"use client";

import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { 
  LayoutGrid, 
  Library, 
  Plus 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { INFO } from "@/lib/data";

const DOCK_ITEMS = [
  {
    title: "Home [h]",
    icon: <LayoutGrid className="h-full w-full text-foreground/80 group-hover:text-foreground" />,
    href: "/",
  },
  {
    title: "Library [l]",
    icon: <Library className="h-full w-full text-foreground/80 group-hover:text-foreground" />,
    href: "/library",
  },
  {
    title: "Mail [m]",
    icon: <Plus className="h-full w-full text-foreground/80 group-hover:text-foreground" />,
    href: `mailto:${INFO.email}`,
  },
];

export function FloatingDock() {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex h-16 items-end gap-3 rounded-2xl bg-black/50 px-4 pb-3 backdrop-blur-md border border-white/10 shadow-2xl"
    >
      {DOCK_ITEMS.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
}

function IconContainer({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: any;
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 60, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 60, 40]);

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        className="group relative flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
      >
        <div className="h-5 w-5">{icon}</div>
        
        {/* Tooltip */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-[var(--accent-orange)] text-white text-[9px] font-pixel uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          {title}
        </div>
      </motion.div>
    </Link>
  );
}
