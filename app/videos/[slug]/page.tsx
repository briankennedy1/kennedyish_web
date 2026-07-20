import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "../../components/SiteFooter";
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
    description: video.summary,
    openGraph: {
      title: `${video.shortTitle} | Brian Kennedy`,
      description: video.summary,
      type: "video.other",
      images: [video.image],
    },
  };
}

export default async function VideoPage({ params }: PageProps) {
  const { slug } = await params;
  const video = getVideo(slug);
  if (!video) notFound();

  const currentIndex = videos.findIndex((item) => item.slug === video.slug);
  const nextVideo = videos[(currentIndex + 1) % videos.length];

  return (
    <>
      <SiteHeader />
      <main>
        <section className="video-hero">
          <div className="shell video-hero-copy">
            <Link className="back-link" href="/#videos">
              <span aria-hidden="true">←</span> All videos
            </Link>
            <p className="overline light">
              {video.category} · {video.duration} · {video.published}
            </p>
            <h1>{video.title}</h1>
            <p>{video.summary}</p>
          </div>
        </section>

        <section className="shell player-wrap" aria-label="Video player">
          <div className="player-frame">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?rel=0`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </section>

        <section className="section shell episode-grid">
          <article className="episode-copy">
            <p className="overline">About this episode</p>
            <h2>The project, without the pre-roll.</h2>
            {video.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
          <aside className="episode-facts" aria-label="Episode details">
            <div>
              <span>Runtime</span>
              <strong>{video.duration}</strong>
            </div>
            <div>
              <span>Published</span>
              <strong>{video.published}</strong>
            </div>
            <div>
              <span>Views</span>
              <strong>{video.views.replace(" views", "")}</strong>
            </div>
            <a
              className="text-link"
              href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
              target="_blank"
              rel="noreferrer"
            >
              Open in YouTube <span aria-hidden="true">↗</span>
            </a>
          </aside>
        </section>

        <section className="products-section">
          <div className="shell">
            <div className="section-heading products-heading">
              <div>
                <p className="overline">On the bench</p>
                <h2>Products used</h2>
              </div>
              <p>
                The key gear from the project, collected in one place for the
                next person attempting the same thing.
              </p>
            </div>
            <div className="product-grid">
              {video.products.map((product, index) => (
                <a
                  className="product-card"
                  href={product.url}
                  target="_blank"
                  rel="noreferrer"
                  key={product.name}
                >
                  <span className="product-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <span className="product-source">{product.source}</span>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                  </div>
                  <span className="product-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              ))}
            </div>
            <p className="affiliate-note">
              Some links may be affiliate links. If you buy through them, it may
              support the channel at no extra cost to you.
            </p>
          </div>
        </section>

        <section className="next-video shell">
          <div>
            <p className="overline">Up next</p>
            <h2>{nextVideo.shortTitle}</h2>
          </div>
          <Link className="button button-outline" href={`/videos/${nextVideo.slug}`}>
            Next episode <span aria-hidden="true">→</span>
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
