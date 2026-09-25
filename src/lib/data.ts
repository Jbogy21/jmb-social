// Central, editable content for the JMB Social website.
// Update copy, links and placeholder project data here — components read from this file.

export const siteConfig = {
  name: "JMB Social",
  shortName: "JMB",
  descriptor: "Creative & Growth Studio",
  url: "https://www.jmbsocial.co.uk",
  email: "JMBSocial0@gmail.com",
  location: "UK",
  foundedYear: "2026",
  description:
    "JMB Social brings brand, content, social, web and paid media together to help ambitious businesses look better and grow online.",
  social: {
    instagram: "https://instagram.com/jmbsocial",
    linkedin: "https://linkedin.com/company/jmbsocial",
  },
};

export const navLinks = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export type ServicePillar = {
  number: string;
  slug: string;
  title: string;
  summary: string;
  bullets: string[];
};

// Homepage pillars — the four consolidated disciplines.
export const servicePillars: ServicePillar[] = [
  {
    number: "01",
    slug: "brand",
    title: "Brand",
    summary:
      "Identity, direction and design that makes a business recognisable.",
    bullets: [
      "Brand identity",
      "Social identity",
      "Creative direction",
      "Campaign creative",
    ],
  },
  {
    number: "02",
    slug: "content",
    title: "Content",
    summary: "Photography and video built to be used, not shot once and forgotten.",
    bullets: [
      "Photography",
      "Videography",
      "Short-form video",
      "Editing",
      "Social assets",
    ],
  },
  {
    number: "03",
    slug: "digital",
    title: "Digital",
    summary: "Websites and landing pages that load fast and convert.",
    bullets: [
      "Website design",
      "Website development",
      "Landing pages",
      "Conversion optimisation",
      "SEO foundations",
    ],
  },
  {
    number: "04",
    slug: "growth",
    title: "Growth",
    summary: "Paid media with a strategy, testing and reporting behind it.",
    bullets: [
      "Social media management",
      "Community management",
      "Meta Ads",
      "Google Ads",
      "Campaign strategy",
      "Reporting",
    ],
  },
];

export type ServiceDetail = {
  slug: string;
  number: string;
  title: string;
  whatWeDo: string;
  problem: string;
  deliverables: string[];
};

// Services page — the five detailed categories.
export const serviceDetails: ServiceDetail[] = [
  {
    slug: "brand",
    number: "01",
    title: "Brand",
    whatWeDo:
      "We build the visual identity a business shows the world — logo, colour, type, tone and the system that holds it together across every channel.",
    problem:
      "Most small businesses either have no real identity or one that's grown inconsistently over time. That makes them forgettable, and harder to trust at a glance.",
    deliverables: [
      "Brand identity",
      "Creative direction",
      "Campaign identities",
      "Social design systems",
      "Graphic assets",
    ],
  },
  {
    slug: "content",
    number: "02",
    title: "Content",
    whatWeDo:
      "We plan and shoot the photography and video a brand actually needs — for its website, its feed and its ads — then edit it into something usable everywhere.",
    problem:
      "Generic stock photography and one-off phone videos don't hold up next to competitors who invest in how they look. Good content pays for itself in attention.",
    deliverables: [
      "Photography",
      "Videography",
      "Short-form social video",
      "Editing",
      "Content shoots",
      "Campaign creative",
    ],
  },
  {
    slug: "social",
    number: "03",
    title: "Social",
    whatWeDo:
      "We plan, write, publish and manage the channels that keep a business visible day to day — and reply to the people who engage with it.",
    problem:
      "Social media takes consistent time and a clear voice. Most businesses either post sporadically or hand it to whoever has a spare hour, and it shows.",
    deliverables: [
      "Content strategy",
      "Social management",
      "Copywriting",
      "Publishing",
      "Community management",
      "Engagement",
    ],
  },
  {
    slug: "web",
    number: "04",
    title: "Web",
    whatWeDo:
      "We design and build websites that load quickly, look considered on every device, and are structured to turn visitors into enquiries.",
    problem:
      "A slow, dated or unclear website undoes everything else — it's often the first and last impression a prospective client forms of the business.",
    deliverables: [
      "Web design",
      "Web development",
      "Landing pages",
      "Conversion optimisation",
      "Analytics setup",
      "SEO foundations",
    ],
  },
  {
    slug: "paid",
    number: "05",
    title: "Paid",
    whatWeDo:
      "We plan, build and manage paid campaigns across Meta and Google, testing creative and targeting properly and reporting on what it actually returns.",
    problem:
      "Paid media without strategy or reporting behind it is just spend. Most small businesses either avoid it entirely or run it without a clear read on performance.",
    deliverables: [
      "Meta Ads",
      "Google Ads",
      "Campaign strategy",
      "Creative testing",
      "Retargeting",
      "Reporting",
    ],
  },
];

export type ProjectCategory = "BRAND" | "CONTENT" | "SOCIAL" | "WEB" | "PAID";

export type Project = {
  slug: string;
  client: string;
  industry: string;
  title: string;
  description: string;
  categories: ProjectCategory[];
  services: string[];
  accent: "green" | "cream" | "charcoal" | "sage";
  challenge: string;
  approach: string;
  creative: string;
  results: string;
};

// Illustrative placeholder projects. Replace with real client work
// (and swap PlaceholderImage for real photography) as it becomes available.
export const projects: Project[] = [
  {
    slug: "marlow-and-grain",
    client: "Marlow & Grain",
    industry: "Independent Hospitality",
    title: "A neighbourhood restaurant with a brand to match its food.",
    description:
      "Brand refresh, photography and social for an independent hospitality group opening its second site.",
    categories: ["BRAND", "CONTENT", "SOCIAL"],
    services: ["Brand refresh", "Photography", "Social", "Meta"],
    accent: "green",
    challenge:
      "Marlow & Grain had built a loyal local following on food alone, but its visual identity hadn't kept pace — inconsistent branding across signage, menus and social made it look smaller than it was ahead of a second site opening.",
    approach:
      "We developed a refreshed identity rooted in the warmth of the room itself, then built a photography library and social system the team could keep using long after launch.",
    creative:
      "A restrained, warm identity paired with a consistent photographic style across the dining room, kitchen and plates — designed to work as hard on a phone screen as it does printed on a menu.",
    results:
      "A consistent look across every touchpoint ahead of the second site opening, with a content library the in-house team can draw on for months.",
  },
  {
    slug: "fairway-and-co",
    client: "Fairway & Co.",
    industry: "Golf & Lifestyle",
    title: "A golf lifestyle brand built for the course and the feed.",
    description:
      "Content-led campaign and paid media for a modern golf and lifestyle brand launching direct to consumer.",
    categories: ["CONTENT", "PAID"],
    services: ["Content", "Paid Media", "Digital Campaign"],
    accent: "sage",
    challenge:
      "Launching direct to consumer meant Fairway & Co. needed to look credible against established golf brands from day one, without an existing audience to launch into.",
    approach:
      "We built a content-led launch campaign — product and lifestyle photography, short-form video for paid social, and a Meta and Google campaign structure designed to be tested and refined post-launch.",
    creative:
      "Clean, editorial product photography styled around a modern take on the game, cut into short-form video built specifically for paid placements rather than repurposed from elsewhere.",
    results:
      "A cohesive creative library ready for launch, with a paid media structure in place to test audiences and offers from day one.",
  },
  {
    slug: "north-street-fitness",
    client: "North Street Fitness",
    industry: "Boutique Fitness Studio",
    title: "A studio outgrowing word of mouth.",
    description:
      "Website, content and social for a growing boutique fitness studio.",
    categories: ["WEB", "CONTENT", "SOCIAL"],
    services: ["Website", "Content", "Social"],
    accent: "charcoal",
    challenge:
      "North Street Fitness had a strong local reputation but no website worth sending people to, and a social presence that didn't reflect the energy of the studio in person.",
    approach:
      "We designed and built a fast, class-booking-ready website, ran a content day across peak classes, and set up a social system the studio team run day to day.",
    creative:
      "A high-contrast, energetic visual language carried through the website and social content — built to convert first-time visitors into class bookings.",
    results:
      "A website built to turn visits into bookings, backed by a content library and social system the studio can run independently.",
  },
  {
    slug: "field-and-form",
    client: "Field & Form",
    industry: "Independent Retail",
    title: "A homeware brand ready to look the part online.",
    description:
      "Brand, website and photography for an independent retail brand moving online.",
    categories: ["BRAND", "WEB", "CONTENT"],
    services: ["Brand", "Website", "Photography"],
    accent: "cream",
    challenge:
      "Field & Form's in-store experience was considered and well-loved, but its online presence — a basic template site and inconsistent product photography — undersold the brand entirely.",
    approach:
      "We built a brand system built to travel from shopfront to screen, a new ecommerce-ready website, and a product photography style consistent enough to scale across a growing range.",
    creative:
      "A calm, considered identity and photographic style that lets the products lead, built to extend easily as the range grows.",
    results:
      "An online presence that finally matches the quality of the range and the shop it comes from.",
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Understand",
    description: "We learn the business, audience and commercial goals.",
  },
  {
    number: "02",
    title: "Build",
    description:
      "We create the strategy, identity, content or digital infrastructure needed.",
  },
  {
    number: "03",
    title: "Launch",
    description: "Everything goes live with a clear plan behind it.",
  },
  {
    number: "04",
    title: "Grow",
    description: "We measure what works, improve it and build from there.",
  },
];

export const helpOptions = [
  "Branding",
  "Content",
  "Social media",
  "Website",
  "Meta Ads",
  "Google Ads",
  "Not sure yet",
] as const;

export const budgetOptions = [
  "Under £1,000",
  "£1,000–£2,500",
  "£2,500–£5,000",
  "£5,000–£10,000",
  "£10,000+",
  "Not sure yet",
] as const;
