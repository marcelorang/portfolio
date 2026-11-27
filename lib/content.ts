// All site copy lives here. Edit this file to update the portfolio; components only render it.
import { techUsage } from "./techUsage";

export const profile = {
  name: "Marcelo Rangel",
  role: "Full Stack Software Engineer · AI-native development",
  focus: ["Context engineering", "Spec-driven development", "RAG & LLM systems", "Agentic workflows"],
  location: "Recife, Brazil · UTC-3",
  availability: "Open to remote roles · contractor or EOR",
  email: "mclowebdev@gmail.com",
  linkedin: "https://www.linkedin.com/in/marcelo-rangel-622089221/",
  github: "https://github.com/marcelorang",
  resume: "/Marcelo_Rangel_Resume.pdf",
  photo: "/marcelo.webp",
  summary:
    "I design the context AI agents work in — a central project brain, specs and a fixed plan → implement → review cycle — and use it to ship end-to-end products: APIs, web and mobile apps, and AI features like RAG and LLM-based OCR.",
};

export const stats = [
  { value: "2022", label: "shipping client products" },
  { value: "7", label: "client platforms built" },
  { value: "15+", label: "years as a professional musician" },
];

export const about = [
  "I'm a full stack engineer focused on .NET/C# back ends and AI systems, especially RAG applied to real products. Since 2022 I have worked at Atom Dev, a software studio, usually as the lead developer of client platforms in healthcare, real estate, BI, aviation and retail.",
  "Before tech, I spent more than fifteen years as a professional musician, playing with major Brazilian artists. That background still shapes how I work — collaborating under pressure, iterating fast and caring about craft — and it shows up in my side projects, from sheet-music software to a GPU pipeline that produces backing tracks for live shows.",
];

export const aiEngineering = {
  title: "AI-native engineering",
  intro:
    "AI agents forget everything when a session ends. I give every project a central brain and a fixed cycle, so people and agents work from the same documented decisions.",
  pillars: [
    {
      name: "Context engineering",
      text: "Custom Claude Code skills that encode the development cycle — plan, implement, review, session logging, checkpoint/resume — and release flows for TestFlight and Google Play, plus a CLAUDE.md context file per repository.",
    },
    {
      name: "Spec-driven development",
      text: "Obsidian vaults as the single source of truth: requirements and ADRs referenced by ID in the code, kept separate from agent session memory.",
    },
    {
      name: "AI inside products",
      text: "RAG over technical manuals, LLM-based OCR, scenario selection with LLMs, local speech recognition and synthesis.",
    },
  ],
  repo: {
    name: "context-engineering-kit",
    url: "https://github.com/marcelorang/context-engineering-kit",
    text: "The workflow, open-sourced as a drop-in kit: a docs vault template plus the skills for a resume → plan → implement → review → checkpoint cycle.",
  },
};

export type Project = {
  name: string;
  kind: string;
  period: string;
  text: string;
  stack: string[];
  link?: { label: string; url: string };
};

export const experience = {
  company: "Atom Dev",
  role: "Full Stack Software Engineer (Contractor)",
  period: "May 2022 – Present",
  place: "Remote · Recife, Brazil",
  intro: "Software studio building custom platforms for clients. Lead developer on client products, from back end to mobile.",
  projects: [
    {
      name: "Naja",
      kind: "Healthcare management SaaS",
      period: "Jul 2025 – Present",
      text: "Lead front-end developer for scheduling, medical reports, electronic health records and patient queues. Built the medical report editor and an API client generated from OpenAPI; contributed to the .NET 10 API deployed on AWS with Terraform.",
      stack: ["Next.js", "React", "TypeScript", "Tiptap", "Kubb", "TanStack Query", ".NET 10", "SQL Server", "AWS ECS", "Terraform"],
    },
    {
      name: "FFL",
      kind: "Airline pilot training platform",
      period: "Jul 2025 – Present",
      text: "Designed and built the first version of the RAG pipeline over aircraft technical manuals, with automatic question generation and scraping of real-world incidents to build training scenarios. A Python worker picks each pilot's next scenario with an LLM.",
      stack: ["RAG", "RAGFlow", "LangGraph", "LangChain", "OpenAI", "React Native", "Expo", ".NET 10", "PostgreSQL"],
    },
    {
      name: "SmartPromoter",
      kind: "Retail execution platform",
      period: "Sep 2026",
      text: "Python OCR service that reads printed stock reports with an LLM and flags out-of-stock items, plus an offline-first field app and a Next.js back office.",
      stack: ["FastAPI", "LiteLLM", "Gemini", "Expo", "Next.js", ".NET 10", "CQRS", "PostgreSQL"],
    },
    {
      name: "Monitori & MonitoriDocs",
      kind: "Construction monitoring · document workflows",
      period: "Feb 2025 – Jun 2026",
      text: ".NET APIs with Clean Architecture and CQRS, a workflow engine, Vue 3 web apps and a React Native app, with unit, integration and acceptance tests and per-component deploys on Azure Pipelines.",
      stack: [".NET 9/10", "MediatR", "SQL Server", "Azure", "Vue 3", "React Native", "Playwright"],
    },
    {
      name: "HubIndicador",
      kind: "Enterprise BI · client Avila Digital",
      period: "Oct 2024 – Jun 2026",
      text: "Migrated the front end from Vue 2 to Vue 3 with TypeScript; .NET 8 API with Azure AD B2C and embedded Power BI reports.",
      stack: ["Vue 3", "TypeScript", ".NET 8", "Azure AD B2C", "Power BI"],
    },
    {
      name: "MedZip",
      kind: "Clinic management platform",
      period: "2022 – Aug 2023",
      text: "Scheduling and patient records with a .NET API, a Vue front end and an Ionic app, deployed with Azure Pipelines.",
      stack: [".NET", "Vue", "Ionic", "Azure Pipelines"],
    },
  ] satisfies Project[],
};

export const sideProjects: Project[] = [
  {
    name: "Live VS: live show backing-track pipeline",
    kind: "AI custom studio · audio · GPU",
    period: "2026",
    text: "A personal AI studio that turns a setlist into live-ready backing tracks (VS): 58 songs separated into stems on GPU, beat tracking with an adaptive click grid, a spoken cue track, guitar tuning detection and ready-to-play REAPER projects for in-ear monitoring.",
    stack: ["Python", "PyTorch (CUDA)", "Demucs", "BS-Roformer", "beat_this", "Edge TTS", "librosa"],
  },
  {
    name: "BoxRadio",
    kind: "Desktop · voice AI · in development",
    period: "2026",
    text: "AI race engineer for Assetto Corsa Competizione: in-game overlays plus a voice engineer that calls out changes and answers questions from a wheel button, running fully on the user's PC.",
    stack: ["Tauri (Rust)", "React", "TypeScript", "Python", "faster-whisper", "Kokoro TTS"],
    link: { label: "acc-telemetry.pages.dev", url: "https://acc-telemetry.pages.dev/" },
  },
  {
    name: "AI media pipelines",
    kind: "Audio · video",
    period: "2025",
    text: "AI dubbing prototype that builds voice-cloning datasets, stem separation with BPM detection, and an AI clipper that finds the best moments of a YouTube video and cuts them automatically.",
    stack: ["faster-whisper", "MDX-Net", "Demucs", "Gemini", "PySceneDetect", "MoviePy"],
  },
];

export type ShowcaseShot = { src: string; caption: string; mobile?: boolean };
export type ShowcaseProject = {
  slug: string;
  group: "client" | "personal";
  name: string;
  kind: string;
  tag?: string;
  text?: string;
  link?: { label: string; url: string };
  shots: ShowcaseShot[];
};

// Screenshots of the products, captured locally with demo data. Filled in from /public/projects/<slug>/.
const shot = (slug: string, file: string, caption: string, mobile = false): ShowcaseShot => ({
  src: `/projects/${slug}/${file}.webp`,
  caption,
  mobile,
});

export const showcase: ShowcaseProject[] = [
  {
    slug: "naja",
    group: "client",
    name: "Naja",
    kind: "Healthcare management SaaS",
    tag: "Next.js · TypeScript · .NET 10 · AWS",
    text: "Clinic and diagnostic-imaging platform: patient flow, radiology worklists, a rich-text medical report editor and electronic health records.",
    shots: [
      shot("naja", "01-painel-clinico", "Clinical panel: today's patients grouped by status, with insurance, arrival and waiting time."),
      shot("naja", "03-editor-de-laudo", "Medical report editor (Tiptap) with templates, AI assistance and e-signature."),
      shot("naja", "02-lista-de-trabalho", "Radiology worklist: exams, report status, age flags and actions per patient."),
      shot("naja", "04-prontuario-eletronico", "Electronic health record: allergies, critical notes and the visit timeline."),
      shot("naja", "05-login", "Branded sign-in."),
    ],
  },
  {
    slug: "ffl",
    group: "client",
    name: "Daily Flight Deck (FFL)",
    kind: "Airline pilot training app",
    tag: "React Native · .NET 10 · RAG",
    text: "Daily scenario-based training for A320 pilots. Scenarios and questions come from a RAG pipeline over aircraft manuals; the app tracks how current each pilot is on every aircraft system.",
    shots: [
      shot("ffl", "01-home", "Home recommends the pilot's next training scenario.", true),
      shot("ffl", "02-scenario-briefing", "Scenario briefing: an electrical emergency with the mission overview.", true),
      shot("ffl", "03-question", "Multiple-choice question inside the scenario.", true),
      shot("ffl", "04-answer-feedback", "Instant feedback explaining why the answer is correct.", true),
      shot("ffl", "05-recency-radar", "Recency radar: how current the pilot is on each A320 system chapter.", true),
    ],
  },
  {
    slug: "smartpromoter",
    group: "client",
    name: "SmartPromoter",
    kind: "Retail execution platform",
    tag: "Next.js · Expo · .NET 10 CQRS · LLM OCR",
    text: "Back office and offline-first field app for retail promoters: store visits, shelf photos, stock readings via LLM-based OCR and out-of-stock forecasting.",
    shots: [
      shot("smartpromoter", "01-dashboard", "Operations dashboard: daily visit KPIs, stock-outs and planned vs. done per week."),
      shot("smartpromoter", "02-visao-estrategica", "Strategic view with restock suggestions and stock-out forecast per shelf."),
      shot("smartpromoter", "03-estoque", "Stock by store and product, with days of cover and a suggested order."),
      shot("smartpromoter", "04-alertas-integridade", "Integrity alerts for suspicious captures: spoofed GPS, far from store, repeated readings."),
      shot("smartpromoter", "05-pendencias", "Review queue for OCR stock readings awaiting a decision."),
      shot("smartpromoter-app", "02-atendimentos-do-dia", "Field app: today's store visits with status and navigation.", true),
      shot("smartpromoter-app", "03-atendimento-fotos", "Field app: before/after shelf photos captured during a visit.", true),
    ],
  },
  {
    slug: "monitoridocs",
    group: "client",
    name: "MonitoriDocs",
    kind: "Document & workflow platform",
    tag: "Vue 3 · .NET 10 · workflow engine",
    text: "Document workflows for real-estate project finance: stages with deadlines, per-document approvals, waivers and a full audit trail.",
    shots: [
      shot("monitoridocs", "03-workflow-board", "Workflow board: stages, deadlines and per-document approval status, including a waiver."),
      shot("monitoridocs", "01-home-priorities", "Priorities home: each project's pending items and progress."),
      shot("monitoridocs", "02-projects-list", "Projects with on-time / attention / late status."),
      shot("monitoridocs", "04-document-history", "Document history: upload, review and waiver timeline."),
      shot("monitoridocs", "05-documents-table", "All documents across workflows, filtered to late items."),
    ],
  },
  {
    slug: "monitori",
    group: "client",
    name: "Monitori",
    kind: "Construction monitoring portal",
    tag: "Vue 3 · .NET 9 · Clean Architecture",
    text: "Client portal for construction and financial monitoring of real-estate projects, with monthly reports per contracted service.",
    shots: [
      shot("monitori", "02-home-dashboard", "Client home: latest reports by service and recently viewed projects."),
      shot("monitori", "04-project-detail", "Project page with contracted and available monitoring services."),
      shot("monitori", "03-projects-list", "Project list with filters by type, developer, investor and state."),
      shot("monitori", "05-report-viewer", "Built-in PDF report viewer with a reference-month picker."),
      shot("monitori", "01-login", "Branded sign-in."),
    ],
  },
  {
    slug: "boxradio",
    group: "personal",
    name: "BoxRadio",
    kind: "AI race engineer for sim racing",
    tag: "Tauri (Rust) · React · local voice AI",
    text: "In-game overlays plus a voice race engineer for Assetto Corsa Competizione, running fully on the user's PC.",
    link: { label: "Visit the BoxRadio site", url: "https://acc-telemetry.pages.dev/" },
    shots: [
      shot("boxradio", "01-race-hud", "In-race HUD: sector timing, weather, tyres, inputs, fuel, brake bias and brake temps."),
      shot("boxradio", "02-edit-mode-settings", "Edit mode: drag widgets anywhere and tune them in the settings panel."),
      shot("boxradio", "04-landing-hero", "Landing page: \"Your race engineer, on the radio.\""),
      shot("boxradio", "05-landing-voice-engineer", "Sample radio exchanges between driver and AI engineer."),
    ],
  },
  {
    slug: "backing-tracks",
    group: "personal",
    name: "Live VS",
    kind: "AI custom studio for live shows",
    tag: "Python · PyTorch (CUDA) · REAPER",
    text: "Turns a setlist into live-ready backing tracks: stems separated on GPU, adaptive click, spoken cues and tuning detection, delivered as REAPER sessions.",
    shots: [
      shot("backing-tracks", "01-reaper-project", "A generated REAPER session: click, spoken cues, GPU-separated stems and section markers."),
      shot("backing-tracks", "02-click-grid-zoom", "Adaptive click grid: beat-tracked tempo changes bar by bar, cues right before each section."),
      shot("backing-tracks", "03-tuning-detection", "Tuning detection across the 58-track set: offset from A=440 and lowest guitar note."),
    ],
  },
  {
    slug: "solarquake",
    group: "personal",
    name: "SolarQuake",
    kind: "Solar activity × seismic events",
    tag: "Next.js · NASA / NOAA / USGS data",
    text: "Real-time dashboard that puts solar flares, geomagnetic storms and earthquakes on one timeline.",
    shots: [
      shot("solarquake", "02-summary-dashboard", "Daily summary: quake counts, largest event, most active regions."),
      shot("solarquake", "03-live-quake-map", "Live map of M4+ earthquakes with a per-event detail sheet."),
      shot("solarquake", "05-solar-monitor", "Solar monitor: NASA SDO imagery, X-ray class, active regions and CMEs."),
      shot("solarquake", "01-landing-hero", "Landing page."),
    ],
  },
];

export const brainGraph = {
  src: "/projects/brain/01-project-brain-graph.webp",
  caption:
    "Modeled on my real project brain in Obsidian (771 notes, 3,500+ links): every project is a hub of specs, ADRs and session logs, and shared technologies tie them together.",
  techs: techUsage.map((t) => ({ ...t, projects: t.uses.map((u) => u.project) })),
};

export const skills = [
  { group: "Back end", items: ["C#", ".NET 8/9/10", "ASP.NET Core", "EF Core", "Dapper", "MediatR / CQRS", "SignalR", "Hangfire", "Python", "FastAPI", "Node.js"] },
  { group: "Front end", items: ["TypeScript", "React", "Next.js", "Vue 3", "Tailwind CSS", "shadcn/ui", "Vuetify", "TanStack Query", "Zod", "Storybook"] },
  { group: "Mobile & desktop", items: ["React Native", "Expo", "NativeWind", "Tauri (Rust)"] },
  { group: "AI / LLM", items: ["RAG", "LangChain", "LangGraph", "RAGFlow", "Embeddings", "LLM-based OCR", "Agents", "OpenAI", "Claude", "Gemini", "Whisper", "TTS"] },
  { group: "Data", items: ["SQL Server", "PostgreSQL", "SQLite", "Supabase", "Chroma"] },
  { group: "Cloud & DevOps", items: ["Azure", "AWS", "Terraform", "Docker", "GitHub Actions", "Azure Pipelines", "Vercel"] },
  { group: "Practices", items: ["Clean Architecture", "DDD", "Multi-tenancy", "ADRs", "Testing (NUnit, xUnit, Playwright, Vitest)", "Context engineering"] },
];

export const education = {
  degree: "Associate Degree in Web Development",
  school: "Anhanguera University, Brazil",
  year: "2023",
  languages: ["Portuguese — native", "English — intermediate spoken and written, advanced reading"],
};
