import type { CSSProperties } from "react";
import Reveal from "@/components/Reveal";
import {
  about,
  aiEngineering,
  brainGraph,
  education,
  experience,
  profile,
  showcase,
  sideProjects,
  skills,
  stats,
  type Project,
} from "@/lib/content";

const nav = [
  { href: "#ai", label: "How I work" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "/work", label: "Work" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
];

// Staggered delay for entrance and reveal animations.
const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

function SectionTitle({ id, kicker, title }: { id: string; kicker: string; title: string }) {
  return (
    <div id={id} data-reveal className="scroll-mt-24 mb-8">
      <p className="cursor font-mono text-xs uppercase tracking-[0.2em] text-accent">{kicker}</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
    </div>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li key={item} className="rounded-md bg-chip px-2 py-0.5 font-mono text-xs text-muted">
          {item}
        </li>
      ))}
    </ul>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article
      data-reveal
      style={delay((index % 2) * 120)}
      className="lift flex flex-col rounded-xl border border-line bg-surface p-5 hover:border-accent/60"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-lg font-semibold">{project.name}</h3>
        <span className="shrink-0 font-mono text-xs text-muted">{project.period}</span>
      </div>
      <p className="mt-0.5 text-sm text-accent">{project.kind}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted">{project.text}</p>
      {project.link && (
        <a
          href={project.link.url}
          target="_blank"
          rel="noreferrer"
          className="mt-3 text-sm font-medium text-text underline decoration-accent underline-offset-4 hover:text-accent"
        >
          {project.link.label} ↗
        </a>
      )}
      <div className="mt-auto">
        <Chips items={project.stack} />
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <>
      <Reveal />
      <header className="sticky top-0 z-20 border-b border-line bg-bg/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#top" className="font-mono text-sm font-semibold">
            marcelo<span className="text-accent">.</span>rangel
          </a>
          <nav className="hidden gap-6 text-sm text-muted sm:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative hover:text-text after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href={profile.resume}
            className="rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
          >
            Resume
          </a>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Hero */}
        <section className="relative grid items-center gap-10 py-16 sm:py-24 md:grid-cols-[1fr_280px]">
          <div className="hero-bg" aria-hidden />
          <div className="order-2 md:order-1">
            <p className="enter font-mono text-sm text-muted" style={delay(0)}>
              {profile.location} · <span className="text-accent">{profile.availability}</span>
            </p>
            <h1 className="enter mt-4 text-4xl font-bold tracking-tight sm:text-6xl" style={delay(100)}>
              {profile.name}
            </h1>
            <p className="enter mt-3 text-xl text-muted sm:text-2xl" style={delay(200)}>
              {profile.role}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {profile.focus.map((f, i) => (
                <li
                  key={f}
                  className="enter rounded-full border border-accent/40 bg-accent-soft px-3 py-1 text-sm text-accent"
                  style={delay(300 + i * 80)}
                >
                  {f}
                </li>
              ))}
            </ul>
            <p className="enter mt-6 max-w-2xl text-lg leading-relaxed" style={delay(650)}>
              {profile.summary}
            </p>
            <div className="enter mt-8 flex flex-wrap gap-3 text-sm font-medium" style={delay(750)}>
              <a
                href={`mailto:${profile.email}`}
                className="rounded-md bg-text px-4 py-2 text-bg transition-transform hover:-translate-y-0.5"
              >
                Email me
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="rounded-md border border-line px-4 py-2 transition-colors hover:border-accent hover:text-accent">
                LinkedIn
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="rounded-md border border-line px-4 py-2 transition-colors hover:border-accent hover:text-accent">
                GitHub
              </a>
              <a href={profile.resume} className="rounded-md border border-line px-4 py-2 transition-colors hover:border-accent hover:text-accent">
                Download resume (PDF)
              </a>
            </div>
            <dl className="mt-12 grid max-w-2xl grid-cols-3 gap-4 border-t border-line pt-6">
              {stats.map((s, i) => (
                <div key={s.label} className="enter" style={delay(850 + i * 100)}>
                  <dt className="text-2xl font-semibold sm:text-3xl">{s.value}</dt>
                  <dd className="mt-1 text-xs text-muted sm:text-sm">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="enter order-1 md:order-2" style={delay(250)}>
            <div className="photo-glow mx-auto w-40 sm:w-52 md:w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.photo}
                alt={`Portrait of ${profile.name}`}
                width={720}
                height={900}
                className="w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* AI-native engineering */}
        <section className="border-t border-line py-16">
          <SectionTitle id="ai" kicker="How I work" title={aiEngineering.title} />
          <p data-reveal className="max-w-3xl leading-relaxed text-muted">
            {aiEngineering.intro}
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {aiEngineering.pillars.map((p, i) => (
              <div
                key={p.name}
                data-reveal
                style={delay(i * 120)}
                className="lift rounded-xl border border-line bg-surface p-5 hover:border-accent/60"
              >
                <h3 className="font-semibold">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
              </div>
            ))}
          </div>
          <figure data-reveal className="mt-4 overflow-hidden rounded-xl border border-line bg-[#1b1b1b]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={brainGraph.src}
              alt="Graph of a project knowledge vault with hundreds of linked notes"
              loading="lazy"
              width={1060}
              height={950}
              className="mx-auto max-h-[560px] w-auto"
            />
            <figcaption className="border-t border-line bg-surface px-5 py-3 text-sm text-muted">
              {brainGraph.caption}
            </figcaption>
          </figure>
          <a
            href={aiEngineering.repo.url}
            target="_blank"
            rel="noreferrer"
            data-reveal
            className="lift group mt-4 flex flex-col gap-1 rounded-xl border border-accent/40 bg-accent-soft p-5 hover:border-accent sm:flex-row sm:items-center sm:justify-between sm:gap-6"
          >
            <div>
              <p className="font-mono text-sm font-semibold">
                github.com/marcelorang/<span className="text-accent">{aiEngineering.repo.name}</span>
              </p>
              <p className="mt-1 text-sm text-muted">{aiEngineering.repo.text}</p>
            </div>
            <span className="shrink-0 text-sm font-medium text-accent transition-transform group-hover:translate-x-1">
              Open repository ↗
            </span>
          </a>
        </section>

        {/* About */}
        <section className="border-t border-line py-16">
          <SectionTitle id="about" kicker="About" title="Engineer, formerly a professional musician" />
          <div className="max-w-3xl space-y-4 leading-relaxed text-muted">
            {about.map((p, i) => (
              <p key={p.slice(0, 24)} data-reveal style={delay(i * 120)}>
                {p}
              </p>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="border-t border-line py-16">
          <SectionTitle id="experience" kicker="Experience" title={experience.role} />
          <div data-reveal>
            <p className="font-mono text-sm text-muted">
              <span className="font-semibold text-text">{experience.company}</span> · {experience.period} · {experience.place}
            </p>
            <p className="mt-3 max-w-3xl text-muted">{experience.intro}</p>
          </div>
          <ol className="mt-8 space-y-8 border-l border-line pl-6">
            {experience.projects.map((p) => (
              <li key={p.name} data-reveal className="group relative">
                <span
                  className="absolute -left-[29px] top-2 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-bg transition-transform duration-300 group-hover:scale-150"
                  aria-hidden
                />
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-lg font-semibold">
                    {p.name} <span className="text-sm font-normal text-accent">— {p.kind}</span>
                  </h3>
                  <span className="font-mono text-xs text-muted">{p.period}</span>
                </div>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">{p.text}</p>
                <Chips items={p.stack} />
              </li>
            ))}
          </ol>
        </section>

        {/* Showcase */}
        {showcase.length > 0 && (
          <section className="border-t border-line py-16">
            <SectionTitle id="showcase" kicker="Work" title="Selected work, on screen" />
            <p data-reveal className="mb-8 max-w-3xl text-sm text-muted">
              {showcase.length} products, {showcase.reduce((n, p) => n + p.shots.length, 0)} screens from client
              platforms and personal projects, captured from local builds with demo data.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
              {showcase.slice(0, 4).map((p, i) => {
                const s = p.shots.find((x) => !x.mobile) ?? p.shots[0];
                return (
                  <a
                    key={p.slug}
                    href={`/work#${p.slug}`}
                    data-reveal
                    style={delay(i * 100)}
                    className="lift group overflow-hidden rounded-xl border border-line bg-surface hover:border-accent/60"
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-chip">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={s.src}
                        alt={s.caption}
                        loading="lazy"
                        className={`h-full w-full transition-transform duration-500 group-hover:scale-105 ${
                          s.mobile ? "object-contain" : "object-cover object-top"
                        }`}
                      />
                    </div>
                    <p className="px-3 py-2 text-sm font-medium">
                      {p.name} <span className="block text-xs font-normal text-muted">{p.kind}</span>
                    </p>
                  </a>
                );
              })}
            </div>
            <a
              href="/work"
              data-reveal
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-text px-4 py-2 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
            >
              See all projects on screen →
            </a>
          </section>
        )}

        {/* Side projects */}
        <section className="border-t border-line py-16">
          <SectionTitle id="projects" kicker="Side projects" title="Things I build on my own" />
          <div className="grid gap-4 md:grid-cols-2">
            {sideProjects.map((p, i) => (
              <ProjectCard key={p.name} project={p} index={i} />
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="border-t border-line py-16">
          <SectionTitle id="skills" kicker="Skills" title="Stack" />
          <div className="grid gap-6 sm:grid-cols-2">
            {skills.map((s, i) => (
              <div key={s.group} data-reveal style={delay((i % 2) * 100)}>
                <h3 className="text-sm font-semibold">{s.group}</h3>
                <Chips items={s.items} />
              </div>
            ))}
          </div>
        </section>

        {/* Education & languages */}
        <section className="border-t border-line py-16">
          <SectionTitle id="education" kicker="Education" title="Education & languages" />
          <div data-reveal className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="font-semibold">{education.degree}</h3>
              <p className="text-sm text-muted">
                {education.school} · {education.year}
              </p>
            </div>
            <ul className="space-y-1 text-sm text-muted">
              {education.languages.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div data-reveal className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-xl font-semibold">Let&apos;s work together.</p>
            <p className="mt-1 text-sm text-muted">{profile.availability}</p>
          </div>
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
