import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "OposiKid A2 · Gestión del Estado",
    short_name: "OposiKid A2",
    description: "Juego de plataformas para preparar las oposiciones de Gestión de la Administración Civil del Estado (A2). 58 temas oficiales, 6 mundos y exámenes oficiales.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#05070f",
    theme_color: "#05070f",
    orientation: "any",
    categories: ["education", "games"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
