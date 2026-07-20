/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Video } from "../../lib/videos";

export function VideoCard({ video }: { video: Video }) {
  return (
    <article className="video-card">
      <Link className="video-card-image" href={`/videos/${video.slug}`}>
        <img src={video.image} alt="" />
        <span className="duration">{video.duration}</span>
        <span className="play-dot" aria-hidden="true">
          ▶
        </span>
      </Link>
      <div className="video-card-copy">
        <p className="card-meta">
          {video.category} <span>·</span> {video.published}
        </p>
        <h3>
          <Link href={`/videos/${video.slug}`}>{video.shortTitle}</Link>
        </h3>
        <p>{video.summary}</p>
        <Link className="text-link" href={`/videos/${video.slug}`}>
          Watch &amp; explore <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
