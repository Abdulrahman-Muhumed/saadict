// src/config/brand.ts

export const brand = {
  name: "HornBox LLC",
  colors: {
    primary: "#1A1A1A",   // deep industrial black
    accent: "#FFC233",    // modern premium yellow (not cheap neon)
  },
  logo: {
    light: "/brand/hornbox_logo.png",  // update once you have them in /public/images
    dark: "/brand/hornbox_logo.png",
    square: "/brand/hornbox_logo.png",
    nav_logo: "/brand/hornbox_logo.png",
  },
  social: {
    whatsapp: "https://wa.me/252619100000",
    instagram: "https://instagram.com/hoggaan",
    facebook: "https://facebook.com/hoggaan",
  },
} as const;

export type Brand = typeof brand;
