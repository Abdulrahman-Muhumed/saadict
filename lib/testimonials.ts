export type Testimonial = {
  id: string;
  nameKey: string;
  roleKey: string;
  company: string; // Usually companies don't translate their names
  location: string;
  quoteKey: string;
  projectKey: string;
  rating: 5 | 4;
  featured?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    id: "01",
    nameKey: "data.hoggaan.name",
    roleKey: "data.hoggaan.role",
    company: "Hoggaan Travels",
    location: "Somalia",
    quoteKey: "data.hoggaan.quote",
    projectKey: "data.hoggaan.project",
    rating: 5,
    featured: true,
  },
  {
    id: "02",
    nameKey: "data.hornbox.name",
    roleKey: "data.hornbox.role",
    company: "Horn Box LLC",
    location: "Global",
    quoteKey: "data.hornbox.quote",
    projectKey: "data.hornbox.project",
    rating: 5,
    featured: true,
  },
  {
    id: "03",
    nameKey: "data.sunaratinga.name",
    roleKey: "data.sunaratinga.role",
    company: "Sun Aratinga",
    location: "East Africa",
    quoteKey: "data.sunaratinga.quote",
    projectKey: "data.sunaratinga.project",
    rating: 5,
    featured: true,
  },
];