import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sporting CP - Site Oficial",
    short_name: "Sporting CP",
    description: "Site oficial do Sporting Clube de Portugal",
    start_url: "/",
    display: "standalone",
    background_color: "#006847",
    theme_color: "#006847",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    orientation: "portrait",
    categories: ["sports", "news"],
    lang: "pt-PT",
  };
}