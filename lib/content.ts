// All site copy lives here. Edit this file to update the portfolio; components only render it.

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
    name: "Live show backing-track pipeline",
    kind: "Audio · GPU",
    period: "2026",
    text: "Automated backing tracks for a two-hour live tribute show: 58 songs separated into stems on GPU, beat tracking with an adaptive click grid, a spoken cue track, guitar tuning detection and ready-to-play REAPER projects for in-ear monitoring.",
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
    name: "ScoreFlow",
    kind: "Web · music",
    period: "2026",
    text: "Web sheet-music editor: optical music recognition, MIDI playback with a synced cursor and MusicXML export.",
    stack: ["Next.js", "Zustand", "Verovio (WASM)", "Tone.js", "Supabase"],
  },
  {
    name: "Zordon AI",
    kind: "Voice assistant",
    period: "2026",
    text: "Personal voice assistant with a 3D avatar, streaming answers and speech in and out.",
    stack: ["FastAPI", "Claude API", "ElevenLabs", "Whisper", "Next.js", "Three.js"],
  },
  {
    name: "AI media pipelines",
    kind: "Audio · video",
    period: "2025",
    text: "AI dubbing prototype that builds voice-cloning datasets, stem separation with BPM detection, and an AI clipper that finds the best moments of a YouTube video and cuts them automatically.",
    stack: ["faster-whisper", "MDX-Net", "Demucs", "Gemini", "PySceneDetect", "MoviePy"],
  },
];

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
