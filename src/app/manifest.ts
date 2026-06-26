import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Directivo Algarve - Claque Sporting CP",
    short_name: "Directivo Algarve",
    description: "Claque oficial do Sporting Clube de Portugal no Algarve. Apoio, deslocações, convívios e paixão pelo Sporting.",
    start_url: "/",
    display: "standalone",
    background_color: "#1a1a2e",
    theme_color: "#00833E",
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