// src/config/brand.ts

export const brand = {
  name: "Saad ICT",
  colors: {
    primary: "#24365C",   // deep premium dark (more modern than pure black)
    accent: "#4C8FC4",    // 
  },
  logo: {
    light: "/brand/3.png",
    dark: "/brand/4.png",
    square: "/brand/1.png",
    square2: "/brand/2.png",
    nav_logo: "/brand/saad_light.png",
    icon_tab: "/brand/saad_icon_tab.png",
  },
  social: {
    whatsapp: "https://wa.me/252610395112",
    email: "info@saadict.com",
    phoneNumber: "+252 61 0395112",
    location: "Mogadishu, Somalia",
  },
} as const;

export type Brand = typeof brand;