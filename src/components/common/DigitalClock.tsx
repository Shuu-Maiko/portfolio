"use client";

import React, { useEffect, useState } from "react";

export function DigitalClock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    
    setTime(new Date());

    
    const interval = setInterval(() => {
      setTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (!time) return <div className="h-4 w-32" />; 

  const formatOptions: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const formatted = time.toLocaleString("en-US", formatOptions).toUpperCase();
  
  
  
  const [datePart, timePart] = formatted.split(",");

  return (
    <div className="text-[10px] font-pixel text-muted-foreground uppercase flex items-center gap-4 tracking-tighter">
      <span className="hidden sm:inline">{datePart}</span>
      <span className="hidden sm:inline w-1 h-0.5 bg-border" />
      <span>{timePart?.trim()}</span>
    </div>
  );
}
