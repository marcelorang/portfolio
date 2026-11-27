// How each technology is used in each project, written from the actual code of every repository.
export const techUsage: { label: string; about: string; uses: { project: string; text: string }[] }[] = [
  {
    label: ".NET / C#",
    about: "Microsoft's platform for building fast, reliable server software such as web APIs and background services.",
    uses: [
      { project: "naja", text: "Powers the clinic system's .NET 10 REST API: EF Core and Dapper data access, FluentValidation, JWT auth, and PuppeteerSharp to render medical reports as PDFs." },
      { project: "ffl", text: "Two .NET 10 APIs sharing one database: one serves the pilot app (courses, quizzes, attempts, RevenueCat subscriptions), the other backs the content-curation back office." },
      { project: "smartpromoter", text: "A single .NET 10 host serves both the promoter mobile API and the back-office API, runs Quartz.NET jobs, and calls the OCR service over HTTP." },
      { project: "monitoridocs", text: "The .NET 10 backend runs a multi-tenant workflow engine: templated stages, versioned documents, and a separate worker service handling SLA checks and workflow events." },
      { project: "monitori", text: "A .NET 9 API serves three surfaces (web portal, back office, mobile) for real-estate project monitoring: projects, investors, reports and file attachments." },
    ],
  },
  {
    label: "React / Next.js",
    about: "React is the most widely used library for web interfaces; Next.js adds routing, server rendering and deployment.",
    uses: [
      { project: "naja", text: "Next.js 15 clinic front end; typed TanStack Query hooks and Zod schemas are generated from the API's OpenAPI spec with Kubb, and reports use a Tiptap editor." },
      { project: "smartpromoter", text: "The back office is a client-first Next.js App Router app (Tailwind, shadcn/ui, TanStack Query); a separate server-first Next.js site serves the public landing page." },
      { project: "solarquake", text: "Next.js 16 App Router PWA: API routes aggregate space-weather and earthquake feeds; React renders the Leaflet quake map, Recharts timelines and an English/Portuguese UI." },
      { project: "boxradio", text: "The overlay UI is React + TypeScript on Vite (not Next.js), updating telemetry widgets at 60 FPS through requestAnimationFrame and an external store to avoid re-renders." },
    ],
  },
  {
    label: "React Native / Expo",
    about: "Frameworks for building native iOS and Android apps from a single JavaScript/TypeScript codebase.",
    uses: [
      { project: "ffl", text: "The pilot training app is Expo SDK 56 / React Native 0.85 (new architecture, expo-router, NativeWind), with RevenueCat in-app subscriptions and tokens in secure storage." },
      { project: "smartpromoter", text: "Offline-first Expo field app: visits, photos and stock counts go into a transactional SQLite queue and sync when signal returns; uses the camera and GPS." },
      { project: "monitori", text: "An Expo / React Native app lets investors browse their real-estate projects, save favorites and open monthly reports as PDFs and photo galleries." },
    ],
  },
  {
    label: "Vue 3",
    about: "A progressive JavaScript framework for building interactive web interfaces, known for its gentle learning curve.",
    uses: [
      { project: "monitori", text: "Web portal and back office are Vue 3 + Vuetify apps, with Pinia state, CASL role-based permissions and Microsoft Entra ID sign-in through MSAL." },
      { project: "monitoridocs", text: "Two Vue 3 + Vuetify front ends, client portal and admin back office, for configuring workflow templates, tracking stages and uploading documents; Entra ID login via MSAL." },
      { project: "ffl", text: "The internal back office, where the team reviews and curates generated training scenarios before publication, is a Vue 3 + Vite app." },
    ],
  },
  {
    label: "RAG & LLMs",
    about: "Large language models generate or interpret text; RAG grounds their answers in a specific set of documents.",
    uses: [
      { project: "ffl", text: "A Python RAG pipeline drafts quiz scenarios from aircraft documentation for human curation; a separate LLM worker (LangChain/OpenAI) picks each pilot's next scenario after every completed one." },
      { project: "smartpromoter", text: "Gemini Flash-Lite, called through LiteLLM, reads photographed stock reports into structured items; the prompt and schema were benchmarked against a hand-labeled photo set before production." },
      { project: "naja", text: "An LLM chat assistant (OpenAI API, streamed into a side drawer) is built into the medical report editor; it is plain LLM chat, without retrieval." },
    ],
  },
  {
    label: "Python",
    about: "A general-purpose language that dominates data science, AI and automation scripting.",
    uses: [
      { project: "smartpromoter", text: "The OCR microservice is Python/FastAPI: it corrects photo perspective, prompts Gemini via LiteLLM, and returns validated structured stock items to the .NET API." },
      { project: "ffl", text: "Python owns the LLM logic: a worker polls Postgres and asks the LLM for each pilot's next scenario, and Playwright scrapers collect aviation incident reports as source material." },
      { project: "backing-tracks", text: "One Python pipeline does the whole job: takes the source recordings, separates stems, tracks beats, renders click and spoken-cue tracks, and writes ready-to-play REAPER projects for the show." },
      { project: "boxradio", text: "A local Python sidecar, driven by the Rust core over stdin/stdout JSON Lines, handles speech: Whisper transcription of questions and Kokoro synthesis of replies." },
    ],
  },
  {
    label: "SQL Server",
    about: "Microsoft's relational database, widely used in enterprise systems.",
    uses: [
      { project: "naja", text: "Main clinic database: EF Core for schema and writes, Dapper for hand-written read queries, plus a separate audit context and Serilog logs stored in SQL tables." },
      { project: "monitori", text: "Stores projects, investors, reports and users through EF Core code-first migrations." },
      { project: "monitoridocs", text: "Holds multi-tenant workflow, stage and document data via EF Core, and backs the transactional outbox that publishes domain events to Azure Service Bus." },
    ],
  },
  {
    label: "PostgreSQL",
    about: "A powerful, widely adopted open-source relational database.",
    uses: [
      { project: "ffl", text: "One Azure Postgres database split into two schemas: published content for the app and raw generated scenarios under curation; also serves as the LLM worker's job queue." },
      { project: "smartpromoter", text: "Primary database through EF Core/Npgsql for visits, stores, products and stock readings; integration tests run against a throwaway Postgres instance reset between tests." },
      { project: "solarquake", text: "Supabase Postgres stores synced earthquakes, solar events, correlation scores, user profiles and push subscriptions; Edge Functions refresh the data and send storm alerts." },
    ],
  },
  {
    label: "Azure",
    about: "Microsoft's cloud platform for hosting applications, databases, file storage and user identity.",
    uses: [
      { project: "monitori", text: "Deployed to Azure App Service through GitHub Actions; uses Blob Storage for attachments, Entra ID for staff sign-in and Azure Communication Services for email." },
      { project: "monitoridocs", text: "Uses Entra ID sign-in, Blob Storage for documents, Service Bus for workflow events, Key Vault for secrets, Communication Services email and Application Insights monitoring." },
      { project: "ffl", text: "API and Python worker run on Azure App Service (Linux) with Azure Database for PostgreSQL, Key Vault and Application Insights, all provisioned with OpenTofu." },
      { project: "smartpromoter", text: "API and OCR service run on Azure App Service, with Blob Storage for store photos and Key Vault for secrets, provisioned with OpenTofu." },
    ],
  },
  {
    label: "AWS",
    about: "Amazon's cloud platform, the largest provider of on-demand computing infrastructure.",
    uses: [
      { project: "naja", text: "The APIs run as Docker containers on ECS behind a load balancer, with images in ECR, logs in CloudWatch and IAM roles, all defined in Terraform." },
    ],
  },
  {
    label: "Clean Architecture / CQRS",
    about: "Design patterns that keep business rules independent of infrastructure and separate reads from writes.",
    uses: [
      { project: "smartpromoter", text: "Domain, application and infrastructure layers with MediatR commands and queries; each API surface (mobile, back office) has its own CQRS layer sharing pipeline behaviours." },
      { project: "monitori", text: "Layered Domain / Application / Infrastructure / API solution where every use case is a MediatR command or query handler, keeping controllers thin and rules testable." },
      { project: "monitoridocs", text: "Same layered MediatR foundation as Monitori, extended with domain events that a separate worker consumes to advance workflows and send notifications." },
      { project: "ffl", text: "Both .NET backends follow Clean Architecture with MediatR CQRS, separate application layers for the mobile app and back office, and mandatory integration tests." },
    ],
  },
  {
    label: "GPU / PyTorch",
    about: "PyTorch is the leading deep-learning framework; graphics cards run its neural networks far faster than processors.",
    uses: [
      { project: "backing-tracks", text: "Runs Demucs and BS-Roformer neural networks on an RTX 3070 (CUDA) to split each recording into drums, bass, guitar, vocals, keys and orchestra stems, about a minute per song." },
    ],
  },
  {
    label: "Audio DSP",
    about: "Digital signal processing: analysing and transforming sound with math, such as mixing, filtering or pitch detection.",
    uses: [
      { project: "backing-tracks", text: "Builds backing tracks by mixing separated stems (guitar lowered 10 dB), keeps every track sample-aligned, and estimates guitar tuning with librosa constant-Q analysis." },
      { project: "boxradio", text: "Records the steering-wheel push-to-talk mic at 16 kHz with voice-activity filtering, and synthesizes radio-style chirps with ramped envelopes so tones never click in the headset." },
    ],
  },
  {
    label: "Tauri (Rust)",
    about: "A framework for lightweight desktop apps: a Rust core paired with a web-based interface.",
    uses: [
      { project: "boxradio", text: "The Rust core reads racing-sim telemetry from shared memory and the UDP broadcast API, manages click-through overlay windows, global shortcuts, wheel push-to-talk and the voice sidecar." },
    ],
  },
  {
    label: "Local voice AI",
    about: "Speech recognition and synthesis models that run on the user's own computer, with no cloud service.",
    uses: [
      { project: "boxradio", text: "A CPU-only race engineer: faster-whisper (int8) transcribes Portuguese questions using a racing-vocabulary prompt, and Kokoro (ONNX) speaks answers and alerts, fully offline." },
    ],
  },
  {
    label: "Public science APIs",
    about: "Free data feeds from agencies like NASA, NOAA and USGS about earthquakes, the Sun and space weather.",
    uses: [
      { project: "solarquake", text: "Combines USGS earthquake feeds with NOAA SWPC Kp index, X-ray flares and solar wind, plus NASA DONKI CMEs and SDO/SOHO imagery, to score solar-seismic correlation." },
    ],
  },
];
