export type ServiceRequestStep = {
  id: number;
  key:
    | "basic_info"
    | "service_type"
    | "project_overview"
    | "scope"
    | "timeline"
    | "budget"
    | "review";
  title: string;
  shortTitle: string;
  description: string;
};

export const serviceRequestSteps: ServiceRequestStep[] = [
  {
    id: 1,
    key: "basic_info",
    title: "Basic Information",
    shortTitle: "Basic Info",
    description: "Tell us who you are and how we should contact you.",
  },
  {
    id: 2,
    key: "service_type",
    title: "Service Type",
    shortTitle: "Service",
    description: "Select the type of service or system you want to request.",
  },
  {
    id: 3,
    key: "project_overview",
    title: "Project Overview",
    shortTitle: "Overview",
    description: "Describe the project, its purpose, and the business goal.",
  },
  {
    id: 4,
    key: "scope",
    title: "Scope & Requirements",
    shortTitle: "Scope",
    description: "Share the expected features, workflows, and technical needs.",
  },
  {
    id: 5,
    key: "timeline",
    title: "Timeline & Readiness",
    shortTitle: "Timeline",
    description: "Let us know your timing, project stage, and readiness level.",
  },
  {
    id: 6,
    key: "budget",
    title: "Budget & Engagement",
    shortTitle: "Budget",
    description: "Set expectations for budget range and delivery model.",
  },
  {
    id: 7,
    key: "review",
    title: "Review & Submit",
    shortTitle: "Review",
    description: "Review the request details before final submission.",
  },
];

export const requestedServices = [
  "System Development (SaaS)",
  "Website Development",
  "Web Application Development",
  "Mobile App Development",
  "Consulting",
  "AI Applications",
] as const;

export const projectModes = [
  "New Project",
  "Redesign / Rebuild",
  "Upgrade Existing System",
  "Rescue / Continue Existing Project",
] as const;

export const projectStages = [
  "Idea Only",
  "Requirements Being Prepared",
  "Requirements Ready",
  "Design Ready",
  "Existing System Already Running",
  "Project In Progress",
] as const;

export const budgetRanges = [
  "Under $2,000",
  "$2,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000 – $25,000",
  "$25,000+",
  "Need Guidance",
] as const;

export const engagementModels = [
  "Fixed Project",
  "Phase-Based Delivery",
  "Ongoing Development",
  "Consultation First",
  "Not Sure Yet",
] as const;

export const preferredContactMethods = [
  "Email",
  "WhatsApp",
  "Phone Call",
] as const;

export const serviceSpecificOptions = {
  website: [
    "Multi-page website",
    "Landing page",
    "CMS / editable content",
    "Blog / news section",
    "Multi-language",
    "Lead forms",
  ],
  saas: [
    "Admin dashboard",
    "User roles & permissions",
    "Authentication",
    "Reports & analytics",
    "Payments",
    "API integrations",
    "File upload / document management",
  ],
  webapp: [
    "Admin panel",
    "User login",
    "Realtime data",
    "Reports",
    "API integrations",
    "Workflow automation",
  ],
  mobile: [
    "iOS",
    "Android",
    "Both platforms",
    "Push notifications",
    "API integration",
    "User authentication",
  ],
  consulting: [
    "Architecture planning",
    "Technical audit",
    "System rescue",
    "Scope definition",
    "Stack recommendation",
  ],
  ai: [
    "AI assistant",
    "Workflow automation",
    "Smart search",
    "Recommendations",
    "Data extraction / processing",
  ],
} as const;