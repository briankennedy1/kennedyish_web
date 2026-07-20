import type { Metadata } from "next";
import { headers } from "next/headers";
import { Hanken_Grotesk } from "next/font/google";
import { HashScroll } from "./components/HashScroll";
import "./globals.css";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host");
  const protocol =
    headerList.get("x-forwarded-proto") ??
    (host?.startsWith("localhost") ? "http" : "https");
  const metadataBase = host ? new URL(`${protocol}://${host}`) : undefined;

  return {
    metadataBase,
    title: {
      default: "Brian Kennedy | Looking to solve all my problems",
      template: "%s | Brian Kennedy",
    },
    description:
      "Brian Kennedy tests smart-home gear, rebuilds home networks, and tackles projects that make the house work better.",
    icons: {
      icon: "/images/avatar.jpg",
      shortcut: "/images/avatar.jpg",
    },
    openGraph: {
      title: "Brian Kennedy | Looking to solve all my problems",
      description:
        "Projects, tech, and the house in between. Watch every episode and find the gear used in each build.",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: "Brian Kennedy | Looking to solve all my problems",
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
