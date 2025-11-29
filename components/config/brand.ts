// src/config/brand.ts

export const brand = {
  name: "HornBox LLC",
  colors: {
    primary: "#1A1A1A",   // deep industrial black
    accent: "#FFC233",    // modern premium yellow (not cheap neon)
  },
  logo: {
    light: "/brand/hornbox_logo1.png",  
    dark: "/brand/hornbox_logo2.jpg",
    square: "/brand/hornbox_logo.png",
    nav_logo: "/brand/hornbox_logo.png",
  },
  social: {
    whatsapp: "https://wa.me/252612888886",
    email: "info@hornboxllc.com",
    phoneNumber: "+252 61 2888886",
    phoneNumber2: "+254 61 9582275",
    location: "TCC Building 4th Floor, Talex Road, Hodan District, Mogadishu, Somalia"
  },
} as const;

export type Brand = typeof brand;
