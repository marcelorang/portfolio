import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Showcase from "@/components/Showcase";
import { experience, profile, showcase } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work — Marcelo Rangel",
  description: "Client platforms and personal projects built by Marcelo Rangel, on screen.",
  openGraph: {
    title: "Work — Marcelo Rangel",
    description: "Client platforms and personal projects, on screen.",
    url: "/work",
  },
};

const client = showcase.filter((p) => p.group === "client");
const personal = showcase.filter((p) => p.group === "personal");
const shortName = (name: string) => name.replace(/ \(.*\)$/, "");

function GroupTitle({ id, kicker, title, text }: { id: string; kicker: string; title: string; text: string }) {
  return (
    <div id={id} className="scroll-mt-24 pb-8 pt-4">
      <p className="cursor font-mono text-xs uppercase tracking-[0.2em] text-accent">{kicker}</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      <p className="mt-3 max-w-3xl text-muted">{text}</p>
    </div>
  );
}

export default function Work() {
  return (
    <>
      <Reveal />
      <header className="sticky top-0 z-20 border-b border-line bg-bg/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-4 py-3 sm:px-6">
          <a href="/" className="shrink-0 font-mono text-sm font-semibold">
            marcelo<span className="text-accent">.</span>rangel
          </a>
          <nav className="hidden items-center gap-4 overflow-x-auto text-sm text-muted md:flex">
            <a href="#client-work" className="whitespace-nowrap font-medium text-text hover:text-accent">
              Client work
            </a>
            {client.map((p) => (
              <a key={p.slug} href={`#${p.slug}`} className="whitespace-nowrap hover:text-text">
                {shortName(p.name)}
              </a>
            ))}
            <span className="text-line">|</span>
            <a href="#personal" className="whitespace-nowrap font-medium text-text hover:text-accent">
              Personal
            </a>
          </nav>
          <a
            href={profile.resume}
            className="shrink-0 rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
          >
            Resume
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
        <section className="py-12 sm:py-16">
          <a href="/" className="text-sm text-muted hover:text-accent">
            ← Back to home
          </a>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">Selected work, on screen</h1>
          <p className="mt-4 max-w-3xl text-muted">
            Screens captured from local builds with demo data: {client.length} client platforms and{" "}
            {personal.length} personal projects.
          </p>
        </section>

        <GroupTitle
          id="client-work"
          kicker="Client work"
          title="Platforms built for clients"
          text={`Built at ${experience.company}, usually as the lead developer, from back end to mobile.`}
        />
        <Showcase projects={client} />

        <div className="mt-16 border-t border-line pt-12">
          <GroupTitle
            id="personal"
            kicker="Personal projects"
            title="Things I build on my own"
            text="Side projects I design and build end to end, mostly around audio, sim racing and data."
          />
          <Showcase projects={personal} />
        </div>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-xl font-semibold">Let&apos;s work together.</p>
          <div className="flex flex-wrap gap-4 text-sm font-medium">
            <a href={`mailto:${profile.email}`} className="hover:text-accent">{profile.email}</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent">LinkedIn</a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-accent">GitHub</a>
          </div>
        </div>
      </footer>
    </>
  );
}
