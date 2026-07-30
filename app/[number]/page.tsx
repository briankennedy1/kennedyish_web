import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VideoDetail } from "../components/VideoDetail";
import { sitePath } from "../../lib/site-path";
import { getVideoByNumber, videos } from "../../lib/videos";

type PageProps = {
  params: Promise<{ number: string }>;
};

export function generateStaticParams() {
  return videos.map((video) => ({ number: video.number.toString() }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { number } = await params;
  const video = getVideoByNumber(number);

  if (!video) return {};

  return {
    title: video.shortTitle,
    description: video.description || video.title,
    alternates: {
      canonical: sitePath(`/${video.number}/`),
    },
    openGraph: {
      title: `${video.shortTitle} | Brian Kennedy`,
      description: video.description || video.title,
      type: "video.other",
      images: [sitePath(video.image)],
    },
  };
}

export default async function VideoPage({ params }: PageProps) {
  const { number } = await params;
  const video = getVideoByNumber(number);
  if (!video) notFound();

  return <VideoDetail video={video} />;
}
