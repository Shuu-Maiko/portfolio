import { getProjectBySlug, getAllSlugs } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import Image from "next/image";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug: string) => ({
    slug,
  }));
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { metadata, content } = project as { metadata: any; content: string };

  return (
    <article className="min-h-screen bg-background pt-24 pb-64">
      <div className="container-blog">
        {/* Top Image Section */}
        <section className="mb-12 md:mb-20">
          <div className="aspect-[16/9] bg-muted/5 overflow-hidden border border-border relative">
             <Image 
               src={metadata.imageUrl || "/placeholder.png"} 
               alt={metadata.title || "Project Image"}
               fill
               className="object-cover opacity-90 transition-opacity"
               priority
             />
             <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
          </div>
          <p className="mt-4 text-[10px] font-mono text-muted-foreground/60 uppercase tracking-[0.3em]">
            Artifact System Diagram | {metadata.slug}
          </p>
        </section>

        <header className="mb-16 md:mb-24">
          <div className="flex items-center gap-3 text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-6">
            <span className="text-[#FF4B12] font-bold">{metadata.category}</span>
            <span className="w-1 h-0.5 bg-border" />
            <span>{metadata.date}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-tight mb-8">
            {metadata.title}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl font-medium opacity-80">
            {metadata.description}
          </p>
        </header>

        <div className="prose prose-invert prose-lg max-w-none 
          prose-headings:text-foreground prose-headings:font-bold prose-headings:tracking-tight
          prose-p:text-muted-foreground prose-p:leading-relaxed
          prose-strong:text-foreground prose-blockquote:border-l-2 prose-blockquote:border-[#FF4B12]
          prose-blockquote:pl-8 prose-blockquote:italic prose-blockquote:text-xl prose-blockquote:text-foreground/90 prose-blockquote:font-medium
          prose-li:text-muted-foreground space-y-8">
          <MDXRemote source={content} />
        </div>

        {metadata.githubUrl && (
          <div className="mt-24 p-8 border border-border bg-white/[0.02] flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-[#FF4B12]/30 transition-colors">
            <div className="space-y-1">
              <h4 className="text-sm font-mono uppercase tracking-widest text-foreground">Technical Source</h4>
              <p className="text-xs text-muted-foreground font-mono">Review the raw implementation on GitHub</p>
            </div>
            <Link 
              href={metadata.githubUrl}
              target="_blank"
              className="px-6 py-3 bg-foreground text-background text-[11px] font-mono uppercase tracking-widest hover:bg-[#FF4B12] hover:text-white transition-all duration-300"
            >
              View Repository
            </Link>
          </div>
        )}

        <footer className="mt-24 pt-12 border-t border-border text-center">
           <Link href="/library" className="group text-foreground font-mono text-[11px] uppercase tracking-[0.2em] hover:opacity-70 transition-opacity inline-flex items-center gap-3">
             <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> 
             <span>Back to Library</span>
             <span className="text-red-500 underline font-bold px-1">[B]</span>
           </Link>
        </footer>
      </div>
    </article>
  );
}
