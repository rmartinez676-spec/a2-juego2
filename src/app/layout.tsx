import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "OPOSI-KID · Repaso del temario A2 Estado",
  description: "Juego de plataformas para repasar el temario de oposiciones A2 del Estado: 6 mundos, jefes y examen final.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#05070f",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-slate-100 text-slate-900 antialiased">{children}</body>
    </html>
  );
}
