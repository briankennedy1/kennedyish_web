/* eslint-disable @next/next/no-img-element */
import type { Video } from "../../lib/videos";
import { sitePath } from "../../lib/site-path";

export function VideoCard({ video }: { video: Video }) {
  return (
    <a
      className="video-card"
      href={sitePath(`/${video.number}/`)}
      aria-label={`View details for ${video.title}`}
    >
      <div className="video-card-image">
        <img
          src={sitePath(video.image)}
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="video-card-copy">
        <h3>{video.title}</h3>
        <p className="card-meta">{video.publishedDate}</p>
      </div>
    </a>
  );
}
