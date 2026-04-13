// src/config/brand.ts

export const brand = {
  name: "Saad ICT",
  colors: {
    primary: "#24365C",   // deep premium dark (more modern than pure black)
    accent: "#4C8FC4",    // 
  },
  logo: {
    light: "/brand/saad_logo_light.jpg",
    dark: "/brand/saad_logo_dark.png",
    square: "/brand/saad_logo_light2.png",
    nav_logo: "/brand/saad_logo_light.png",
  },
  social: {
    whatsapp: "https://wa.me/252610395112",
    email: "info@saadict.com",
    phoneNumber: "+252 61 0395112",
    location: "Mogadishu, Somalia",
  },
} as const;

export type Brand = typeof brand;