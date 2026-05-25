import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { StackableProjects } from "@/components/home/StackableProjects";
import { ProjectCard } from "@/components/home/ProjectCard";
import { getAllProjects } from "@/lib/mdx";
import { INFO, SKILLS, BIOGRAPHY, EXPERIENCE, EDUCATION, LIBRARY_HEADER } from "@/lib/data";

export default async function Home() {
  const allProjects = (await getAllProjects()) || [];
  const recentArticles = allProjects.slice(0, 3);

  const featuredProjects = allProjects
    .filter(p => ["Full Stack", "Systems", "AI & Tools"].includes(p.category))
    .map(p => ({
      title: p.title,
      subtitle: p.description,
      tag: p.tags?.[0] || "Miscellaneous",
      date: p.date,
      image: p.imageUrl || "/placeholder.png",
      href: p.href
    }));


  return (
    <>
      <div className="container-blog py-16 md:py-24">
        <section className="flex flex-col-reverse md:flex-row md:items-start justify-between gap-12 mb-20">
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter font-mono uppercase text-foreground leading-[0.9]">
                {INFO.name}
              </h1>
            </div>
            <div className="space-y-2 text-[11px] md:text-[12px] font-mono uppercase tracking-[0.15em] text-muted-foreground opacity-80 leading-relaxed max-w-xl">
              <p>
                <span className="text-foreground/50">Build |</span> MERN Stack • Next.js • Technical Infrastructure
              </p>
              {/* <p> */}
              {/*   <span className="text-foreground/50">Future |</span> Decentralized Data • Automated System Software */}
              {/* </p> */}
            </div>
          </div>
          <div className="w-32 h-32 md:w-44 md:h-44 flex-shrink-0 relative">
            <Image
              src={INFO.profileImage}
              alt={INFO.name}
              width={176}
              height={176}
              className="object-contain w-full h-full"
              priority
            />
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-xl mb-4 font-pixel uppercase tracking-widest text-[12px]">Focus</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>{BIOGRAPHY[0]}</p>
            <p>{BIOGRAPHY[1]}</p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-xl mb-6">Work Experience</h2>
          {EXPERIENCE.map((exp, idx) => (
            <div key={idx} className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-4">
              <div>
                <h3 className="text-base font-semibold">{exp.company}</h3>
                <p className="text-sm text-muted-foreground">{exp.role}</p>
              </div>
              <span className="text-sm text-muted-foreground">{exp.period}</span>
            </div>
          ))}
        </section>

        <section className="mb-16">
          <h2 className="text-xl mb-6">Education</h2>
          <div className="space-y-6">
            {EDUCATION.map((edu, idx) => (
              <div key={idx} className="flex flex-col md:flex-row md:items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-semibold">{edu.institution}</h3>
                  <p className="text-sm text-muted-foreground">{edu.degree}</p>
                </div>
                <span className="text-sm text-muted-foreground">{edu.period}</span>
              </div>
            ))}
          </div>
        </section>

        <Separator className="mb-16" />

        <section className="mb-16">
          <h2 className="text-xl mb-6">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-sm border border-border rounded-full text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>

      <div className="container-blog pb-16">
        <StackableProjects projects={featuredProjects} />
      </div>

      <div className="container-blog pb-32 mt-16">
        <header className="mb-12 border-t border-border pt-16">
          <h2 className="text-2xl font-bold tracking-tight text-foreground uppercase tracking-widest text-[12px] font-pixel mb-4">
            {LIBRARY_HEADER.additions.title}
          </h2>
          <p className="text-muted-foreground text-sm max-w-md opacity-70">
            {LIBRARY_HEADER.additions.description}
          </p>
        </header>

        <div className="flex flex-col">
          {recentArticles.map((item) => (
            <ProjectCard
              key={item.slug}
              {...(item as any)}
            />
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/library"
            className="text-[10px] font-pixel text-foreground uppercase tracking-widest border border-border px-6 py-3 hover:bg-white/[0.05] transition-colors"
          >
            Visit Full Library →
          </Link>
        </div>
      </div>
    </>
  );
}
