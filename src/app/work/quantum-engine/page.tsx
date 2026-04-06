import * as React from "react";
import Image from "next/image";
import Link from "next/link";

export default function QuantumEnginePage() {
  return (
    <article className="min-h-screen bg-background pt-32 pb-64">
      <div className="container-publication">
        <header className="mb-16 md:mb-24">
          <div className="flex items-center gap-3 text-sm font-medium text-muted mb-6">
            <span className="text-on-background font-semibold">Systems Design</span>
            <span>&middot;</span>
            <span>Completed 2024</span>
          </div>

          <h1 className="font-serif text-4xl md:text-7xl font-bold tracking-tight text-on-background leading-tight mb-8">
            Quantum Engine v4
          </h1>

          <p className="text-xl md:text-2xl text-muted leading-relaxed max-w-2xl">
            A distributed system architecture designed for high-throughput financial transactions, utilizing Rust and gRPC for sub-millisecond latency.
          </p>
          
          <div className="mt-12 flex flex-wrap gap-3">
             {["Rust", "gRPC", "Distributed Systems", "PostgreSQL"].map(tag => (
               <span key={tag} className="px-3 py-1 bg-surface-low border border-outline/30 rounded text-xs font-semibold text-muted uppercase tracking-wider">
                 {tag}
               </span>
             ))}
          </div>
        </header>

        <section className="my-16 md:my-24">
          <div className="aspect-[16/9] bg-surface-low rounded-xl overflow-hidden border border-outline/20 relative">
             <div className="absolute inset-0 bg-gradient-to-br from-surface-high to-surface-low flex items-center justify-center">
                <span className="text-muted text-sm font-bold opacity-30 uppercase tracking-[0.2em]">Project Artifact</span>
             </div>
          </div>
          <p className="mt-6 text-center text-sm text-muted italic">Architectural overview of the distributed node topology.</p>
        </section>

        <div className="prose prose-publication mx-auto font-serif">
          <h2 className="text-3xl font-bold tracking-tight">The Challenge</h2>
          <p>
            In the world of high-frequency trading, every microsecond is a missed opportunity. 
            The existing infrastructure was struggling with serializing massive JSON payloads 
            and managing state across a fleet of stateless services.
          </p>
          
          <p>
            The requirement was clear: build a system that could handle over 10 million 
            requests per second with p99 latency staying under 5ms.
          </p>

          <h3 className="text-2xl font-bold tracking-tight">The Solution</h3>
          <p>
            We rebuilt the entire engine from the ground up using Rust. By leveraging 
            system-level memory management and the zero-cost abstractions provided by 
            gRPC, we were able to drastically reduce our memory footprint while 
            increasing our network throughput.
          </p>

          <blockquote className="my-12">
            "By switching to a binary-encoded protocol, we avoided the high cost of 
            serialization that was previously our primary bottleneck."
          </blockquote>

          <h3 className="text-2xl font-bold tracking-tight">Technical Highlights</h3>
          <ul className="list-disc list-inside space-y-4">
             <li><strong>Dynamic Load Balancing</strong>: Custom interceptors for gRPC.</li>
             <li><strong>Immutability</strong>: Zero-copy deserialization for shared state.</li>
             <li><strong>Vertical Scaling</strong>: Optimized for multi-core architectures using Tokio.</li>
          </ul>

          <h2 className="text-3xl font-bold tracking-tight">Outcome</h2>
          <p>
            The project was a resounding success, leading to a 60% reduction in server costs 
            and a 4x improvement in overall system throughput. The architecture is now 
            used as the primary template for all new financial products within the organization.
          </p>
        </div>

        <footer className="mt-24 pt-12 border-t border-outline/30 text-center">
           <Link href="/work" className="text-primary font-bold hover:underline underline-offset-8">
             Back to all cases &rarr;
           </Link>
        </footer>
      </div>
    </article>
  );
}
