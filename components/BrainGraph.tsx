"use client";

import { useEffect, useRef, useState } from "react";
import type { ShowcaseProject } from "@/lib/content";

// Live "project brain": an Obsidian-style force graph. Project hubs link to /work#<slug>;
// shared technologies connect the projects; small notes (specs, ADRs, sessions) orbit each hub.

type Kind = "hub" | "project" | "tech" | "note";
type N = {
  id: string;
  label: string;
  kind: Kind;
  href?: string;
  personal?: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  fixed?: boolean;
};
type L = { a: number; b: number; len: number; k: number };

export type BrainTech = { label: string; projects: string[] };

const NOTE_KINDS = ["Spec", "ADR", "Session log", "Requirement", "Guide", "Meeting notes", "Decision"];

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function buildGraph(projects: ShowcaseProject[], techs: BrainTech[], hubHref: string) {
  const rnd = seeded(42);
  const nodes: N[] = [];
  const links: L[] = [];
  const add = (n: Omit<N, "x" | "y" | "vx" | "vy">) => {
    const a = rnd() * Math.PI * 2;
    const d = 80 + rnd() * 220;
    nodes.push({ ...n, x: Math.cos(a) * d, y: Math.sin(a) * d, vx: 0, vy: 0 });
    return nodes.length - 1;
  };
  const link = (a: number, b: number, len: number, k = 0.04) => links.push({ a, b, len, k });

  const hub = add({ id: "hub", label: "Project brain", kind: "hub", href: hubHref, r: 9 });
  const index = new Map<string, number>();
  projects.forEach((p) => {
    const i = add({
      id: p.slug,
      label: p.name.replace(/ \(.*\)$/, ""),
      kind: "project",
      href: `/work#${p.slug}`,
      personal: p.group === "personal",
      r: 7.5,
    });
    index.set(p.slug, i);
    link(hub, i, 150, 0.02);
    const count = 7 + Math.floor(rnd() * 8);
    for (let k = 0; k < count; k++) {
      const kind = NOTE_KINDS[Math.floor(rnd() * NOTE_KINDS.length)];
      const n = add({ id: `${p.slug}-n${k}`, label: `${kind} · ${p.name.replace(/ \(.*\)$/, "")}`, kind: "note", r: 2.2 });
      link(i, n, 34 + rnd() * 26, 0.06);
      if (k > 0 && rnd() < 0.35) link(n, n - 1, 30, 0.03);
    }
  });
  techs.forEach((t) => {
    const i = add({ id: `t-${t.label}`, label: t.label, kind: "tech", r: 4 });
    t.projects.forEach((slug) => {
      const p = index.get(slug);
      if (p !== undefined) link(i, p, 95, 0.025);
    });
  });
  return { nodes, links };
}

export default function BrainGraph({
  projects,
  techs,
  hubHref,
  caption,
}: {
  projects: ShowcaseProject[];
  techs: BrainTech[];
  hubHref: string;
  caption: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [hint, setHint] = useState<string | null>(null);

  useEffect(() => {
    const el = canvas.current!;
    const box = wrap.current!;
    const ctx = el.getContext("2d")!;
    const { nodes, links } = buildGraph(projects, techs, hubHref);
    const adj = nodes.map(() => new Set<number>());
    links.forEach((l) => {
      adj[l.a].add(l.b);
      adj[l.b].add(l.a);
    });

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let scale = 1;
    let hover = -1;
    let drag = -1;
    let alpha = 1;
    let raf = 0;
    let visible = true;
    const mouse = { x: 0, y: 0, down: false, moved: false };

    const css = (name: string, fallback: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
    const accent = css("--accent", "#fb923c");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = box.clientWidth;
      h = box.clientHeight;
      el.width = w * dpr;
      el.height = h * dpr;
      el.style.width = `${w}px`;
      el.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const tick = () => {
      // Repulsion
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          let dx = a.x - b.x;
          let dy = a.y - b.y;
          let d2 = dx * dx + dy * dy;
          if (d2 < 0.01) {
            dx = Math.random() - 0.5;
            dy = Math.random() - 0.5;
            d2 = 0.25;
          }
          if (d2 > 90000) continue;
          const f = ((a.kind === "note" || b.kind === "note" ? 260 : 900) / d2) * alpha;
          const d = Math.sqrt(d2);
          a.vx += (dx / d) * f;
          a.vy += (dy / d) * f;
          b.vx -= (dx / d) * f;
          b.vy -= (dy / d) * f;
        }
      }
      // Springs
      for (const l of links) {
        const a = nodes[l.a];
        const b = nodes[l.b];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        const f = (d - l.len) * l.k * alpha;
        a.vx += (dx / d) * f;
        a.vy += (dy / d) * f;
        b.vx -= (dx / d) * f;
        b.vy -= (dy / d) * f;
      }
      // Gravity, damping, integrate
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.vx -= n.x * 0.004 * alpha;
        n.vy -= n.y * 0.004 * alpha;
        if (i === drag) continue;
        n.vx *= 0.82;
        n.vy *= 0.82;
        n.x += n.vx;
        n.y += n.vy;
      }
      alpha = Math.max(alpha * 0.995, reduce ? 0 : 0.06);
    };

    // Fit the graph to the frame (smoothed, so it breathes instead of jumping).
    let cx = 0;
    let cy = 0;
    const fit = (instant = false) => {
      let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
      for (const n of nodes) {
        x0 = Math.min(x0, n.x); y0 = Math.min(y0, n.y);
        x1 = Math.max(x1, n.x); y1 = Math.max(y1, n.y);
      }
      const target = Math.min((w - 70) / (x1 - x0 || 1), (h - 110) / (y1 - y0 || 1), 2.2);
      const tx = (x0 + x1) / 2;
      const ty = (y0 + y1) / 2 - 6 / target;
      const t = instant ? 1 : 0.06;
      scale += (target - scale) * t;
      cx += (tx - cx) * t;
      cy += (ty - cy) * t;
    };
    const toScreen = (n: N) => ({ x: w / 2 + (n.x - cx) * scale, y: h / 2 + (n.y - cy) * scale });

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const lit = hover >= 0 ? adj[hover] : null;
      // Links
      for (const l of links) {
        const a = toScreen(nodes[l.a]);
        const b = toScreen(nodes[l.b]);
        const on = hover >= 0 && (l.a === hover || l.b === hover);
        ctx.strokeStyle = on ? accent : hover >= 0 ? "rgba(140,140,150,0.10)" : "rgba(160,160,170,0.28)";
        ctx.lineWidth = on ? 1.4 : 0.7;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      // Nodes
      nodes.forEach((n, i) => {
        const p = toScreen(n);
        const focus = i === hover || (lit?.has(i) ?? false);
        const dim = hover >= 0 && !focus;
        const zoom = Math.min(Math.max(scale, 0.8), 1.4);
        const r = n.r * (n.kind === "note" ? Math.min(zoom, 1.2) : zoom) * (i === hover ? 1.35 : 1);
        let fill = "rgba(200,200,205,0.85)";
        if (n.kind === "project") fill = n.personal ? "#e8e8ec" : accent;
        if (n.kind === "hub") fill = "#ffffff";
        if (n.kind === "tech") fill = "rgba(150,170,255,0.9)";
        ctx.globalAlpha = dim ? 0.18 : 1;
        if (n.kind === "project" && n.personal) {
          ctx.strokeStyle = accent;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r + 2.5, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.fillStyle = fill;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
        // Labels: always for hubs/projects, techs and notes when lit.
        const showLabel = n.kind === "project" || n.kind === "hub" || (focus && n.kind !== "note") || i === hover;
        if (showLabel && !dim) {
          ctx.font = `${n.kind === "project" || n.kind === "hub" ? 600 : 500} ${n.kind === "note" ? 11 : 12}px Inter, system-ui, sans-serif`;
          ctx.fillStyle = i === hover ? "#ffffff" : "rgba(230,230,235,0.92)";
          ctx.textAlign = "center";
          ctx.fillText(n.label, p.x, p.y - r - 7);
        }
        ctx.globalAlpha = 1;
      });
    };

    const loop = () => {
      if (visible) {
        tick();
        if (drag < 0) fit();
        draw();
      }
      raf = requestAnimationFrame(loop);
    };

    const pick = (mx: number, my: number) => {
      let best = -1;
      let bestD = Infinity;
      nodes.forEach((n, i) => {
        const p = toScreen(n);
        const d = Math.hypot(p.x - mx, p.y - my);
        const hit = Math.max(n.r * scale + 6, n.kind === "note" ? 7 : 12);
        if (d < hit && d < bestD) {
          best = i;
          bestD = d;
        }
      });
      return best;
    };

    const pos = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onMove = (e: PointerEvent) => {
      const { x, y } = pos(e);
      if (mouse.down && drag >= 0) {
        const n = nodes[drag];
        n.x = (x - w / 2) / scale + cx;
        n.y = (y - h / 2) / scale + cy;
        n.vx = n.vy = 0;
        mouse.moved = true;
        alpha = Math.max(alpha, 0.3);
        return;
      }
      hover = pick(x, y);
      const n = hover >= 0 ? nodes[hover] : null;
      el.style.cursor = n?.href ? "pointer" : n ? "grab" : "default";
      setHint(
        n
          ? n.kind === "project"
            ? `${n.label} — click to see it on screen`
            : n.kind === "hub"
              ? "The project brain — click to open the kit on GitHub"
              : n.label
          : null,
      );
    };
    const onDown = (e: PointerEvent) => {
      const { x, y } = pos(e);
      mouse.down = true;
      mouse.moved = false;
      drag = pick(x, y);
      if (drag >= 0) el.setPointerCapture(e.pointerId);
    };
    const onUp = (e: PointerEvent) => {
      const i = drag;
      mouse.down = false;
      drag = -1;
      if (i >= 0 && !mouse.moved) {
        const n = nodes[i];
        if (n.href) {
          if (n.href.startsWith("http")) window.open(n.href, "_blank", "noopener");
          else window.location.href = n.href;
        } else {
          hover = i;
        }
      }
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {}
    };
    const onLeave = () => {
      if (!mouse.down) {
        hover = -1;
        setHint(null);
      }
    };

    resize();
    for (let i = 0; i < 260; i++) tick(); // settle before the first frame
    fit(true);
    const ro = new ResizeObserver(resize);
    ro.observe(box);
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting));
    io.observe(box);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [projects, techs, hubHref]);

  return (
    <figure data-reveal className="mt-4 overflow-hidden rounded-xl border border-line bg-[#1b1b1e]">
      <div ref={wrap} className="relative h-[460px] w-full touch-pan-y select-none sm:h-[560px]">
        <canvas ref={canvas} aria-label="Interactive graph of projects, technologies and notes" role="img" />
        <div className="pointer-events-none absolute left-4 top-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/60">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent" /> Client work
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full border-2 border-accent bg-[#e8e8ec]" /> Personal project
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-[rgba(150,170,255,0.9)]" /> Technology
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/70" /> Notes
          </span>
        </div>
        <p className="pointer-events-none absolute bottom-3 left-4 right-4 text-sm text-white/80">
          {hint ?? "Hover a node to explore · click a project to see it on screen · drag to play"}
        </p>
      </div>
      <figcaption className="border-t border-line bg-surface px-5 py-3 text-sm text-muted">{caption}</figcaption>
    </figure>
  );
}
