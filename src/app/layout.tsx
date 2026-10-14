import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader, SiteFooter } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Ethixweb India — Digital systems built for growth",
  description: "Websites, AI automation and digital systems for ambitious Indian businesses.",
  metadataBase: new URL("https://example.com"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth"><body><SiteHeader />{children}<SiteFooter /></body></html>;
}
