export type FAQItem = {
  question: string;
  answer: string;
};

export type FAQGroup = {
  id: string;
  title: string;
  eyebrow?: string;
  description: string;
  items: FAQItem[];
};

export const faqGroups: FAQGroup[] = [
  {
    id: "general",
    title: "General Questions",
    eyebrow: "Overview",
    description:
      "Common questions about how Saad ICT works, what we build, and how projects typically begin.",
    items: [
      {
        question: "What kind of systems does Saad ICT build?",
        answer:
          "Saad ICT focuses on practical digital systems that solve real operational needs. This includes SaaS platforms, business web applications, mobile apps, informative websites, and structured internal tools such as dashboards, financial systems, workflow systems, and admin platforms.",
      },
      {
        question: "Do you only build websites?",
        answer:
          "No. Websites are only one part of what we do. Our main strength is building structured systems and applications — especially platforms that support real business operations, user roles, data workflows, and long-term scalability.",
      },
      {
        question: "Can you help shape the idea before development starts?",
        answer:
          "Yes. Many projects begin at the planning stage. We can help define the right scope, structure the workflow, recommend the suitable stack, and identify what should be built first so the project starts on a solid technical foundation.",
      },
      {
        question: "Do you work with companies only, or also with startups and individuals?",
        answer:
          "We can work with companies, startups, and serious founders. The important factor is not company size, but whether the project has clear purpose, realistic requirements, and commitment to building it properly.",
      },
    ],
  },
  {
    id: "saas-web-apps",
    title: "SaaS & Web Applications",
    eyebrow: "Systems",
    description:
      "Questions related to custom software platforms, dashboards, portals, and operational systems.",
    items: [
      {
        question: "What is the difference between a website and a web application?",
        answer:
          "A website is primarily informational and presentation-focused. A web application is interactive and operational — it includes user actions, dashboards, data handling, workflows, permissions, and business logic. Saad ICT builds both, depending on the project need.",
      },
      {
        question: "Can Saad ICT build a custom SaaS platform for our company?",
        answer:
          "Yes. Custom SaaS development is one of our core service areas. We can build systems tailored to your workflow, whether that involves customer management, invoicing, reporting, internal processes, approvals, scheduling, or other business operations.",
      },
      {
        question: "Do your systems support different user roles and permissions?",
        answer:
          "Yes. Role-based access and structured permission logic are important in most serious systems. We design applications so admins, managers, staff, customers, or other user types can each have access only to the tools and data relevant to them.",
      },
      {
        question: "Can you connect the system to APIs or third-party services?",
        answer:
          "Yes. We can integrate with payment gateways, communication services, external APIs, maps, storage services, email systems, and other third-party tools when required by the workflow.",
      },
      {
        question: "Do you build internal dashboards and admin panels?",
        answer:
          "Yes. Internal dashboards, management panels, and control interfaces are a major part of the systems we build. These are often essential for running business operations efficiently and maintaining visibility across users, activity, and records.",
      },
    ],
  },
  {
    id: "mobile-apps",
    title: "Mobile Applications",
    eyebrow: "Mobile",
    description:
      "Questions about mobile app development, platform coverage, and integration with existing systems.",
    items: [
      {
        question: "Do you develop for both Android and iPhone?",
        answer:
          "Yes. We can build mobile applications intended for both Android and iOS, depending on the project requirements and delivery approach.",
      },
      {
        question: "Can the mobile app connect to our web system or backend?",
        answer:
          "Yes. Mobile apps are often built as part of a larger system. We can connect the app to your backend, APIs, authentication system, notifications, and real-time data flows where needed.",
      },
      {
        question: "Can you build a mobile app for staff, customers, or both?",
        answer:
          "Yes. The app can be designed for internal team use, customer-facing use, or a combination of both depending on the structure of the platform.",
      },
    ],
  },
  {
    id: "websites",
    title: "Informative Websites",
    eyebrow: "Web Presence",
    description:
      "Questions about company websites, presentation pages, and digital brand presence.",
    items: [
      {
        question: "What kind of websites does Saad ICT build?",
        answer:
          "We build professional informative websites for companies, products, services, and organizations. These are designed to communicate clearly, represent the brand properly, and support trust, visibility, and conversion.",
      },
      {
        question: "Can you redesign an existing website?",
        answer:
          "Yes. We can redesign an outdated or weak website into a more modern, structured, and professional presence while improving clarity, layout, and overall digital positioning.",
      },
      {
        question: "Will the website be mobile responsive?",
        answer:
          "Yes. Responsive behavior is a basic requirement. Pages are built to work properly across desktop, tablet, and mobile layouts.",
      },
      {
        question: "Can the website include forms, service pages, FAQ, and project sections?",
        answer:
          "Yes. These are standard parts of a strong company website and can be structured in a way that supports both user understanding and business credibility.",
      },
    ],
  },
  {
    id: "process",
    title: "Process & Delivery",
    eyebrow: "Workflow",
    description:
      "Questions about how work is handled from first contact to delivery.",
    items: [
      {
        question: "How does a project usually start?",
        answer:
          "Projects usually begin with understanding the need clearly. After that, the scope is structured, the right solution is proposed, and the project is broken into a practical build path. For larger systems, this often includes planning, architecture, phased implementation, and refinement.",
      },
      {
        question: "Do you help define the project scope?",
        answer:
          "Yes. In many cases, defining the correct scope is one of the most important parts of the work. A clear scope reduces wasted effort, prevents wrong assumptions, and helps ensure the final system is useful in practice.",
      },
      {
        question: "Can a project be built in phases?",
        answer:
          "Yes. Many serious systems should be built in phases. This allows the most important workflows to be launched first while leaving room for expansion, refinement, and additional modules over time.",
      },
      {
        question: "Do you provide support after launch?",
        answer:
          "Yes. Post-launch support can include fixes, refinements, enhancements, and continued system development depending on the nature of the engagement.",
      },
    ],
  },
  {
    id: "consulting-ai",
    title: "Consulting & AI",
    eyebrow: "Strategy",
    description:
      "Questions about advisory work and emerging AI-related capabilities.",
    items: [
      {
        question: "What does your consulting service include?",
        answer:
          "Consulting can include technical direction, architecture planning, workflow design, system structuring, stack decisions, feature prioritization, and practical advice before or during a build.",
      },
      {
        question: "Do you offer AI solutions now?",
        answer:
          "AI is an emerging service direction for Saad ICT. The focus is on practical use cases such as smart workflows, automation, assistive tools, and data-driven features — not AI for its own sake.",
      },
      {
        question: "Can AI be added later to an existing system?",
        answer:
          "Yes. In many cases, AI is best added after the core system is stable. Once the main workflows, data structure, and user operations are in place, AI features can be introduced in a more useful and controlled way.",
      },
    ],
  },
];