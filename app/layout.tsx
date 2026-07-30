import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import { HashScroll } from "./components/HashScroll";
import { sitePath } from "../lib/site-path";
import "./globals.css";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

export function generateMetadata(): Metadata {
  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    ),
    title: {
      default: "Brian Kennedy | home improvement tech",
      template: "%s | Brian Kennedy",
    },
    description:
      "Brian Kennedy tests smart-home gear, rebuilds home networks, and tackles projects that make the house work better.",
    icons: {
      icon: sitePath("/images/avatar-256.jpg"),
      shortcut: sitePath("/images/avatar-256.jpg"),
    },
    openGraph: {
      title: "Brian Kennedy | home improvement tech",
      description:
        "Projects, tech, and the house in between. Watch every episode and find the gear used in each build.",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: "Brian Kennedy | home improvement tech",
      description: "Projects, tech, and the house in between.",
    },
  };
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={hanken.variable}>
        {children}
        <HashScroll />
      </body>
    </html>
  );
}
