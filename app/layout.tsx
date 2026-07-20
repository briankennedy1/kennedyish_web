import type { Metadata } from "next";
import { headers } from "next/headers";
import { Hanken_Grotesk } from "next/font/google";
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
      default: "Kennedyish | Projects, tech, and home",
      template: "%s | Kennedyish",
    },
    description:
      "Brian Kennedy tests smart-home gear, rebuilds home networks, and tackles projects that make the house work better.",
    icons: {
      icon: "/images/avatar.jpg",
      shortcut: "/images/avatar.jpg",
    },
    openGraph: {
      title: "Kennedyish | Making the house work better",
      description:
        "Projects, tech, and the house in between. Watch every episode and find the gear used in each build.",
      type: "website",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: "Kennedyish — Making the house work better",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Kennedyish | Making the house work better",
      description: "Projects, tech, and the house in between.",
      images: ["/og.png"],
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
      <body className={hanken.variable}>{children}</body>
    </html>
  );
}

