"use client";

import { useCallback, useEffect, useState } from "react";
import type { ShowcaseProject } from "@/lib/content";

// Screenshot gallery: one card per project (main shot + thumbnails) and a full-screen viewer.
export default function Showcase({ projects }: { projects: ShowcaseProject[] }) {
  const [open, setOpen] = useState<{ p: number; i: number } | null>(null);
  const [active, setActive] = useState<number[]>(() => projects.map(() => 0));

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: number) =>
      setOpen((o) => {
        if (!o) return o;
        const n = projects[o.p].shots.length;
        return { p: o.p, i: (o.i + dir + n) % n };
      }),
    [projects],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  return (
    <>
      <div className="space-y-10">
        {projects.map((proj, p) => {
          const cur = proj.shots[active[p]] ?? proj.shots[0];
          const mobile = !!cur.mobile;
          return (
            <article
              key={proj.slug}
              id={proj.slug}
              data-reveal
              className="scroll-mt-24 rounded-xl border border-line bg-surface p-4 sm:p-5"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-lg font-semibold">
                  {proj.name} <span className="text-sm font-normal text-accent">— {proj.kind}</span>
                  {proj.group === "personal" && (
                    <span className="ml-2 inline-block rounded-full border border-accent/40 bg-accent-soft px-2 py-0.5 align-middle text-xs font-medium text-accent">
                      Personal project
                    </span>
                  )}
                </h3>
                {proj.tag && <span className="font-mono text-xs text-muted">{proj.tag}</span>}
              </div>
              {proj.text && <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">{proj.text}</p>}
              {proj.link && (
                <a
                  href={proj.link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-sm font-medium text-text underline decoration-accent underline-offset-4 hover:text-accent"
                >
                  {proj.link.label} ↗
                </a>
              )}

              <button
                type="button"
                onClick={() => setOpen({ p, i: active[p] })}
                className={`group mt-4 block w-full overflow-hidden rounded-lg border border-line bg-chip ${
                  mobile ? "py-4" : ""
                }`}
                aria-label={`Open screenshot: ${cur.caption}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cur.src}
                  alt={cur.caption}
                  loading="lazy"
                  className={`mx-auto transition-transform duration-500 group-hover:scale-[1.02] ${
                    mobile ? "max-h-[520px] w-auto rounded-xl shadow-lg" : "w-full"
                  }`}
                />
              </button>
              <p className="mt-2 text-sm text-muted">{cur.caption}</p>

              {proj.shots.length > 1 && (
                <ul className="mt-3 flex gap-2 overflow-x-auto pb-1">
                  {proj.shots.map((s, i) => (
                    <li key={s.src} className="shrink-0">
                      <button
                        type="button"
                        onClick={() => setActive((a) => a.map((v, k) => (k === p ? i : v)))}
                        className={`block overflow-hidden rounded-md border-2 transition-colors ${
                          i === active[p] ? "border-accent" : "border-transparent hover:border-line"
                        }`}
                        aria-label={s.caption}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={s.src}
                          alt=""
                          loading="lazy"
                          className={s.mobile ? "h-20 w-auto" : "h-20 w-32 object-cover object-top"}
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          );
        })}
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={projects[open.p].name}
          className="fixed inset-0 z-50 flex flex-col bg-black/90 p-4"
          onClick={close}
        >
          <div className="flex items-center justify-between text-sm text-white/80">
            <span>
              {projects[open.p].name} · {open.i + 1}/{projects[open.p].shots.length}
            </span>
            <button type="button" onClick={close} className="rounded px-2 py-1 hover:bg-white/10" aria-label="Close">
              ✕
            </button>
          </div>
          <div className="flex min-h-0 flex-1 items-center justify-center gap-2" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => step(-1)}
              className="hidden rounded-full px-3 py-2 text-2xl text-white/80 hover:bg-white/10 sm:block"
              aria-label="Previous"
            >
              ‹
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={projects[open.p].shots[open.i].src}
              alt={projects[open.p].shots[open.i].caption}
              className="max-h-full max-w-full rounded-lg object-contain"
            />
            <button
              type="button"
              onClick={() => step(1)}
              className="hidden rounded-full px-3 py-2 text-2xl text-white/80 hover:bg-white/10 sm:block"
              aria-label="Next"
            >
              ›
            </button>
          </div>
          <p className="mt-3 text-center text-sm text-white/80">{projects[open.p].shots[open.i].caption}</p>
        </div>
      )}
    </>
  );
}
