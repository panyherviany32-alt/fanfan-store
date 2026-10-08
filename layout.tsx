import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fanfan Store — Apk Premium",
  description: "Fanfan Store — Premium digital products"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="id"><body>{children}</body></html>;
}