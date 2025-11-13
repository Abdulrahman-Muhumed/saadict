// src/config/brand.ts

export const brand = {
  name: "Hoggaan Travels",
  colors: {
    primary: "#241c72", // deep indigo
    accent: "#F99417",  // warm orange
  },
  logo: {
    light: "/brand/hg_icon_light.png",  // update once you have them in /public/images
    dark: "/brand/hg_icon_dark.png",
    square: "/brand/hg_icon_light.jpg",
    nav_logo: "/brand/hg_icon_light.png",
  },
  social: {
    whatsapp: "https://wa.me/252619100000",
    instagram: "https://instagram.com/hoggaan",
    facebook: "https://facebook.com/hoggaan",
  },
} as const;

export type Brand = typeof brand;
