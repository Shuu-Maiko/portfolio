import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container-blog py-16 md:py-24">

      {/* Hero — just a name, a subtitle, and a photo */}
      <section className="flex flex-col-reverse md:flex-row md:items-start justify-between gap-8 mb-16">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl">Hi, I'm Priyanshu Negi</h1>
          <p className="text-lg text-muted max-w-lg">
            CS Undergrad turned Developer. Passionate about Web Development and
            System Software. I like building cool stuff and learning by working
            on real projects every day.
          </p>
        </div>
        <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden flex-shrink-0 border border-outline">
          <Image
            src="/profile.jpg"
            alt="Priyanshu Negi"
            width={144}
            height={144}
            className="object-cover w-full h-full"
            priority
          />
        </div>
      </section>

      {/* About */}
      <section className="mb-16">
        <h2 className="text-xl mb-4">About</h2>
        <p className="text-on-background/80 leading-relaxed">
          As a Computer Science undergraduate, I enjoy building practical
          applications that solve real problems and are simple for users to
          interact with. I focus on writing clean, efficient code and
          continuously improving my problem-solving skills through consistent
          practice. My interest lies in developing reliable web applications and
          learning by working on real projects. I've solved hundreds of DSA
          problems on{" "}
          <Link href="https://leetcode.com" className="text-primary">
            LeetCode
          </Link>
          .
        </p>
      </section>

      {/* Work Experience */}
      <section className="mb-16">
        <h2 className="text-xl mb-6">Work Experience</h2>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
          <div>
            <h3 className="text-base font-semibold">XDAS Technology Private Limited</h3>
            <p className="text-sm text-muted">System Software Development Intern</p>
          </div>
          <span className="text-sm text-muted">June 2025 — July 2025</span>
        </div>
      </section>

      {/* Education */}
      <section className="mb-16">
        <h2 className="text-xl mb-6">Education</h2>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
            <div>
              <h3 className="text-base font-semibold">
                Indian Institute of Information Technology (IIIT), Pune
              </h3>
              <p className="text-sm text-muted">
                B.Tech in Computer Science and Engineering
              </p>
            </div>
            <span className="text-sm text-muted">2024 — 2028</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
            <div>
              <h3 className="text-base font-semibold">Udai Pratap Public School</h3>
              <p className="text-sm text-muted">Senior Secondary (Class 11–12)</p>
            </div>
            <span className="text-sm text-muted">2022 — 2024</span>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="mb-16">
        <h2 className="text-xl mb-6">Projects</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-semibold">
              <Link href="https://github.com/priyanshunegi/totia">
                Totia — AI Discord Assistant
              </Link>
            </h3>
            <p className="text-sm text-muted mt-1">
              Responsive AI chatbot using Google GenAI and Discord.py for
              complex conversational flows with context retention.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold">
              <Link href="/work/acms">
                Automated Client Management System
              </Link>
            </h3>
            <p className="text-sm text-muted mt-1">
              End-to-end system for data processing and retrieval built with
              Next.js, Zod, and Prisma during XDAS internship.
            </p>
          </div>
        </div>
      </section>

      {/* Skills — simple pills */}
      <section className="mb-16">
        <h2 className="text-xl mb-6">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {[
            "C", "C++", "JavaScript", "Python", "SQL",
            "Next.js", "React.js", "Node.js", "Express.js",
            "Prisma", "PostgreSQL", "MongoDB", "Tailwind CSS",
            "GSAP", "Git", "GitHub", "Zod", "Vercel",
          ].map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 text-sm border border-outline rounded-full text-muted"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

    </div>
  );
}
