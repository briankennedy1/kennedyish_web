/* eslint-disable @next/next/no-img-element */
import type { Video } from "../../lib/videos";

export function VideoCard({ video }: { video: Video }) {
  return (
    <a
      className="video-card"
      href={`/videos/${video.slug}`}
      aria-label={`View details for ${video.title}`}
    >
      <div className="video-card-image">
        <img src={video.image} alt="" />
      </div>
      <div className="video-card-copy">
        <h3>{video.title}</h3>
        <p className="card-meta">{video.publishedDate}</p>
      </div>
    </a>
  );
}
