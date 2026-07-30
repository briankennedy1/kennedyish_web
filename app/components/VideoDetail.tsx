/* eslint-disable @next/next/no-img-element */
import type { Video } from "../../lib/videos";
import { sitePath } from "../../lib/site-path";
import { SiteHeader } from "./SiteHeader";

export function VideoDetail({ video }: { video: Video }) {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="video-detail-hero" aria-label="Video player">
          <div className="shell video-detail">
            <div className="player-frame">
              {video.youtubeId ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?rel=0`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <img
                  src={sitePath(video.image)}
                  alt={`Placeholder for ${video.title}`}
                  fetchPriority="high"
                />
              )}
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

        {video.projects?.map((project) => (
          <section className="mini-project-section" key={project.label}>
            <div className="shell">
              <div className="mini-project-heading">
                <p className="mini-project-label">{project.label}</p>
                <h2>{project.subtitle}</h2>
              </div>

              <div className="mini-project-art">
                <img
                  src={sitePath(project.image)}
                  alt={project.imageAlt}
                  loading="lazy"
                />
              </div>

              <div className="mini-project-product-grid">
                {project.products.map((product) => (
                  <a
                    className="mini-project-product-card"
                    href={product.url}
                    target="_blank"
                    rel="noreferrer"
                    key={product.name}
                  >
                    <div className="mini-project-product-image">
                      {product.image && (
                        <img
                          src={sitePath(product.image)}
                          alt=""
                          loading="lazy"
                        />
                      )}
                    </div>
                    <h3>{product.name}</h3>
                  </a>
                ))}
              </div>

              <p className="affiliate-note">
                Some links may be affiliate links. If you buy through them, it
                will support the channel at no extra cost to you.
              </p>
            </div>
          </section>
        ))}

        {video.products.length > 0 && (
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
                        <img
                          src={sitePath(product.image)}
                          alt=""
                          loading="lazy"
                        />
                      ) : (
                        <span>{product.name.slice(0, 2).toUpperCase()}</span>
                      )}
                    </div>
                    <div>
                      <span className="product-source">{product.source}</span>
                      <h3>{product.name}</h3>
                      {product.description && <p>{product.description}</p>}
                    </div>
                  </a>
                ))}
              </div>
              <p className="affiliate-note">
                Some links may be affiliate links. If you buy through them, it
                will support the channel at no extra cost to you.
              </p>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
