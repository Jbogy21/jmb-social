// Central, editable content for the JMB Social website.
// Update copy, prices, links and projects here — components read from this file.

export const siteConfig = {
  name: "JMB Social",
  shortName: "JMB",
  descriptor: "Creative & Growth Studio",
  // Switch this to the custom domain once it is registered and connected.
  url: "https://jmb-social.vercel.app",
  email: "JMBSocial0@gmail.com",
  location: "UK",
  phone: "07847 743022",
  phoneHref: "tel:+447847743022",
  whatsappHref:
    "https://wa.me/447847743022?text=Hi%20JMB%20Social%2C%20I%27d%20like%20to%20talk%20about%20a%20project.",
  foundedYear: "2026",
  description:
    "JMB Social is a founder-led studio building websites, short-form video and ads for independent local businesses, and content and portfolios for emerging models, artists and athletes.",
  heroDescription:
    "I'm Jackson. I make websites, short-form video and ads for local businesses, and content for people building a name in fashion, music and sport.",
  social: {
    instagram: "https://www.instagram.com/jmb_social/",
    linkedin: "https://www.linkedin.com/in/jackson-booker-214874427",
  },
};

export const navLinks = [
  { label: "Local business", href: "/local-business" },
  { label: "Creative", href: "/creative" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/* -------------------------------------------------------------------------- */
/*  Services                                                                  */
/* -------------------------------------------------------------------------- */

export type Cadence = "project" | "month" | "pack";

export const cadenceLabel: Record<Cadence, string> = {
  project: "one-off",
  month: "per month",
  pack: "per pack",
};

export type ServiceVariant = {
  name: string;
  description: string;
  price: string;
  cadence: Cadence;
};

export type ServiceFamily = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  tagline: string;
  summary: string;
  note?: string;
  variants: ServiceVariant[];
};

export const serviceFamilies: ServiceFamily[] = [
  {
    slug: "web",
    number: "01",
    title: "Web design & development",
    shortTitle: "Websites",
    tagline: "Websites engineered to rank, load fast and convert.",
    summary:
      "Strategy-led design and production-grade development. Every build is mobile-first, accessible, SEO-ready and measured against Core Web Vitals, so the site works as a sales asset rather than a brochure.",
    variants: [
      {
        name: "Business website",
        description:
          "Five to ten bespoke pages with a clear conversion path, CMS handover, analytics and technical SEO built in.",
        price: "£450",
        cadence: "project",
      },
      {
        name: "Bespoke brand website",
        description:
          "A fully custom design system with considered motion and interaction, built to feel as premium as the business behind it.",
        price: "£750",
        cadence: "project",
      },
      {
        name: "Website redesign",
        description:
          "Audit, UX restructure and an SEO-safe migration with every redirect mapped, so rankings carry over and conversion rises.",
        price: "£350",
        cadence: "project",
      },
      {
        name: "E-commerce",
        description:
          "Shopify or custom storefronts with considered product pages, checkout optimisation and full purchase tracking.",
        price: "£750",
        cadence: "project",
      },
      {
        name: "Landing pages & funnels",
        description:
          "High-intent pages built for campaigns, structured for A/B testing with every conversion tracked.",
        price: "£200",
        cadence: "project",
      },
      {
        name: "Performance & technical SEO",
        description:
          "Core Web Vitals remediation, schema markup, indexation and crawl fixes for sites that already exist.",
        price: "£120",
        cadence: "project",
      },
      {
        name: "Website care plan",
        description:
          "Managed hosting, security updates, uptime monitoring and a monthly improvement hour.",
        price: "£25",
        cadence: "month",
      },
    ],
  },
  {
    slug: "apps",
    number: "02",
    title: "App & platform development",
    shortTitle: "Apps",
    tagline: "From validated idea to shipped product.",
    summary:
      "Product design and full-stack engineering for mobile apps, web platforms and internal tools. Work is scoped in phases, so you launch an MVP, learn from real usage, then scale with confidence.",
    variants: [
      {
        name: "Mobile app (iOS & Android)",
        description:
          "Cross-platform builds with native-feel UX, authentication, push notifications and app-store submission.",
        price: "£500–£1,000",
        cadence: "project",
      },
      {
        name: "Web app & SaaS platform",
        description:
          "Multi-user platforms with billing, role-based access, dashboards and an API-first architecture.",
        price: "£750",
        cadence: "project",
      },
      {
        name: "Client portals & internal tools",
        description:
          "Secure portals and admin systems that replace spreadsheets and manual back-and-forth.",
        price: "£450",
        cadence: "project",
      },
      {
        name: "Booking & membership systems",
        description:
          "Scheduling, payments and member management shaped around how your business actually runs.",
        price: "£400",
        cadence: "project",
      },
      {
        name: "Integrations & APIs",
        description:
          "Connect your CRM, payments, accounting and marketing stack into one reliable flow of data.",
        price: "£150",
        cadence: "project",
      },
      {
        name: "Product design & prototyping",
        description:
          "User flows and clickable Figma prototypes to validate the idea with real users before you build.",
        price: "£250",
        cadence: "project",
      },
      {
        name: "Product support retainer",
        description:
          "Monitoring, bug fixes, dependency updates and iterative releases after launch.",
        price: "£50",
        cadence: "month",
      },
    ],
  },
  {
    slug: "ai",
    number: "03",
    title: "AI agents & automation",
    shortTitle: "AI agents",
    tagline: "Agents that do real work inside your business.",
    summary:
      "Custom AI agents and automations designed around your workflows. Grounded in your own data, wired into your tools, and built with guardrails and human-in-the-loop review wherever it matters.",
    note: "Model and API usage is billed at cost and capped with usage limits you control.",
    variants: [
      {
        name: "Customer support agent",
        description:
          "A retrieval-grounded assistant trained on your content that answers questions on your site, WhatsApp or email, with clean hand-off to a human.",
        price: "£350",
        cadence: "project",
      },
      {
        name: "Lead qualification & booking agent",
        description:
          "Engages inbound enquiries, qualifies them against your criteria and books calls straight into your calendar and CRM.",
        price: "£450",
        cadence: "project",
      },
      {
        name: "Workflow automation",
        description:
          "Remove repetitive admin by connecting your tools with robust, monitored automations built in n8n, Make or custom code.",
        price: "£200",
        cadence: "project",
      },
      {
        name: "Custom multi-step agents",
        description:
          "Tool-using agents that research, draft, decide and act across your systems, evaluated and monitored in production.",
        price: "£750",
        cadence: "project",
      },
      {
        name: "AI voice agents",
        description:
          "Natural-sounding phone agents that answer calls, capture the details and route or book on your behalf.",
        price: "£600",
        cadence: "project",
      },
      {
        name: "AI content & marketing automation",
        description:
          "Repeatable pipelines for briefs, copy, reporting and personalised outreach, with brand-safe review steps.",
        price: "£300",
        cadence: "project",
      },
      {
        name: "AI audit & roadmap",
        description:
          "A focused workshop that maps your processes, ranks the highest-return automations and hands you a costed plan.",
        price: "£100",
        cadence: "project",
      },
    ],
  },
  {
    slug: "ads",
    number: "04",
    title: "Paid media management",
    shortTitle: "Ad management",
    tagline: "Ad spend with a strategy, a testing cadence and honest reporting.",
    summary:
      "Account architecture, audience and creative testing, conversion tracking and weekly optimisation across Meta and Google, reported against revenue and cost per acquisition rather than vanity metrics.",
    note: "Ad spend is paid directly to the platforms by you. Fees cover strategy, build, management and reporting. A minimum of £300 per month in ad spend is recommended.",
    variants: [
      {
        name: "Meta Ads (Facebook & Instagram)",
        description:
          "Full-funnel structure from prospecting to retargeting, with Conversions API tracking and structured creative testing.",
        price: "£200",
        cadence: "month",
      },
      {
        name: "Google Ads",
        description:
          "Search, Performance Max and Shopping campaigns built on intent, with negative-keyword discipline and tight budget control.",
        price: "£200",
        cadence: "month",
      },
      {
        name: "TikTok & LinkedIn Ads",
        description:
          "Platform-native campaigns for audiences those channels reach better than anywhere else.",
        price: "£225",
        cadence: "month",
      },
      {
        name: "Full-funnel growth programme",
        description:
          "Meta and Google managed together under a single measurement plan, with a monthly strategy call.",
        price: "£350",
        cadence: "month",
      },
      {
        name: "Ad account audit",
        description:
          "A line-by-line review of structure, spend, tracking and creative, with a prioritised fix list.",
        price: "£60",
        cadence: "project",
      },
      {
        name: "Tracking & attribution setup",
        description:
          "GA4, Tag Manager, Meta Pixel with Conversions API and server-side tracking, so every pound is attributable.",
        price: "£100",
        cadence: "project",
      },
    ],
  },
  {
    slug: "creative",
    number: "05",
    title: "Ad creative & brand design",
    shortTitle: "Ad design & brand",
    tagline: "Design that earns attention and carries the brand.",
    summary:
      "Identity systems and performance creative produced together, so what you run in ads, on social and on your site reads as one unmistakable brand.",
    variants: [
      {
        name: "Ad creative packs",
        description:
          "Static, carousel and short-form motion ads produced in testable variants against a clear creative hypothesis.",
        price: "£80",
        cadence: "pack",
      },
      {
        name: "Short-form video ads",
        description:
          "Edit, motion and captions for Reels, TikTok and Shorts, cut to land the hook inside the first second.",
        price: "£100",
        cadence: "pack",
      },
      {
        name: "Brand identity",
        description:
          "Strategy, logo, colour, typography, voice and a guidelines document you can hand to anyone.",
        price: "£350",
        cadence: "project",
      },
      {
        name: "Brand refresh",
        description:
          "Modernise an existing identity without losing the recognition you have already earned.",
        price: "£200",
        cadence: "project",
      },
      {
        name: "Social design systems",
        description:
          "Templates and visual rules your team, or ours, can reuse to keep every post on brand.",
        price: "£150",
        cadence: "project",
      },
      {
        name: "Campaign & launch design",
        description:
          "Complete creative kits for launches and seasonal campaigns across every placement.",
        price: "£250",
        cadence: "project",
      },
      {
        name: "Pitch decks & collateral",
        description:
          "Investor, sales and print collateral designed to land the message and the decision.",
        price: "£150",
        cadence: "project",
      },
    ],
  },
  {
    slug: "social",
    number: "06",
    title: "Social media management",
    shortTitle: "Social",
    tagline: "A consistent, on-brand presence without it taking over your week.",
    summary:
      "Strategy, content planning, copywriting, publishing and community management across the channels your customers use, with monthly reporting tied to business outcomes.",
    variants: [
      {
        name: "Social media management",
        description:
          "Strategy, content calendar, copy, design, scheduling and reporting for up to three channels.",
        price: "£200",
        cadence: "month",
      },
      {
        name: "Short-form content engine",
        description:
          "A recurring batch of Reels, TikToks and Shorts, planned, edited and published for you.",
        price: "£250",
        cadence: "month",
      },
      {
        name: "Community management",
        description:
          "Comments, replies and DMs handled in your brand voice, with clear rules for escalation.",
        price: "£100",
        cadence: "month",
      },
      {
        name: "Social strategy & audit",
        description:
          "Audience, competitor and content analysis ending in a clear 90-day plan.",
        price: "£100",
        cadence: "project",
      },
    ],
  },
  {
    slug: "growth",
    number: "07",
    title: "SEO, analytics & conversion",
    shortTitle: "SEO & analytics",
    tagline: "Find out what works, then do more of it.",
    summary:
      "The measurement and optimisation layer that makes everything else pay back: search visibility, clean data and structured experimentation.",
    variants: [
      {
        name: "SEO programme",
        description:
          "Technical, on-page and content SEO focused on commercially valuable queries and local visibility.",
        price: "£150",
        cadence: "month",
      },
      {
        name: "Conversion rate optimisation",
        description:
          "Research, heuristic review and a prioritised sprint of tested improvements to your key pages.",
        price: "£200",
        cadence: "project",
      },
      {
        name: "Analytics & reporting dashboards",
        description:
          "GA4 and Looker Studio dashboards that show what is working, in plain language.",
        price: "£100",
        cadence: "project",
      },
      {
        name: "Email & CRM automation",
        description:
          "Lifecycle flows in Klaviyo, Mailchimp or HubSpot: welcome, abandonment, nurture and win-back.",
        price: "£200",
        cadence: "project",
      },
      {
        name: "Digital growth audit",
        description:
          "A cross-channel review of site, funnel, ads and tracking, ending in a 90-day roadmap.",
        price: "£75",
        cadence: "project",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Services page structure: three pillars plus bigger builds on request      */
/* -------------------------------------------------------------------------- */

export type ServicePillar = {
  slug: string;
  number: string;
  title: string;
  tagline: string;
  summary: string;
  note?: string;
  aliases?: string[];
  headline: string[];
  more: string[];
};

// Options are looked up by name from serviceFamilies, so prices live in one place.
export const servicePillars: ServicePillar[] = [
  {
    slug: "web",
    number: "01",
    title: "Websites",
    tagline: "Websites built to be found, trusted and contacted.",
    summary:
      "Strategy-led design and clean development. Every build is mobile-first, accessible, SEO-ready and fast, so the site works as a sales asset rather than a brochure.",
    aliases: ["growth"],
    headline: ["Business website", "Website redesign", "Landing pages & funnels", "E-commerce"],
    more: [
      "Bespoke brand website",
      "Performance & technical SEO",
      "Website care plan",
      "SEO programme",
      "Conversion rate optimisation",
      "Analytics & reporting dashboards",
      "Digital growth audit",
    ],
  },
  {
    slug: "social",
    number: "02",
    title: "Content & social",
    tagline: "Short-form content that gets seen, posted consistently.",
    summary:
      "Reels, TikToks and posts planned, shot, edited and published for you, with a consistent voice and a plan behind every post.",
    headline: [
      "Social media management",
      "Short-form content engine",
      "Short-form video ads",
      "Community management",
    ],
    more: ["Social strategy & audit", "Social design systems", "Email & CRM automation"],
  },
  {
    slug: "ads",
    number: "03",
    title: "Ads & brand",
    tagline: "Ads and identity that look the part and are built to be tested.",
    summary:
      "Account setup, creative testing and honest reporting across Meta and Google, with ad creative and brand design produced alongside so everything matches.",
    note: "Ad spend is paid directly to the platforms by you. Fees cover strategy, build, management and reporting. A minimum of £300 per month in ad spend is recommended.",
    aliases: ["creative"],
    headline: [
      "Meta Ads (Facebook & Instagram)",
      "Google Ads",
      "Ad creative packs",
      "Brand identity",
    ],
    more: [
      "TikTok & LinkedIn Ads",
      "Full-funnel growth programme",
      "Ad account audit",
      "Tracking & attribution setup",
      "Brand refresh",
      "Campaign & launch design",
      "Pitch decks & collateral",
    ],
  },
];

// Bigger builds are quoted per project rather than priced off a menu.
export const biggerBuildSlugs = ["apps", "ai"];

// Services with real proof behind them are led with on the home page.
export const coreServiceSlugs = ["web", "social", "creative"];

/* -------------------------------------------------------------------------- */
/*  Service stage (home page + Services page)                                 */
/*  One service is shown at a time, with a short list underneath.             */
/* -------------------------------------------------------------------------- */

export type StagePanel = {
  slug: string;
  number: string;
  title: string;
  blurb: string;
  items: { label: string; href: string }[];
  cta: { label: string; href: string };
  tone: "green" | "deep" | "khaki" | "signal";
  exhibit:
    | { kind: "image"; src: string; alt: string; caption: string; aspect: string }
    | { kind: "stat"; value: string; label: string }
    | { kind: "note"; label: string; text: string };
};

const pillarItems = (slug: string) =>
  (servicePillars.find((pillar) => pillar.slug === slug)?.headline ?? []).map((label) => ({
    label,
    href: `/services#${slug}`,
  }));

export const stagePanels: StagePanel[] = [
  {
    slug: "web",
    number: "01",
    title: "Websites",
    blurb: "Built to be found, trusted and called. Fast, mobile-first and clear.",
    items: pillarItems("web"),
    cta: { label: "Options & prices", href: "/services#web" },
    tone: "green",
    exhibit: {
      kind: "image",
      src: "/work/cmbooker-home.jpg",
      alt: "The C M Booker website, designed and built by JMB Social",
      caption: "C M Booker · furniture restoration",
      aspect: "16/9",
    },
  },
  {
    slug: "social",
    number: "02",
    title: "Content & social",
    blurb: "Reels, TikToks and posts planned, shot, edited and posted for you.",
    items: pillarItems("social"),
    cta: { label: "Options & prices", href: "/services#social" },
    tone: "deep",
    exhibit: {
      kind: "stat",
      value: "111.2K",
      label: "Combined views across three Reels made for a local garage",
    },
  },
  {
    slug: "ads",
    number: "03",
    title: "Ads & brand",
    blurb: "Ads set up, tested and reported on honestly, with matching creative.",
    items: pillarItems("ads"),
    cta: { label: "Options & prices", href: "/services#ads" },
    tone: "khaki",
    exhibit: {
      kind: "image",
      src: "/work/video/ad-general-poster.jpg",
      alt: "An animated ad creative made for JMB Social's own outreach",
      caption: "Ad creative · JMB Social outreach",
      aspect: "4/5",
    },
  },
  {
    slug: "creative",
    number: "04",
    title: "Fashion, music & sport",
    blurb: "Portfolio sites, content and a plan for your Instagram.",
    items: [
      { label: "Portfolio & comp-card sites", href: "/creative" },
      { label: "Lookbook & Reels", href: "/creative" },
      { label: "Release rollouts", href: "/creative" },
      { label: "Instagram setup & planning", href: "/creative" },
    ],
    cta: { label: "The creative side", href: "/creative" },
    tone: "signal",
    exhibit: {
      kind: "note",
      label: "First collaboration · In production",
      text: "A starter portfolio and an Instagram, built with an emerging model. The results go on the Creative page as they are finished.",
    },
  },
];

export type ServicePackage = {
  name: string;
  price: string;
  forWho: string;
  includes: string[];
};

// Bundled engagements: several disciplines at a lower combined rate.
export const servicePackages: ServicePackage[] = [
  {
    name: "Launch",
    price: "£750",
    forWho: "New or rebranding businesses that need to open the doors properly.",
    includes: [
      "Brand identity and guidelines",
      "Bespoke website with CMS",
      "Analytics and conversion tracking",
      "Launch campaign creative",
      "30 days of post-launch support",
    ],
  },
  {
    name: "Scale",
    price: "£1,250",
    forWho: "Established businesses ready to grow revenue from their existing audience.",
    includes: [
      "Website redesign with SEO-safe migration",
      "Conversion rate optimisation sprint",
      "Two-month full-funnel ads programme",
      "Monthly creative packs",
      "Reporting and strategy calls",
    ],
  },
  {
    name: "Automate",
    price: "£1,500",
    forWho: "Operations-heavy businesses that want time and margin back.",
    includes: [
      "AI audit and costed roadmap",
      "One or more custom AI agents",
      "Workflow automation and integrations",
      "Client portal or app MVP",
      "Monitoring and optimisation",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Founder background                                                        */
/* -------------------------------------------------------------------------- */

export const background = [
  {
    org: "JMB Social",
    role: "Founder",
    dates: "2026 to present",
    description:
      "Websites, short-form content and ad creative for independent businesses across Sussex, Surrey and London, with apps and AI agents as the next step.",
    href: "",
  },
  {
    org: "Class Agency",
    role: "Intern",
    dates: "28 July to 14 August 2026",
    description:
      "A remote and in-office placement. Built the C M Booker website and got hands-on with AI tools including Claude and ChatGPT, working inside an agency's day-to-day.",
    href: "https://class.agency/",
  },
];

/* -------------------------------------------------------------------------- */
/*  Positioning, process, FAQ                                                 */
/* -------------------------------------------------------------------------- */

export const principles = [
  {
    title: "Founder-led, end to end",
    description:
      "The person you brief is the person who designs, builds and optimises. No account-manager chain and no hand-offs lost in translation.",
  },
  {
    title: "Built to be measured",
    description:
      "Every project ships with tracking and an agreed definition of success, so progress shows up in leads, bookings and revenue.",
  },
  {
    title: "Engineered properly",
    description:
      "Clean, documented code on modern infrastructure, with performance budgets and no template lock-in. You own everything we build.",
  },
  {
    title: "One accountable partner",
    description:
      "Design, development, AI and paid media under one roof means your site, ads and automations are built to work together.",
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Discover",
    description:
      "A focused call and audit of your goals, audience, competitors and current performance.",
  },
  {
    number: "02",
    title: "Scope",
    description:
      "A clear plan, fixed scope, timeline and quote agreed before any build begins.",
  },
  {
    number: "03",
    title: "Design & build",
    description:
      "Iterative delivery with regular reviews, so you see real progress every week.",
  },
  {
    number: "04",
    title: "Launch",
    description:
      "Quality, performance and accessibility checks, tracking verified, then live.",
  },
  {
    number: "05",
    title: "Grow",
    description:
      "We measure, test and refine, through a support plan or an ongoing retainer.",
  },
];

export const faqs = [
  {
    question: "What happens after I get in touch?",
    answer:
      "You'll hear back within one to two working days, usually sooner, by WhatsApp or email. We start with a short chat about what you need and what you want to happen, then I send a written scope, timeline and price. Nothing starts until you've agreed it.",
  },
  {
    question: "What do I get from the free website review?",
    answer:
      "Send me your website (and your ad account if you run ads) and I'll reply with three specific, practical improvements you can act on, with no obligation to hire me.",
  },
  {
    question: "How much does a project cost?",
    answer:
      "A website redesign starts from £350 and a brand new business website from £450. Content and ad options have starting prices on the Services page, and apps and AI agents are quoted per project. Every quote is agreed in writing before work begins, so you know the full cost up front.",
  },
  {
    question: "How long does a website take?",
    answer:
      "A business website typically takes four to six weeks from kickoff. Bespoke and e-commerce builds take six to ten. We confirm a timeline in your scope.",
  },
  {
    question: "Do I own the website and the code?",
    answer:
      "Yes. On final payment you own the design, code and content. We build on open, portable technology so you are never locked in.",
  },
  {
    question: "Is it safe to put an AI agent in front of customers?",
    answer:
      "It is when it is designed for it. We ground agents in your approved content, set clear guardrails, hand off to a human when it matters, and test against real scenarios before launch. Conversations are logged and monitored afterwards.",
  },
  {
    question: "Who owns the ad accounts and the data?",
    answer:
      "You do. Ad spend goes straight from you to Meta or Google, and the accounts, audiences and creative stay yours if we ever stop working together.",
  },
  {
    question: "Can you work with my existing website or tools?",
    answer:
      "Yes. We regularly improve, extend or integrate with existing sites, CRMs and platforms rather than starting from scratch. A short audit tells us what is worth keeping.",
  },
  {
    question: "Do you offer support after launch?",
    answer:
      "Yes. Care plans cover hosting, security, monitoring and a monthly improvement hour, and retainers cover ongoing development, optimisation and ad management.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Work                                                                      */
/* -------------------------------------------------------------------------- */

export type ProjectCategory = "WEB" | "APP" | "AI" | "ADS" | "BRAND" | "SOCIAL";

export const categoryLabels: Record<ProjectCategory, string> = {
  WEB: "Websites",
  APP: "Apps",
  AI: "AI agents",
  ADS: "Ads",
  BRAND: "Brand",
  SOCIAL: "Social",
};

export type ProjectKind = "web" | "app" | "ai" | "ads" | "brand" | "social";

export type ProjectStatus = "client" | "studio" | "concept";

export const statusLabels: Record<ProjectStatus, string> = {
  client: "Client project",
  studio: "Studio project",
  concept: "Concept project",
};

export type ProjectVideo = {
  src: string;
  poster: string;
  title: string;
  caption?: string;
  views?: string;
  aspect: "9/16" | "4/5";
};

export type ProjectImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type ProjectMedia = {
  frame: "browser" | "stack";
  images: string[];
  url?: string;
  inset?: string;
};

export type Project = {
  slug: string;
  status: ProjectStatus;
  client: string;
  industry: string;
  title: string;
  description: string;
  categories: ProjectCategory[];
  services: string[];
  accent: "green" | "cream" | "charcoal" | "sage";
  kind: ProjectKind;
  media?: ProjectMedia;
  liveUrl?: string;
  metrics?: { value: string; label: string }[];
  metricsNote?: string;
  videos?: ProjectVideo[];
  gallery?: ProjectImage[];
  brief: string;
  approach: string;
  deliverables: string[];
  tools: string[];
};

const wheelersReels: ProjectVideo[] = [
  {
    src: "/work/video/reel-cam-belt-hq.mp4",
    poster: "/work/video/reel-cam-belt-sharp.jpg",
    title: "VW cam belt: change before 140,000 miles?",
    caption: "A worn belt, held up to the camera.",
    views: "52.6K",
    aspect: "9/16",
  },
  {
    src: "/work/video/reel-guess-the-car-hq.mp4",
    poster: "/work/video/reel-guess-the-car-sharp.jpg",
    title: "Guess the car",
    caption: "A corroded suspension arm that was caught in time.",
    views: "45.9K",
    aspect: "9/16",
  },
  {
    src: "/work/video/reel-reliable-unreliable-hq.mp4",
    poster: "/work/video/reel-reliable-unreliable-sharp.jpg",
    title: "Reliable or unreliable?",
    caption: "The mechanic sorts car brands, with no sales pitch.",
    views: "12.7K",
    aspect: "9/16",
  },
];

// Real work first, then concept projects for disciplines without a client
// engagement yet. Replace concepts with real case studies as they complete.
export const projects: Project[] = [
  {
    slug: "wheelers-autoworks",
    status: "client",
    client: "Wheelers Autoworks",
    industry: "Independent garage, Cowfold, West Sussex",
    title: "A garage website and Reels built around honest advice.",
    description:
      "A phone-first website, plus ongoing management of the garage's Instagram, TikTok and Facebook, with three Reels reaching 111.2K views between them.",
    categories: ["WEB", "SOCIAL"],
    services: ["Web design", "Web development", "Social media management", "Short-form video"],
    accent: "charcoal",
    kind: "web",
    media: {
      frame: "browser",
      images: ["/work/wheelers-home.jpg"],
      url: "wheelersautoworks.com",
    },
    liveUrl: "https://wheelersautoworks.com",
    metrics: [
      { value: "111.2K", label: "Combined views across three Reels" },
      { value: "52.6K", label: "Views on the most-watched Reel" },
    ],
    metricsNote: "View counts as shown on the platform, October 2026.",
    videos: wheelersReels,
    gallery: [
      {
        src: "/work/wheelers-home.jpg",
        width: 1600,
        height: 792,
        alt: "Wheelers Autoworks homepage with call-to-book button",
      },
      {
        src: "/work/wheelers-services.jpg",
        width: 1600,
        height: 740,
        alt: "Wheelers Autoworks services section",
      },
    ],
    brief:
      "Wheelers Autoworks wins work on trust: straight answers, clear pricing and no upselling. The brief was to carry that reputation online, giving local drivers a site that is quick to read and easy to act on, and giving the garage a way to be found beyond word of mouth.",
    approach:
      "The site is built around how customers actually book. There is no online booking, so every page leads to a call, an email or WhatsApp. A trust strip puts the garage's Google rating and its no-upselling promise above the fold, services are grouped in plain language, and real workshop photography replaces stock imagery. On social, the garage's Instagram, TikTok and Facebook are run as one ongoing content programme: regular Reels alongside educational posts and helpful tips. The Reels show the mechanic explaining real faults on real cars, from a worn cam belt to a corroded suspension arm, which suits the garage's honest-advice positioning.",
    deliverables: [
      "Website design and build",
      "Trust signals and service structure",
      "Call, email and WhatsApp conversion paths",
      "Workshop gallery and reviews",
      "Ongoing management of Instagram, TikTok and Facebook",
      "Regular Reels, educational posts and helpful tips",
    ],
    tools: [],
  },
  {
    slug: "c-m-booker",
    status: "client",
    client: "C M Booker",
    industry: "Furniture restoration, London & Surrey",
    title: "A fifty-year-old workshop, presented as the craft it is.",
    description:
      "A photo-led single-page website for a family furniture restoration and bespoke joinery workshop.",
    categories: ["WEB"],
    services: ["Web design", "Web development"],
    accent: "cream",
    kind: "web",
    media: {
      frame: "browser",
      images: ["/work/cmbooker-home.jpg"],
      url: "cmbooker.co.uk",
    },
    liveUrl: "https://www.cmbooker.co.uk",
    gallery: [
      {
        src: "/work/cmbooker-home.jpg",
        width: 1600,
        height: 900,
        alt: "C M Booker homepage with restored furniture photography",
      },
      {
        src: "/work/cmbooker-work.jpg",
        width: 1600,
        height: 808,
        alt: "C M Booker three areas of work",
      },
    ],
    brief:
      "C M Booker has restored fine furniture across London and Surrey since 1974 and still works largely by recommendation. The workshop needed a site that shows the standard of the craft immediately and makes it easy to ask for a quote.",
    approach:
      "The craft leads. Photography of restored pieces sits directly under the headline, followed by the firm's history, three clear areas of work and a gallery of recent projects. A warm italic serif and terracotta accent give the page the character of a workshop rather than a template, and a three-step 'how we work' section (send photos, talk it through, receive a written quote) lowers the barrier to a first enquiry.",
    deliverables: [
      "Single-page site design and build",
      "Photo-led hero and project gallery",
      "Three areas of work with enquiry links",
      "Quote request journey by photo and email",
      "Responsive layout",
    ],
    tools: [],
  },
  {
    slug: "beechwood-tree-care",
    status: "client",
    client: "Beechwood Tree Care & Landscaping",
    industry: "Tree care and landscaping, West Sussex",
    title: "One local team, every outdoor job, one clear route to a free quote.",
    description:
      "A website for a West Sussex tree care and landscaping business, structured around its full range of services and a call-first quote journey.",
    categories: ["WEB"],
    services: ["Web design", "Web development"],
    accent: "green",
    kind: "web",
    media: {
      frame: "browser",
      images: ["/work/beechwood-home.jpg"],
    },
    gallery: [
      {
        src: "/work/beechwood-mobile.jpg",
        width: 900,
        height: 858,
        alt: "Beechwood Tree Care mobile homepage with free quote and call buttons",
      },
      {
        src: "/work/beechwood-home.jpg",
        width: 1600,
        height: 900,
        alt: "Beechwood Tree Care homepage and services grid",
      },
      {
        src: "/work/beechwood-why.jpg",
        width: 1600,
        height: 502,
        alt: "Beechwood Tree Care reasons to choose section",
      },
    ],
    brief:
      "Beechwood covers everything from hedge cutting and tree felling to fencing, patios and turfing. Customers search for one job and often have several, so the site needed to present one team for every outdoor job.",
    approach:
      "An immersive woodland hero leads with a free quote and a one-tap call button, repeated in the mobile header. A grid of ten services makes the full range scannable at a glance, followed by customer reviews, four reasons to choose Beechwood and a three-step 'how it works' that ends in a free, no-obligation quote. Deep greens and a warm brass accent echo the brand mark.",
    deliverables: [
      "Website design and build",
      "Service grid across tree care and landscaping",
      "Free quote and call-first conversion paths",
      "Reviews and how-it-works sections",
      "Mobile-first layout",
    ],
    tools: [],
  },
  {
    slug: "jmb-social-ad-creative",
    status: "studio",
    client: "JMB Social",
    industry: "Studio outreach campaign",
    title: "Animated ads that lead with proof.",
    description:
      "Two animated 4:5 ad creatives for JMB Social's own outreach, built around real client work and a single clear call to action.",
    categories: ["ADS", "BRAND"],
    services: ["Ad creative", "Motion design", "Copywriting", "Audio"],
    accent: "sage",
    kind: "ads",
    media: {
      frame: "stack",
      images: ["/work/video/ad-general-poster.jpg", "/work/video/ad-trades-poster.jpg"],
    },
    videos: [
      {
        src: "/work/video/ad-general.mp4",
        poster: "/work/video/ad-general-poster.jpg",
        title: "General version",
        caption: "Opens on the problem every business with weak ads recognises.",
        aspect: "4/5",
      },
      {
        src: "/work/video/ad-trades.mp4",
        poster: "/work/video/ad-trades-poster.jpg",
        title: "Trades version",
        caption: "The same proof, aimed at mechanics, landscapers and tradespeople.",
        aspect: "4/5",
      },
    ],
    brief:
      "Outreach to independent businesses has to prove the work before it asks for anything. These ads open on a problem each audience recognises, show real client websites and Reels, and end with one direct action: a DM for a free ad check.",
    approach:
      "Short, kinetic type and a restrained palette keep each ad readable with the sound off. Both share one structure: hook, problem, proof, action. The trades version swaps the hook and the audience line so the same proof lands with mechanics and landscapers, which gives a clean split to test against the general version.",
    deliverables: [
      "Two 4:5 ad creatives for Instagram and Facebook",
      "Kinetic typography and motion design",
      "Proof-led storyboard using client work",
      "Audio mixed and mastered for social",
      "General and trades variants for testing",
    ],
    tools: [],
  },
  {
    slug: "jmb-social-studio-site",
    status: "studio",
    client: "JMB Social",
    industry: "Creative & Growth Studio",
    title: "Our own studio site, built the way we build for clients.",
    description:
      "A fast, statically rendered studio site with a custom design system, structured data and Git-based deployment.",
    categories: ["WEB", "BRAND"],
    services: ["Web design", "Web development", "Technical SEO", "Brand"],
    accent: "green",
    kind: "web",
    brief:
      "JMB needed a studio site that proves the standard before a client has to take it on trust: clear positioning, a credible service catalogue and a frictionless route to enquiry.",
    approach:
      "A custom type and colour system, and a data-driven content model so services, pricing and projects update from a single file. Static rendering and optimised fonts keep it fast, while a sitemap, robots file, Open Graph images and structured data handle discoverability.",
    deliverables: [
      "Positioning and information architecture",
      "Custom design system",
      "Responsive build in Next.js and Tailwind CSS",
      "Technical SEO foundations",
      "Enquiry flow and API route",
      "Git-based CI/CD on Vercel",
    ],
    tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
  },
  {
    slug: "concept-ai-front-desk",
    status: "concept",
    client: "Concept",
    industry: "Independent dental clinic",
    title: "An AI front desk that answers, qualifies and books.",
    description:
      "A retrieval-grounded enquiry and booking agent that handles patient questions around the clock and hands over to reception when it should.",
    categories: ["AI"],
    services: ["AI agent", "Retrieval (RAG)", "Calendar integration", "Automation"],
    accent: "charcoal",
    kind: "ai",
    brief:
      "Missed calls and slow replies cost clinics bookings. The goal: respond to every enquiry in seconds, answer treatment and pricing questions accurately, and book into real availability.",
    approach:
      "A retrieval-grounded agent answers only from approved clinic content, collects the details reception needs, checks live availability and books the slot. Anything clinical, sensitive or uncertain is escalated to a person with the full conversation attached. Behaviour is checked against a test set before launch and monitored after it.",
    deliverables: [
      "Knowledge base ingestion and grounding",
      "Conversation design and guardrails",
      "Calendar and CRM integration",
      "Human hand-off and escalation rules",
      "Evaluation set and monitoring",
    ],
    tools: ["LLM APIs", "Vector search", "n8n / custom workflows", "Calendar & CRM APIs"],
  },
  {
    slug: "concept-studio-booking-app",
    status: "concept",
    client: "Concept",
    industry: "Boutique fitness studio",
    title: "Class booking and membership in one native-feeling app.",
    description:
      "A cross-platform app for class booking, passes and member communication, with an admin console for the studio team.",
    categories: ["APP"],
    services: ["Product design", "Mobile app", "Payments", "Admin dashboard"],
    accent: "sage",
    kind: "app",
    brief:
      "Studios lose revenue to clunky booking and no-shows. The brief: a fast booking flow, flexible passes and memberships, and tools for staff to run the timetable without a spreadsheet.",
    approach:
      "Delivered in phases. Validate the flows in a clickable prototype, ship an MVP covering timetable, booking, payments and push reminders, then iterate on waitlists and retention features using real usage data.",
    deliverables: [
      "User flows and Figma prototype",
      "iOS and Android app",
      "Payments, passes and memberships",
      "Staff admin console",
      "Analytics and event tracking",
    ],
    tools: ["React Native", "TypeScript", "Postgres", "Stripe"],
  },
];

/* -------------------------------------------------------------------------- */
/*  Founder, testimonials, free review                                        */
/* -------------------------------------------------------------------------- */

export const founder = {
  firstName: "Jackson",
  name: "Jackson Booker",
  role: "Founder, JMB Social",
  // Add a photo at public/founder.jpg and set this to "/founder.jpg" to show it.
  photo: "",
  photoAlt: "Jackson Booker, founder of JMB Social",
  intro: "Hi, I'm Jackson.",
  story: [
    "I run JMB Social. I build websites, short-form video and ads for independent local businesses, and content for people building a name in fashion, music and sport. I answer every message myself.",
    "My first projects were for real businesses I know: a garage in Cowfold, a furniture restoration workshop and a tree care company. This summer I interned at Class Agency, where I learned how a working agency scopes and delivers client work.",
    "If you'd like to talk about a project, or just want an honest second opinion on your website, message me.",
  ],
};

export type Testimonial = {
  quote: string;
  business: string;
  detail: string;
  project?: string;
};

// Real client testimonials, supplied by the clients. Trimmed for length using
// their own wording. The section hides itself if this list is ever empty.
export const testimonials: Testimonial[] = [
  {
    quote:
      "He designed and built a brand-new website for the business from the ground up, taking it through to launch and giving us a much more professional and modern online presence. He's been easy to work with throughout, has brought plenty of ideas to the table and has taken the initiative in looking at how we can continue improving our digital marketing.",
    business: "C M Booker",
    detail: "Furniture restoration · Family business",
    project: "c-m-booker",
  },
  {
    quote:
      "He's brought fresh ideas to the business, created a more consistent content strategy and helped us produce engaging videos that showcase both the work we do and the personality behind the garage. He's reliable, creative and always looking for new ways to improve our online presence.",
    business: "Wheelers Autoworks",
    detail: "Independent garage · Website and social content",
    project: "wheelers-autoworks",
  },
];

export const freeReview = {
  title: "Free website review",
  headline: "Not sure what's holding your website back?",
  detail:
    "Send me your website, and your ad account if you run ads. I'll reply within two working days with three specific, practical improvements you can act on. No obligation, no sales pitch.",
};

/* -------------------------------------------------------------------------- */
/*  Seasonal offer                                                            */
/* -------------------------------------------------------------------------- */

// First-time client offer. It switches itself off after `endsAt` (the pages
// re-render hourly), so nothing needs removing on 24 December.
export const christmasOffer = {
  discount: "20%",
  headline: "20% off your first project.",
  short: "Christmas offer: 20% off your first project",
  detail:
    "Book any service before 24 December 2026 and take 20% off your first project with JMB Social. A new business website drops from £450 to £360, and a redesign from £350 to £280.",
  terms:
    "First-time clients only. Applies to your first project, or the first month of an ongoing service. Scope and price are agreed in writing, and the project must be booked by the closing date.",
  endsLabel: "24 December 2026",
  endsAt: "2026-12-24T23:59:59Z",
};

export function isChristmasOfferActive(now: Date = new Date()): boolean {
  return now.getTime() <= new Date(christmasOffer.endsAt).getTime();
}

/* -------------------------------------------------------------------------- */
/*  Contact form                                                              */
/* -------------------------------------------------------------------------- */

export const helpOptions = [
  "Free website review",
  "Website design / redesign",
  "App development",
  "AI agents & automation",
  "Ad management",
  "Ad creative & branding",
  "Social media",
  "SEO & analytics",
  "Fashion, music or sport content",
  "Not sure yet",
] as const;

export const budgetOptions = [
  "Under £250",
  "£250–£500",
  "£500–£1,000",
  "£1,000–£2,500",
  "£2,500+",
  "Not sure yet",
] as const;
