// ============================================================
// Directivo Algarve - Site Configuration
// Claque oficial do Sporting Clube de Portugal no Algarve
// ============================================================

export const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Directivo Algarve - Claque Sporting CP";
export const siteShortName = "Directivo Algarve";
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://projetoduxxialgarve.vercel.app";
export const siteLogo = process.env.NEXT_PUBLIC_SITE_LOGO || "/site-images/logotipo.jpg";
export const siteLogoPng = process.env.NEXT_PUBLIC_SITE_LOGO_PNG || "/site-images/logotipo.jpg";
export const siteLogoMaskable = process.env.NEXT_PUBLIC_SITE_LOGO_MASKABLE || "/site-images/logotipo.jpg";
export const siteHeroBg = process.env.NEXT_PUBLIC_SITE_HERO_BG || "/site-images/background.jpg";
export const siteOgImage = process.env.NEXT_PUBLIC_SITE_OG_IMAGE || "/site-images/imagem5.jpg";
export const siteFeatureBg = process.env.NEXT_PUBLIC_SITE_FEATURE_BG || "/site-images/imagem5.jpg";

export const claqueInfo = {
  fullName: "Directivo Algarve",
  shortName: "DA",
  founded: 2019,
  motto: "União, Apoio e Paixão pelo Sporting",
  description:
    "A Directivo Algarve é uma claque oficial do Sporting Clube de Portugal, com forte presença no sul do país. Somos dedicados ao apoio incondicional ao clube, organização de deslocações, convívio entre sócios e promoção da cultura leonina no Algarve.",
  location: "Algarve, Portugal",
  colors: {
    primary: "#00833E", // Sporting green
    secondary: "#006837",
    dark: "#1a1a2e",
    white: "#FFFFFF",
    gold: "#C4A747",
  },
  social: {
    facebook: "https://facebook.com/directivoalgarve",
    instagram: "https://instagram.com/directivoalgarve",
    twitter: "https://twitter.com/directivoalgarve",
    youtube: "https://youtube.com/@directivoalgarve",
    whatsapp: "https://wa.me/351XXXXXXXXX",
  },
  contact: {
    email: "directivoalgarve@gmail.com",
    phone: "+351 XXX XXX XXX",
  },
};

export const navItems = [
  { label: "Início", href: "/" },
  { label: "Sobre Nós", href: "/sobre" },
  { label: "Jogos", href: "/jogos" },
  { label: "Deslocações", href: "/deslocacoes" },
  { label: "Notícias", href: "/noticias" },
  { label: "Galeria", href: "/galeria" },
  { label: "Sócios", href: "/socios" },
  { label: "Contactos", href: "/contactos" },
];