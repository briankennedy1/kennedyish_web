/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "../../components/SiteHeader";
import { getVideo, videos } from "../../../lib/videos";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return videos.map((video) => ({ slug: video.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const video = getVideo(slug);

  if (!video) return {};

  return {
    title: video.shortTitle,
    description: video.description || video.title,
    openGraph: {
      title: `${video.shortTitle} | Brian Kennedy`,
      description: video.description || video.title,
      type: "video.other",
      images: [video.image],
    },
  };
}

export default async function VideoPage({ params }: PageProps) {
  const { slug } = await params;
  const video = getVideo(slug);
  if (!video) notFound();

  return (
    <>
      <SiteHeader />
      <main>
        <section className="video-detail-hero" aria-label="Video player">
          <div className="shell video-detail">
            <div className="player-frame">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?rel=0`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <div className="video-detail-copy">
              <h1>{video.title}</h1>
              <p className="card-meta">{video.publishedDate}</p>
              {video.description && (
                <p className="video-description">{video.description}</p>
              )}
            </div>
          </div>
        </section>

        <section className="products-section">
          <div className="shell">
            <div className="section-heading products-heading">
              <div>
                <h2>Products used</h2>
              </div>
            </div>
            <div className="product-grid">
              {video.products.map((product) => (
                <a
                  className="product-card"
                  href={product.url}
                  target="_blank"
                  rel="noreferrer"
                  key={product.name}
                >
                  <div className="product-thumb">
                    {product.image ? (
                      <img src={product.image} alt="" loading="lazy" />
                    ) : (
                      <span>{product.name.slice(0, 2).toUpperCase()}</span>
                    )}
                  </div>
                  <div>
                    <span className="product-source">{product.source}</span>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                  </div>
                </a>
              ))}
            </div>
            <p className="affiliate-note">
              Some links may be affiliate links. If you buy through them, it will
              support the channel at no extra cost to you.
            </p>
          </div>
        </section>

      </main>
    </>
  );
}
