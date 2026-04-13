export type Project = {
  id: string;
  slug: string;
  tKey: string;        // Refers to projects.list.[id]
  catKey: string;  
  category: string;    // Refers to projects.categories.[key]
  statKey: string;     // Refers to projects.statuses.[key]
  year: number;
  website: string;
  coverImage: string;
  featured_img?: string;
  coverImageAlt: string;
  technologies: string[];
  featured?: boolean;
  confidential?: boolean;
};

export const projects: Project[] = [
  {
    id: "saad-finance-platform",
    slug: "finance-saadict-platform",
    tKey: "saad-finance-platform",
    catKey: "financial_saas",
    category: "platform",
    statKey: "live",
    year: 2025,
    website: "https://finance.saadict.com",
    coverImage: "/brand/saad_logo_dark.png",
    featured_img: "/brand/saad_logo_dark.png",
    coverImageAlt: "finance.saadict.com dashboard",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    featured: true,
  },
  {
    id: "hoggaan-travels-website",
    slug: "hoggaan-travels-website",
    tKey: "hoggaan-travels-website",
    catKey: "corporate",
    category: "website",
    statKey: "live",
    year: 2024,
    website: "https://hoggaantravels.com",
    coverImage: "/projects/hoggaantravels.png",
    coverImageAlt: "Hoggaan Travels preview",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "hoggaan-portal",
    slug: "hoggaan-umrah-portal",
    tKey: "hoggaan-portal",
    catKey: "umrah",
    category: "portal",
    statKey: "live",
    year: 2025,
    website: "https://portal.hoggaantravels.com/",
    coverImage: "/projects/hoggaantravels.png",
    coverImageAlt: "Hoggaan Umrah portal",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    featured: true,
  },
  {
    id: "hornbox-website",
    slug: "hornbox-website",
    tKey: "hornbox-website",
    catKey: "corporate",
    category: "website",
    statKey: "live",
    year: 2025,
    website: "https://www.hornboxllc.com",
    coverImage: "/projects/hornbox.png",
    coverImageAlt: "Horn Box LLC website",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "sun-aratinga-website",
    slug: "sun-aratinga-website",
    tKey: "sun-aratinga-website",
    catKey: "energy",
    category: "website",
    statKey: "live",
    year: 2026,
    website: "https://sunaratinga.com",
    coverImage: "/projects/sun-aratinga.png",
    coverImageAlt: "Sun Aratinga preview",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "east-hides-website",
    slug: "east-hides-website",
    tKey: "east-hides-website",
    catKey: "trading",
    category: "website",
    statKey: "upcoming",
    year: 2025,
    website: "https://www.east-hides.com/",
    coverImage: "/projects/easthides.png",
    coverImageAlt: "EAST Hides preview",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "anaam-digital-website",
    slug: "anaam-digital-website",
    tKey: "anaam-digital-website",
    catKey: "agency",
    category: "website",
    statKey: "coming_soon",
    year: 2025,
    website: "https://www.anaamdigital.com",
    coverImage: "/projects/anaamdigital.png",
    coverImageAlt: "Anaam Digital preview",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "ysws",
    slug: "ysws",
    tKey: "ysws",
    catKey: "hotel_app",
    statKey: "released",
    category: "platform", 
    year: 2022,
    website: "#",
    coverImage: "/projects/ysws.png",
    coverImageAlt: "YSWS app preview",
    technologies: ["React Native", "JavaScript", "Firebase"],
  }
];