"use client";

import * as React from "react";
import MdxLayout from "@/components/layout/MdxLayout";

const metadata = {
  title: "Scaling Rust Microservices with gRPC",
  date: "Nov 20, 2024",
  category: "Architecture",
  readTime: "12 min",
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
          Scaling distributed systems requires more than just adding more instances. It's about how those instances communicate. In high-throughput environments, every byte across the wire counts.
        </p>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">The Protocol Shift</h2>
          
          <p>
            The choice of communication protocol can make or break your performance profile. 
            While REST/JSON is the industry standard for its simplicity and human-readability, 
            it often fails under the weight of massive inter-service chatter where serialization 
            overhead and redundant metadata add significant latency.
          </p>
          
          <p>
            This is where gRPC and Protocol Buffers enter the frame. By moving from a text-based, 
            stateless protocol to a binary-encoded, streaming-first architecture, we can achieve 
            orders of magnitude improvements in both throughput and latency.
          </p>
        </section>

        <section className="space-y-6">
          <h3 className="text-2xl font-bold tracking-tight">Why gRPC for Rust?</h3>
          
          <p>
            Rust's memory safety and zero-cost abstractions make it a perfect partner for gRPC. 
            The combination allows for predictable performance without the overhead of a garbage collector.
          </p>

          <ul className="list-disc list-inside space-y-3 pl-4">
            <li><strong>Binary Serialization</strong>: Protobuf v3 provides extremely small payloads.</li>
            <li><strong>Multiplexing</strong>: HTTP/2 allows for multiple concurrent streams on a single connection.</li>
            <li><strong>Bidirectional Streaming</strong>: Native support for real-time data flows.</li>
          </ul>
        </section>

        <div className="my-12">
          <pre className="bg-surface-low p-8 rounded-lg border border-outline/30 overflow-x-auto">
            <code className="text-on-background font-mono text-sm leading-relaxed">
{`#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let addr = "[::1]:50051".parse()?;
    let greeter = MyGreeter::default();

    Server::builder()
        .add_service(GreeterServer::new(greeter))
        .serve(addr)
        .await?;

    Ok(())
}`}
            </code>
          </pre>
          <p className="mt-4 text-center text-sm text-muted italic">A basic gRPC server implementation using Tonic.</p>
        </div>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Production Results</h2>
          
          <p>
            In our recent load tests, switching from REST+JSON to gRPC+Protobuf reduced our p99 latency 
            by over 40% and cut our network bandwidth usage by nearly 65%. 
            This is a game-changer for high-frequency trading and real-time data ingestion.
          </p>
          
          <p>
            However, the transition isn't without its challenges. Moving from human-readable JSON 
            to binary-encoded Protobuf requires better tooling for debugging and observability. 
            In the next entry, we'll explore how we solved for transparency in a gRPC world.
          </p>
        </section>
      </div>
    </MdxLayout>
  );
}
