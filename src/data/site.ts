export const profile = {
    name: "Charles Wachira",
    short: "CW",
    title: "Senior Software Engineer",
    roles: ["Senior Software Engineer", "Technical Lead", "Full-Stack & Systems Development"],
    location: "Nairobi, Kenya",
    email: "mcwachira@outlook.com",
    linkedin: "https://www.linkedin.com/in/maina-wachira",
    github: "https://github.com/mcwachira",
    years: "7+",
    statement:
        "I design and build software systems that turn complex business workflows into reliable digital products — full-stack applications, CRM architecture, automation and the API integrations that hold them together.",
    specialisms: [
        "CRM Architecture",
        "Automation",
        "Zoho Development",
        "API Integrations",
        "Business Systems",
        "Full-Stack Engineering",
    ],
};

export const metrics = [
    { value: "7+", label: "Years of professional software engineering" },
    { value: "6+", label: "CRM & custom application work delivered" },
    { value: "50%", label: "Increase in online bookings — Soul Breeze" },
    { value: "2\u00d7", label: "Increase in online donations — Fundi Kipusa" },
];

export const focus = [
    {
        no: "01",
        title: "Full-Stack Systems",
        body: "Complete business applications rather than websites: data models, server logic, interfaces and the operational tooling around them.",
        tech: ["React", "Next.js", "Node.js", "NestJS", "REST APIs", "PostgreSQL", "MongoDB"],
        span: "lg:col-span-7",
    },
    {
        no: "02",
        title: "Business Systems & Automation",
        body: "I translate business processes into software workflows — approvals, stage transitions and operational rules that run without someone chasing them.",
        tech: ["Zoho CRM", "Zoho Creator", "Deluge", "Blueprints", "Workflows", "Approval systems"],
        span: "lg:col-span-5",
    },
    {
        no: "03",
        title: "APIs & Integrations",
        body: "Interoperability between systems that were never designed to speak to each other, with auth, retries and state kept honest on both sides.",
        tech: ["REST APIs", "OAuth 2.0", "QuickBooks", "Xero", "Zoho Books", "Payment platforms"],
        span: "lg:col-span-5",
    },
    {
        no: "04",
        title: "Technical Leadership",
        body: "Architecture through delivery: requirements, implementation, QA, deployment, client handover and technical training for the teams who inherit the system.",
        tech: ["Architecture", "Requirements", "QA", "Deployment", "Handover", "Training"],
        span: "lg:col-span-7",
    },
];

export type Project = {
    slug: string;
    no: string;
    title: string;
    client: string;
    category: string;
    type: string;
    year: string;
    role: string;
    summary: string;
    problem: string;
    approach: string[];
    decisions: string[];
    technologies: string[];
    outcomes: string[];
    flow: string[];
    featured: boolean;
    span: string;
};

export const projects: Project[] = [
    {
        slug: "wavemark-properties",
        no: "01",
        title: "Wavemark Properties",
        client: "Wavemark Properties",
        category: "Real Estate / CRM",
        type: "Sales CRM + biometric workforce attendance",
        year: "2024",
        role: "Architecture / Implementation / Integration",
        summary:
            "A multi-stage real estate sales CRM joined to a biometric attendance system for construction crews across multiple sites.",
        problem:
            "Sales moved through spreadsheets and WhatsApp while unit reservations, payment milestones and invoicing lived in separate places. On the construction side, site attendance was recorded on paper, so payroll and workforce reporting depended on manual reconciliation.",
        approach: [
            "Modelled the sales pipeline as explicit stages with a Blueprint governing every transition.",
            "Built unit reservation so a unit is held, released or converted by the deal state rather than by hand.",
            "Tracked payment milestones against each deal and synchronised them with Zoho Books invoices and receipts.",
            "Automated deal closure once the payment state satisfied the milestone rules.",
            "Integrated a ZKTeco ZK9500 reader through a Python service that pushes multi-site attendance records into the system.",
            "Surfaced KPI dashboards over pipeline value, reservations and attendance.",
        ],
        decisions: [
            "Payment state, not a user action, is the source of truth for closing a deal — reconciliation stops being a human job.",
            "Hardware talks to a thin Python service instead of the CRM directly, so a reader going offline never blocks the pipeline.",
            "Reservation is a derived state of the deal, which makes double-allocation of a unit structurally impossible.",
        ],
        technologies: ["Zoho CRM", "Zoho Books", "Deluge", "Python", "ZKTeco ZK9500", "REST APIs"],
        outcomes: [
            "Sales pipeline, unit inventory and finance run on one connected record.",
            "Deal closure and invoice synchronisation happen automatically from payment state.",
            "Multi-site worker attendance is captured biometrically instead of on paper.",
        ],
        flow: ["CRM", "Blueprint", "Deluge function", "Zoho Books", "Payment state", "Automated transition"],
        featured: true,
        span: "lg:col-span-7",
    },
    {
        slug: "soil-merchants",
        no: "02",
        title: "Soil Merchants Kenya",
        client: "Soil Merchants Kenya",
        category: "Real Estate / Automation",
        type: "Sales pipeline automation",
        year: "2024",
        role: "Architecture / Implementation",
        summary:
            "Lead-to-payment automation for a land sales business, with reservations and invoicing kept in step automatically.",
        problem:
            "Leads, deals, reservations and invoices were tracked independently. Finance and sales regularly disagreed on which units were actually sold and which payments had landed.",
        approach: [
            "Unified leads and deals under one qualification and conversion model.",
            "Built unit reservation with payment milestone tracking on each deal.",
            "Wrote Deluge automation to move deals through Blueprint transitions when conditions are met.",
            "Synchronised invoices and payments between the CRM and Zoho Books in both directions.",
        ],
        decisions: [
            "Blueprint transitions are condition-driven, so stage data can never contradict payment data.",
            "Invoice creation is triggered from the deal rather than entered separately, removing a whole class of mismatch.",
        ],
        technologies: ["Zoho CRM", "Zoho Books", "Deluge", "Blueprints", "REST APIs"],
        outcomes: [
            "Sales and finance read the same numbers from the same record.",
            "Stage progression and invoicing no longer depend on manual follow-up.",
        ],
        flow: ["Lead", "Deal", "Reservation", "Milestone", "Zoho Books", "Blueprint transition"],
        featured: true,
        span: "lg:col-span-5",
    },
    {
        slug: "tingashare",
        no: "03",
        title: "Tingashare Limited",
        client: "Tingashare Limited",
        category: "Construction / Operations",
        type: "Fleet & project management systems",
        year: "2023",
        role: "Architecture / Implementation / Training",
        summary:
            "Custom operational platform for a 150+ unit heavy equipment fleet and the work that equipment is deployed to.",
        problem:
            "Fleet deployment, maintenance schedules, availability and operator assignments were spread across spreadsheets. Nobody could answer which machines were free next week without calling around.",
        approach: [
            "Built a fleet register covering 150+ heavy equipment units with deployment and availability state.",
            "Added maintenance scheduling and operator assignment against each unit.",
            "Modelled work with milestone tracking and resource allocation drawn from the same fleet register.",
            "Replaced the spreadsheet workflows and trained the operations team on the system.",
        ],
        decisions: [
            "Availability is computed from deployments and maintenance windows rather than being a field someone edits.",
            "Projects allocate from the fleet register directly, so a machine cannot be promised to two sites.",
        ],
        technologies: ["Zoho Creator", "Deluge", "Workflows", "Reports"],
        outcomes: [
            "150+ equipment units tracked in one system with live availability.",
            "Project milestones and resource allocation planned against real fleet state.",
        ],
        flow: ["Fleet register", "Deployment", "Maintenance", "Availability", "Project allocation"],
        featured: true,
        span: "lg:col-span-6",
    },
    {
        slug: "solidaridad",
        no: "04",
        title: "Solidaridad East & Central Africa",
        client: "Solidaridad East & Central Africa",
        category: "NGO / Finance Operations",
        type: "Procurement & expense management",
        year: "2023",
        role: "Implementation / Integration / Handover",
        summary:
            "Digitised procurement and expense workflows for a multi-country NGO operation.",
        problem:
            "Procurement ran on email approvals and attached documents across several country offices, leaving finance without visibility into what had been ordered, approved or delivered.",
        approach: [
            "Mapped the procurement workflow from request through approval to delivery confirmation.",
            "Built supplier management and purchase approval routing.",
            "Added order tracking with delivery confirmation as an explicit step.",
            "Connected expense handling through Zoho Expense for multi-country finance visibility.",
        ],
        decisions: [
            "Approval routing is part of the data model, not an email convention — the audit trail comes for free.",
            "Delivery confirmation is a required state, so no order silently closes.",
        ],
        technologies: ["Zoho Creator", "Zoho Expense", "Deluge", "Approval workflows"],
        outcomes: [
            "Procurement runs as a tracked workflow across multiple countries.",
            "Finance has visibility into approvals, orders and deliveries in one place.",
        ],
        flow: ["Request", "Approval", "Purchase order", "Delivery", "Zoho Expense", "Finance report"],
        featured: true,
        span: "lg:col-span-6",
    },
    {
        slug: "soul-breeze",
        no: "05",
        title: "Soul Breeze Beach Resort",
        client: "Soul Breeze Beach Resort / Topspin Estate",
        category: "Hospitality / Web + Inventory",
        type: "Hotel website + inventory system",
        year: "2022",
        role: "Full-stack engineering",
        summary:
            "Booking-focused resort website paired with an internal inventory and cost tracking system.",
        problem:
            "The resort depended on phone and walk-in bookings, and stores were counted manually, so stock levels and wastage were only known after the fact.",
        approach: [
            "Rebuilt the site with Next.js around the booking path, with SEO work on the pages that drive enquiries.",
            "Built inventory management with real-time stock visibility for the stores team.",
            "Added cost tracking and wastage reporting against stock movements.",
        ],
        decisions: [
            "Every page was designed around the booking action rather than treating it as one more menu item.",
            "Wastage is recorded as a stock movement type, so it reports without a separate process.",
        ],
        technologies: ["Next.js", "React", "Node.js", "SEO", "REST APIs"],
        outcomes: ["50% increase in online bookings.", "Real-time stock visibility with cost and wastage reporting."],
        flow: ["Website", "Booking", "Operations", "Inventory", "Cost & wastage report"],
        featured: true,
        span: "lg:col-span-7",
    },
    {
        slug: "fundi-kipusa",
        no: "06",
        title: "Fundi Kipusa CBO",
        client: "Fundi Kipusa CBO",
        category: "NGO / Web",
        type: "Website redesign + digital growth",
        year: "2021",
        role: "Front-end engineering",
        summary: "Accessibility-first redesign of a community organisation's website and donation path.",
        problem:
            "The existing site was hard to use on low-end devices and slow connections, and the donation path was buried.",
        approach: [
            "Rebuilt the front end with accessibility as the starting constraint, not a later audit.",
            "Restructured content and improved SEO so the organisation could be found.",
            "Brought the donation action forward into the main flow of the site.",
        ],
        decisions: [
            "Designed for the slowest realistic device and connection first.",
            "Kept the donation path to the fewest possible steps.",
        ],
        technologies: ["React", "Accessibility", "SEO", "Responsive engineering"],
        outcomes: ["2\u00d7 increase in online donations."],
        flow: ["Visitor", "Content", "Donation path", "Confirmation"],
        featured: true,
        span: "lg:col-span-5",
    },
];

export const experience = [
    {
        role: "Technical Lead & Senior Zoho Developer",
        company: "Finlanza Ltd",
        location: "Nairobi, Kenya",
        start: "Aug 2024",
        end: "Present",
        kind: "Employment",
        description:
            "Lead technical delivery of CRM architecture, business automation and integration work from requirements through handover.",
        achievements: [
            "Architect multi-stage CRM pipelines, approval systems and operational automation.",
            "Own implementation, QA, deployment, client handover and technical training.",
            "Build API integrations between CRM, finance platforms and third-party systems.",
        ],
    },
    {
        role: "Full-Stack Software Engineer",
        company: "Topspin Estate Ltd",
        location: "Nairobi, Kenya",
        start: "Jul 2021",
        end: "Jul 2023",
        kind: "Employment",
        description:
            "Built web applications and internal operational systems across hospitality and estate operations.",
        achievements: [
            "Delivered the Soul Breeze booking-focused website and inventory system.",
            "Worked across front end, server logic and data models on the same products.",
        ],
    },
    {
        role: "Front-End Web Developer",
        company: "Fundi Kipusa CBO",
        location: "Nairobi, Kenya",
        start: "Apr 2020",
        end: "Jul 2021",
        kind: "Employment",
        description: "Front-end engineering and accessibility-focused redesign work for a community organisation.",
        achievements: ["Redesigned the website around accessibility and the donation path."],
    },
    {
        role: "Software Developer",
        company: "Hoster Design Lab",
        location: "Nairobi, Kenya",
        start: "Jan 2018",
        end: "Feb 2020",
        kind: "Employment",
        description: "Application development across client web work.",
        achievements: ["Built and shipped client applications end to end."],
    },
];

export const engagements = [
    { client: "Wavemark Properties", work: "Real estate sales CRM + biometric attendance", year: "2024" },
    { client: "Soil Merchants Kenya", work: "Sales pipeline automation", year: "2024" },
    { client: "Tingashare Limited", work: "Fleet & project management systems", year: "2023" },
    { client: "Solidaridad East & Central Africa", work: "Procurement & expense management", year: "2023" },
];

export const stack = [
    { category: "Languages", items: ["JavaScript", "TypeScript", "Go", "Python", "Deluge"] },
    { category: "Front-end", items: ["React", "Next.js", "Tailwind CSS", "ShadCN UI", "SASS"] },
    { category: "Back-end", items: ["Node.js", "NestJS", "Express", "REST APIs"] },
    { category: "Databases", items: ["PostgreSQL", "MongoDB", "MySQL", "Supabase", "Prisma"] },
    { category: "Cloud / DevOps", items: ["AWS", "Google Cloud", "Vercel", "CI/CD", "Docker"] },
    {
        category: "Integrations",
        items: ["Zoho CRM", "Zoho Books", "Zoho Expense", "Zoho Creator", "QuickBooks", "Xero", "Stripe", "PayPal"],
    },
    { category: "Hardware", items: ["ZKTeco ZK9500"] },
];

export const principles = [
    {
        no: "01",
        text: "Build for the workflow, not just the UI",
        note: "The interface is the last mile of a process that already exists in the business.",
    },
    {
        no: "02",
        text: "Good architecture reduces operational friction",
        note: "If the system needs constant human reconciliation, the design is wrong.",
    },
    {
        no: "03",
        text: "Integrations should be treated as products",
        note: "Auth, failure states and reconciliation deserve the same care as a user-facing feature.",
    },
    {
        no: "04",
        text: "Automation should remove repetitive work",
        note: "Automate the step someone does fifty times, not the one they do once.",
    },
    {
        no: "05",
        text: "Software should make business processes visible",
        note: "State that only lives in someone's head is state you cannot report on.",
    },
    { no: "06", text: "Clarity beats complexity", note: "The system a team can operate is the system that survives." },
];

export const architecture = [
    { label: "User", note: "Sales, operations, finance" },
    { label: "Web application", note: "React / Next.js interfaces" },
    { label: "API / business logic", note: "Node, NestJS, Deluge functions" },
    { label: "Database", note: "PostgreSQL, MongoDB, platform data stores" },
    { label: "Third-party services", note: "Zoho Books, QuickBooks, Xero, payments" },
    { label: "Automation", note: "Blueprints, workflows, scheduled jobs" },
    { label: "Reporting / operations", note: "KPI dashboards and operational views" },
];

export const posts = [
    {
        no: "01",
        category: "Technical note",
        title: "A Deep Dive into Event Emitters in Node.js",
        date: "Oct 03, 2024",
        readTime: "10 min read",
    },
    {
        no: "02",
        category: "Zoho",
        title: "How to Use Zoho Marketing Automation to Boost Your Email Campaigns",
        date: "Sep 18, 2024",
        readTime: "5 min read",
    },
    {
        no: "03",
        category: "Tutorial",
        title: "Building Secure Forms in Next.js",
        date: "Mar 21, 2024",
        readTime: "10 min read",
    },
];

export const industries = [
    "Real estate",
    "Construction",
    "Hospitality",
    "NGOs",
    "E-commerce",
    "Financial workflows",
    "Business operations",
];

export const nav = [
    { to: "/work", label: "Work" },
    { to: "/about", label: "About" },
    { to: "/blog", label: "Writing" },
    { to: "/contact", label: "Contact" },
] as const;

/* ------------------------------------------------------------------
 * Engineering work (GitHub repositories).
 * Kept deliberately separate from the CV-backed professional case
 * studies above. Nothing here is described as production or commercial
 * unless the repository itself documents it.
 * ------------------------------------------------------------------ */

export type Verification = "verified" | "needs-review";
export type PublishState = "published" | "draft" | "archived";

export type EngineeringProject = {
    slug: string;
    no: string;
    title: string;
    category: string;
    categories: string[];
    statusLabel: string;
    provenance: string;
    summary: string;
    detail?: string;
    features?: string[];
    technologies: string[];
    flow: string[];
    github: string;
    live?: string;
    featured: boolean;
    featuredOrder: number;
    currentBuild: boolean;
    verification: Verification;
    state: PublishState;
    span: string;
};

export const engineeringProjects: EngineeringProject[] = [
    {
        slug: "kijani-atelier",
        no: "E1",
        title: "Kijani Atelier",
        category: "E-commerce / Full-Stack Systems",
        categories: ["Full-Stack", "E-Commerce", "Personal Builds"],
        statusLabel: "Current build",
        provenance: "Personal project",
        summary:
            "Full-stack e-commerce system exploring a modern TanStack + Laravel architecture for a Kenyan artisan brand.",
        detail:
            "The repository documents a React 19 / TanStack Start frontend running on mock data behind an API abstraction prepared for the Laravel backend. It is an active build, not a deployed commerce platform.",
        features: [
            "Product catalogue, search and filters",
            "Product detail, cart and wishlist",
            "Checkout and order confirmation",
            "Authentication",
            "Theme switching",
            "Customer support chat",
            "Mock admin area",
            "API abstraction ready for the Laravel backend",
        ],
        technologies: [
            "TanStack Start",
            "React 19",
            "TanStack Router",
            "TanStack Query",
            "TypeScript",
            "Tailwind CSS v4",
            "shadcn/ui",
            "Laravel",
            "PostgreSQL",
            "Sanctum",
            "Docker",
            "Vite",
        ],
        flow: ["Catalogue", "Cart", "Checkout", "API layer", "Laravel", "PostgreSQL"],
        github: "https://github.com/mcwachira/kijani-atelier",
        live: "https://kijani-atelier.vercel.app/",
        featured: true,
        featuredOrder: 1,
        currentBuild: true,
        verification: "verified",
        state: "published",
        span: "lg:col-span-7",
    },
    {
        slug: "soko-os",
        no: "E2",
        title: "Soko-OS",
        category: "Business Software / POS",
        categories: ["Business Systems", "Full-Stack", "Personal Builds"],
        statusLabel: "Current build",
        provenance: "Personal project",
        summary:
            "An active engineering project exploring an African-focused business operating system, with Soko POS as its first major application.",
        detail:
            "The repository's first milestone is a Docker-first local development platform: apps/web, apps/backend, shared packages, infrastructure, docs and tests. It is an engineering project, not a launched commercial platform.",
        features: [
            "Monorepo with web, backend and shared packages",
            "Docker-first local development platform",
            "Offline-capable data layer with Dexie",
            "Testing and documentation infrastructure",
        ],
        technologies: [
            "Next.js 15",
            "TanStack Query",
            "Dexie",
            "Laravel",
            "PHP",
            "PostgreSQL",
            "Redis",
            "Nginx",
            "Docker Compose",
            "TypeScript",
        ],
        flow: ["POS client", "Offline store", "API", "PostgreSQL", "Redis", "Infrastructure"],
        github: "https://github.com/mcwachira/soko-os",
        featured: true,
        featuredOrder: 2,
        currentBuild: true,
        verification: "verified",
        state: "published",
        span: "lg:col-span-5",
    },
    {
        slug: "payrollfiti",
        no: "E3",
        title: "PayrollFiti",
        category: "Payroll / Business Systems",
        categories: ["Business Systems", "Full-Stack", "Personal Builds"],
        statusLabel: "Current build",
        provenance: "Personal project",
        summary:
            "Payroll and employee-management system currently being developed as a full-stack business application.",
        detail:
            "Repository description: a payroll and employee management system built using Next.js, PHP and Laravel. No compliance, statutory or production-processing claims are made.",
        technologies: ["Next.js", "Laravel", "PHP", "Turborepo", "Docker", "TypeScript"],
        flow: ["Employees", "Payroll run", "API", "Laravel", "Database"],
        github: "https://github.com/mcwachira/payrollfiti",
        featured: true,
        featuredOrder: 3,
        currentBuild: true,
        verification: "verified",
        state: "published",
        span: "lg:col-span-6",
    },
    {
        slug: "kelvin-murimi-website",
        no: "E4",
        title: "Kelvin Murimi — Portfolio & Field Notes",
        category: "Portfolio / CMS / Content Platform",
        categories: ["CMS / Content", "Full-Stack", "Client Work"],
        statusLabel: "Repository",
        provenance: "Client project",
        summary:
            "Portfolio and content platform built with Sanity, TanStack Start and a private editorial dashboard.",
        detail:
            "A personal site and content platform with a private CMS dashboard covering drafts, scheduled posts, media uploads, image alt text and a contact inbox.",
        features: [
            "Portfolio, experience timeline, skills and case studies",
            "Blog with drafts and scheduled posts",
            "Private CMS dashboard and contact inbox",
            "Media uploads with alt text",
            "SEO: canonical URLs, Open Graph, Twitter cards, JSON-LD, sitemap, robots.txt",
            "Light and dark mode",
        ],
        technologies: [
            "TanStack Start",
            "React 19",
            "TanStack Router",
            "TanStack Query",
            "TypeScript",
            "Sanity",
            "Portable Text",
            "GROQ",
            "Better Auth",
            "PostgreSQL",
            "Prisma",
            "Vite",
            "GitHub Actions",
        ],
        flow: ["Sanity", "GROQ", "TanStack Start", "Editorial dashboard", "Published site"],
        github: "https://github.com/mcwachira/kelvin-murimi-website",
        featured: true,
        featuredOrder: 4,
        currentBuild: false,
        verification: "verified",
        state: "published",
        span: "lg:col-span-6",
    },
    {
        slug: "silverline-brilliance",
        no: "E5",
        title: "Silverline Brilliance",
        category: "Admin Dashboard / Business Management",
        categories: ["Business Systems", "CMS / Content", "Client Work"],
        statusLabel: "Repository",
        provenance: "Client project",
        summary:
            "Admin dashboard for an audiovisual services company, covering bookings, content and operational settings.",
        detail:
            "The repository documents an administrative system with authentication, booking management and status tracking, blog management, a media library, email templates and PDF generation.",
        features: [
            "Authentication and dashboard overview",
            "Booking management with status tracking",
            "Blog management and media library",
            "Email templates and email integration",
            "PDF generation",
            "Responsive layouts and real-time updates",
        ],
        technologies: [
            "Next.js 14",
            "App Router",
            "Supabase",
            "PostgreSQL",
            "Sanity",
            "Tailwind CSS",
            "shadcn/ui",
            "Radix UI",
            "React Hook Form",
            "Zod",
            "Tiptap",
            "Nodemailer",
            "jsPDF",
        ],
        flow: ["Auth", "Dashboard", "Bookings", "Supabase", "Email / PDF"],
        github: "https://github.com/mcwachira/silverline-brilliance",
        featured: true,
        featuredOrder: 5,
        currentBuild: false,
        verification: "verified",
        state: "published",
        span: "lg:col-span-7",
    },
    {
        slug: "maua-ke",
        no: "E6",
        title: "Maua.ke",
        category: "E-commerce / Full-Stack",
        categories: ["E-Commerce", "Full-Stack", "Personal Builds"],
        statusLabel: "Repository",
        provenance: "Personal project",
        summary: "Full-stack e-commerce application for flowers and care packages.",
        technologies: ["Next.js", "Laravel", "PHP", "TypeScript", "Turborepo"],
        flow: ["Storefront", "API", "Laravel", "Database"],
        github: "https://github.com/mcwachira/maua.ke",
        live: "https://maua-ke-inky.vercel.app/",
        featured: true,
        featuredOrder: 6,
        currentBuild: false,
        verification: "verified",
        state: "published",
        span: "lg:col-span-5",
    },
    {
        slug: "endrax-care-hub",
        no: "E7",
        title: "Endrax Care Hub",
        category: "E-commerce / Healthcare Commerce",
        categories: ["E-Commerce", "Full-Stack", "Personal Builds"],
        statusLabel: "Repository",
        provenance: "Personal project",
        summary:
            "Full-stack e-commerce application exploring an online medicine and healthcare-commerce experience.",
        technologies: ["Next.js", "Laravel", "PHP", "Turborepo", "Docker"],
        flow: ["Catalogue", "Cart", "API", "Laravel", "Database"],
        github: "https://github.com/mcwachira/endrax-care-hub",
        featured: false,
        featuredOrder: 7,
        currentBuild: false,
        verification: "verified",
        state: "published",
        span: "lg:col-span-6",
    },
    {
        slug: "kenya-trek-adventures",
        no: "E8",
        title: "Kenya Trek Adventures",
        category: "Travel / Content Platform",
        categories: ["CMS / Content", "Full-Stack", "Personal Builds"],
        statusLabel: "Repository",
        provenance: "Personal project",
        summary: "Tour and expedition website combining Next.js with Sanity-powered content management.",
        technologies: ["Next.js", "Sanity", "Express", "TypeScript", "Turborepo", "Docker"],
        flow: ["Sanity", "Content API", "Next.js", "Website"],
        github: "https://github.com/mcwachira/kenya-trek-adventures",
        live: "https://kenya-trek-adventures.vercel.app/",
        featured: false,
        featuredOrder: 8,
        currentBuild: false,
        verification: "verified",
        state: "published",
        span: "lg:col-span-6",
    },
    {
        slug: "swift-invoice",
        no: "E9",
        title: "Swift Invoice",
        category: "Invoices / Business Software",
        categories: ["Business Systems", "Personal Builds"],
        statusLabel: "Unverified",
        provenance: "Personal project",
        summary: "Invoicing project. Repository contents not yet verified, so nothing further is claimed.",
        technologies: [],
        flow: [],
        github: "https://github.com/mcwachira/swift-invoice",
        featured: false,
        featuredOrder: 9,
        currentBuild: false,
        verification: "needs-review",
        state: "draft",
        span: "lg:col-span-6",
    },
    {
        slug: "campaign-fiti",
        no: "E10",
        title: "Campaign Fiti",
        category: "Campaign / Web Application",
        categories: ["Full-Stack", "Personal Builds"],
        statusLabel: "Unverified",
        provenance: "Personal project",
        summary: "Campaign project. Repository contents not yet verified, so nothing further is claimed.",
        technologies: [],
        flow: [],
        github: "https://github.com/mcwachira/campaign-fiti",
        featured: false,
        featuredOrder: 10,
        currentBuild: false,
        verification: "needs-review",
        state: "draft",
        span: "lg:col-span-6",
    },
];

export const publishedEngineering = engineeringProjects.filter((p) => p.state === "published");

export const projectFilters = [
    "All",
    "Featured",
    "Full-Stack",
    "Business Systems",
    "E-Commerce",
    "CMS / Content",
    "CRM / Automation",
    "Client Work",
    "Personal Builds",
] as const;

/* Skills, with an honest level and the evidence behind each one. */
export type SkillLevel = "primary" | "strong" | "working" | "project-demonstrated" | "familiar";

export const skills: {
    group: string;
    items: { name: string; level: SkillLevel; evidence: string }[];
}[] = [
    {
        group: "Languages",
        items: [
            { name: "TypeScript", level: "primary", evidence: "Work" },
            { name: "JavaScript", level: "primary", evidence: "Work" },
            { name: "Deluge", level: "primary", evidence: "Work" },
            { name: "PHP", level: "project-demonstrated", evidence: "GitHub" },
            { name: "Python", level: "working", evidence: "Client project" },
            { name: "Go", level: "working", evidence: "CV" },
        ],
    },
    {
        group: "Front-end",
        items: [
            { name: "React", level: "primary", evidence: "Work" },
            { name: "Next.js", level: "primary", evidence: "Work" },
            { name: "TanStack Start", level: "project-demonstrated", evidence: "GitHub" },
            { name: "TanStack Router", level: "project-demonstrated", evidence: "GitHub" },
            { name: "TanStack Query", level: "strong", evidence: "GitHub" },
            { name: "Tailwind CSS", level: "primary", evidence: "Work" },
            { name: "shadcn/ui", level: "strong", evidence: "GitHub" },
            { name: "SASS", level: "working", evidence: "CV" },
        ],
    },
    {
        group: "Back-end",
        items: [
            { name: "Node.js", level: "primary", evidence: "Work" },
            { name: "Express.js", level: "strong", evidence: "CV" },
            { name: "NestJS", level: "working", evidence: "CV" },
            { name: "Laravel", level: "project-demonstrated", evidence: "GitHub" },
            { name: "REST API design", level: "primary", evidence: "Work" },
            { name: "JWT authentication", level: "strong", evidence: "CV" },
        ],
    },
    {
        group: "Databases",
        items: [
            { name: "PostgreSQL", level: "strong", evidence: "GitHub" },
            { name: "MongoDB", level: "working", evidence: "CV" },
            { name: "MySQL", level: "working", evidence: "CV" },
            { name: "Supabase", level: "project-demonstrated", evidence: "GitHub" },
            { name: "Prisma", level: "project-demonstrated", evidence: "GitHub" },
        ],
    },
    {
        group: "Cloud / DevOps",
        items: [
            { name: "Docker", level: "project-demonstrated", evidence: "GitHub" },
            { name: "Vercel", level: "strong", evidence: "GitHub" },
            { name: "GitHub Actions", level: "project-demonstrated", evidence: "GitHub" },
            { name: "CI/CD", level: "working", evidence: "CV" },
            { name: "Nginx", level: "project-demonstrated", evidence: "GitHub" },
            { name: "Redis", level: "project-demonstrated", evidence: "GitHub" },
            { name: "AWS", level: "working", evidence: "CV" },
            { name: "Google Cloud", level: "familiar", evidence: "CV" },
        ],
    },
    {
        group: "Integrations",
        items: [
            { name: "Zoho CRM", level: "primary", evidence: "Work" },
            { name: "Zoho Books", level: "primary", evidence: "Work" },
            { name: "Zoho Creator", level: "primary", evidence: "Work" },
            { name: "Zoho Expense", level: "strong", evidence: "Work" },
            { name: "QuickBooks", level: "strong", evidence: "Work" },
            { name: "Xero", level: "strong", evidence: "Work" },
            { name: "OAuth 2.0", level: "strong", evidence: "Work" },
            { name: "Stripe", level: "working", evidence: "CV" },
            { name: "PayPal", level: "working", evidence: "CV" },
        ],
    },
    {
        group: "Business systems",
        items: [
            { name: "CRM architecture", level: "primary", evidence: "Work" },
            { name: "Workflow automation", level: "primary", evidence: "Work" },
            { name: "Approval workflows", level: "primary", evidence: "Work" },
            { name: "Procurement systems", level: "strong", evidence: "Client project" },
            { name: "Fleet systems", level: "strong", evidence: "Client project" },
            { name: "Inventory systems", level: "strong", evidence: "Client project" },
            { name: "Payroll systems", level: "project-demonstrated", evidence: "GitHub" },
            { name: "POS", level: "project-demonstrated", evidence: "GitHub" },
        ],
    },
    {
        group: "Hardware / IoT",
        items: [
            { name: "ZKTeco ZK9500", level: "project-demonstrated", evidence: "Client project" },
            { name: "Biometric attendance", level: "project-demonstrated", evidence: "Client project" },
        ],
    },
];
