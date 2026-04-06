import * as React from "react";
import MdxLayout from "@/components/layout/MdxLayout";

const metadata = {
  title: "Distributed Snapshots v2",
  date: "Feb 10, 2024",
  category: "Engineering",
};

export default function Page() {
  return (
    <MdxLayout 
      title={metadata.title} 
      date={metadata.date} 
      category={metadata.category}
    >
      <div className="space-y-12">
        <p className="text-2xl leading-relaxed text-on-background/90 md:text-3xl font-serif italic border-l-4 border-primary pl-6 py-2">
          A technical retrospective on implementing Chandy-Lamport algorithm for consistent distributed state recording on immutable ledger systems.
        </p>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">The Problem of Consistency</h2>
          <p>
            Recording the state of a distributed system is notoriously difficult. 
            Because there is no global clock and messages can be delayed or reordered, 
            simply asking every node to "save their state now" will result in an inconsistent snapshot.
          </p>
          <p>
            For a snapshot to be consistent, it must capture a state that *could have actually happened*. 
            This means if a message is recorded as received by one node, the sending node must also have 
            recorded its sending.
          </p>
        </section>

        <section className="space-y-6">
          <h3 className="text-2xl font-bold tracking-tight">Enter Chandy-Lamport</h3>
          <p>
            The Chandy-Lamport algorithm uses marker messages to coordinate nodes. 
            By sending markers along every communication channel, nodes can determine 
            when to record their local state and the state of their incoming channels.
          </p>
          
          <pre className="bg-surface-low p-8 rounded-lg border border-outline/30 overflow-x-auto text-sm">
            <code className="text-on-background font-mono">
{`// Implementation of a Marker Message in Rust
struct MarkerMsg {
    snapshot_id: Uuid,
    initiator_id: NodeId,
}`}
            </code>
          </pre>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Retrospective</h2>
          <p>
            Implementing this in a high-throughput environment required several optimizations. 
            We had to ensure that the marker messages didn't create head-of-line blocking 
            and that the state recording was truly non-blocking.
          </p>
          <p>
            In our final version, we achieved a snapshot mechanism that adds less than 1% 
            overhead to the system while guaranteeing strict consistency across over 50 service nodes.
          </p>
        </section>
      </div>
    </MdxLayout>
  );
}
