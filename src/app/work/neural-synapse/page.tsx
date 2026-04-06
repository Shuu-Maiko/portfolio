import * as React from "react";
import Image from "next/image";
import Link from "next/link";

export default function NeuralSynapsePage() {
  return (
    <article className="min-h-screen bg-background pt-32 pb-64">
      <div className="container-publication">
        <header className="mb-16 md:mb-24">
          <div className="flex items-center gap-3 text-sm font-medium text-muted mb-6">
            <span className="text-on-background font-semibold">Data Visualization</span>
            <span>&middot;</span>
            <span>Completed 2023</span>
          </div>

          <h1 className="font-serif text-4xl md:text-7xl font-bold tracking-tight text-on-background leading-tight mb-8">
            Neural Synapse
          </h1>

          <p className="text-xl md:text-2xl text-muted leading-relaxed max-w-2xl">
            Real-time data visualization platform for monitoring complex neural network training pipelines with high-fidelity telemetry.
          </p>
          
          <div className="mt-12 flex flex-wrap gap-3">
             {["TypeScript", "Wasm", "Telemetry", "WebGPU"].map(tag => (
               <span key={tag} className="px-3 py-1 bg-surface-low border border-outline/30 rounded text-xs font-semibold text-muted uppercase tracking-wider">
                 {tag}
               </span>
             ))}
          </div>
        </header>

        <section className="my-16 md:my-24">
          <div className="aspect-[16/9] bg-surface-low rounded-xl overflow-hidden border border-outline/20 relative">
             <div className="absolute inset-0 bg-gradient-to-br from-surface-high to-surface-low flex items-center justify-center">
                <span className="text-muted text-sm font-bold opacity-30 uppercase tracking-[0.2em]">Platform Interface Screenshot</span>
             </div>
          </div>
          <p className="mt-6 text-center text-sm text-muted italic">A real-time telemetry dashboard for monitoring neural activity.</p>
        </section>

        <div className="prose prose-publication mx-auto font-serif">
          <h2 className="text-3xl font-bold tracking-tight">The Vision</h2>
          <p>
            Training large-scale neural networks is often a "black box" process. 
            Neural Synapse was built to provide transparency into the internal state of 
            models as they learn, allowing researchers to intervene or adjust parameters 
            on the fly.
          </p>
          
          <p>
            The platform had to be capable of rendering high-density data streams 
            without impacting the performance of the training node itself.
          </p>

          <h3 className="text-2xl font-bold tracking-tight">The Engineering</h3>
          <p>
            We utilized WebGPU for hardware-accelerated rendering and WebAssembly 
            for the heavy-lift data processing. This combination allowed us to 
            maintain a smooth 60fps experience while processing millions of 
            telemetry markers every second.
          </p>

          <blockquote className="my-12">
            "The priority was visual fidelity. We needed to see every synapse fire, 
            providing a intuitive sense of the model's convergence."
          </blockquote>

          <h3 className="text-2xl font-bold tracking-tight">Capabilities</h3>
          <ul className="list-disc list-inside space-y-4">
             <li><strong>High-Fidelity Telemetry</strong>: Capturing every gradient change.</li>
             <li><strong>Interactive Weight Maps</strong>: Zoomable, filterable neural topologies.</li>
             <li><strong>Real-time Heatmaps</strong>: Visualizing activation patterns.</li>
          </ul>

          <h2 className="text-3xl font-bold tracking-tight">Impact</h2>
          <p>
            The researchers using Neural Synapse reported a 30% reduction in training 
            time due to the ability to identify and stop "dead" neurons early. 
            The system is now being expanded to support collaborative debugging 
            across multiple research teams.
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
