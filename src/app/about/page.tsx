export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-48">
      <div className="container-publication">
        {/* Simple Header */}
        <div className="flex flex-col items-center text-center gap-10 mb-20 md:mb-32">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-serif font-normal tracking-normal text-primary">
              Biography
            </h1>
            <p className="text-muted text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed font-sans font-medium">
              Software Developer focused on building scalable, type-safe full-stack applications.
            </p>
          </div>
        </div>

        <div className="space-y-32">
          <section className="flex flex-col items-center gap-16 text-center">
            <div className="max-w-3xl space-y-10">
              <p className="text-xl md:text-3xl leading-relaxed text-primary/90 font-serif">
                I am a results-oriented developer specializing in the <span className="italic">MERN Stack</span>, <span className="italic">Next.js</span>, and technical infrastructure. My work bridges the gap between sophisticated backend architecture and fluid frontend experiences.
              </p>
              <p className="text-lg md:text-xl leading-relaxed text-muted font-sans font-medium opacity-80">
                Currently pursuing a B.Tech in CSE at the Indian Institute of Information Technology Pune, I am dedicated to delivering production-grade code using TypeScript, Zod, and Prisma. My passion lies in engineering robust systems that prioritize architectural depth and technical clarity.
              </p>
            </div>
            
            <div className="w-full max-w-xl flex-shrink-0">
              <div className="aspect-[16/9] bg-surface-highest/10 border border-outline/30 rounded-2xl overflow-hidden relative group shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-primary/5 to-transparent flex items-center justify-center">
                   <div className="text-center space-y-4 opacity-20 group-hover:opacity-100 transition-opacity">
                      <p className="text-[10px] font-bold uppercase tracking-[0.4em] italic text-primary">Technical Registry</p>
                      <p className="text-[11px] font-medium text-muted uppercase tracking-widest px-8">Engineering Logs &middot; Infrastructure Design &middot; Full Stack Architecture</p>
                   </div>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-16 py-24 border-y border-outline/20">
            <h2 className="text-3xl md:text-5xl font-serif font-normal text-primary text-center">Work Experience</h2>
            <div className="max-w-3xl mx-auto space-y-16">
              {[
                 { 
                   role: "System Software Development Intern", 
                   co: "XDAS Technology Private Limited", 
                   period: "JUNE 2025 – JULY 2025",
                   desc: "Contributed to core internal tools, automated client management systems, and optimized CMS structures for responsive performance."
                 }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col gap-6 border-l border-primary/20 pl-10 relative">
                   <div className="absolute top-2 left-0 w-2.5 h-2.5 rounded-full bg-primary -translate-x-1/2" />
                  <div className="space-y-2">
                    <h4 className="text-2xl font-serif font-normal text-primary">{item.role}</h4>
                    <p className="text-[13px] font-bold text-primary/60 uppercase tracking-[0.2em]">{item.co}</p>
                  </div>
                  <p className="text-lg text-muted font-sans leading-relaxed opacity-90 max-w-2xl">{item.desc}</p>
                  <span className="text-[11px] font-bold text-muted tabular-nums tracking-[0.25em] pt-2">{item.period}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-16">
            <h2 className="text-3xl md:text-5xl font-serif font-normal text-primary text-center">Education</h2>
            <div className="max-w-3xl mx-auto border-l border-primary/20 pl-10 relative">
               <div className="absolute top-2 left-0 w-2.5 h-2.5 rounded-full bg-primary -translate-x-1/2" />
               <div className="space-y-6">
                 <div>
                   <h4 className="text-2xl font-serif font-normal text-primary">B.Tech in Computer Science Engineering</h4>
                   <p className="text-[13px] font-bold text-primary/60 uppercase tracking-[0.2em]">IIIT Pune &middot; 2024 — 2028</p>
                 </div>
                 <div className="space-y-4">
                   <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/40">Core Curriculum</p>
                   <p className="text-lg text-muted font-sans font-medium italic opacity-80">
                     Data Structures & Algorithms, DBMS, Operating Systems, Object-Oriented Programming.
                   </p>
                 </div>
               </div>
            </div>
          </section>

          <section className="space-y-16 pt-12 pb-20 border-t border-outline/20">
            <h2 className="text-3xl md:text-5xl font-serif font-normal text-primary text-center">Technical Index</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-16 max-w-5xl mx-auto text-center">
              {[
                { label: "Languages", items: ["C / C++", "JavaScript", "Python", "SQL"] },
                { label: "Frontend", items: ["Next.js", "React.js", "Tailwind", "GSAP"] },
                { label: "Backend", items: ["Node.js", "Express", "Prisma", "Django"] },
                { label: "Tools & AI", items: ["LangGraph", "Discord.py", "Git / GitHub", "Zod"] }
              ].map((stack) => (
                <div key={stack.label} className="space-y-8">
                  <h5 className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary/60">{stack.label}</h5>
                  <ul className="text-lg text-primary/90 space-y-4 font-serif italic">
                    {stack.items.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
