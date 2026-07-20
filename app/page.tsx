/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { VideoCard } from "./components/VideoCard";
import { videos } from "../lib/videos";

const featured = videos[0];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero">
          <div className="shell hero-inner">
            <p className="overline light">Projects · Tech · Home</p>
            <h1>Making the house work better.</h1>
            <p className="hero-copy">
              I’m Brian. I test smart-home gear, rebuild networks, and take on
              the projects that make everyday life a little less annoying.
            </p>
            <div className="hero-actions">
              <Link className="button button-paper" href={`/videos/${featured.slug}`}>
                Watch the latest <span aria-hidden="true">→</span>
              </Link>
              <a
                className="button button-ghost"
                href="https://www.youtube.com/@kennedyish"
                target="_blank"
                rel="noreferrer"
              >
                Visit YouTube
              </a>
            </div>
            <div className="hero-note" aria-label="Channel information">
              <img src="/images/avatar.jpg" alt="Brian Kennedy" />
              <div>
                <strong>Brian Kennedy</strong>
                <span>@kennedyish · 14.8K subscribers</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section shell featured-section">
          <div className="section-heading">
            <div>
              <p className="overline">Latest project</p>
              <h2>Fresh from the workbench.</h2>
            </div>
            <p>
              A practical look at the gear, decisions, and little surprises
              behind the newest upgrade.
            </p>
          </div>

          <article className="featured-card">
            <div className="featured-copy">
              <p className="card-meta coral">
                New · {featured.duration} · {featured.views}
              </p>
              <h3>{featured.title}</h3>
              <p>{featured.summary}</p>
              <Link className="button button-coral" href={`/videos/${featured.slug}`}>
                Watch the episode <span aria-hidden="true">→</span>
              </Link>
            </div>
            <Link
              className="featured-image"
              href={`/videos/${featured.slug}`}
              aria-label={`Watch ${featured.title}`}
            >
              <img src={featured.image} alt="" />
              <span className="feature-play" aria-hidden="true">
                ▶
              </span>
            </Link>
          </article>
        </section>

        <section className="section shell" id="videos">
          <div className="section-heading videos-heading">
            <div>
              <p className="overline">Field notes</p>
              <h2>Recent videos</h2>
            </div>
            <a
              className="text-link desktop-link"
              href="https://www.youtube.com/@kennedyish/videos"
              target="_blank"
              rel="noreferrer"
            >
              See all on YouTube <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="video-grid">
            {videos.slice(1).map((video) => (
              <VideoCard key={video.slug} video={video} />
            ))}
          </div>
        </section>

        <section className="about-band" id="about">
          <div className="shell about-grid">
            <div className="about-intro">
              <p className="overline light">The long game</p>
              <h2>One house. A lot of unfinished business.</h2>
              <p>
                I’m looking to solve all of my problems—one network rack, smart
                plug, cable run, and questionable purchase at a time.
              </p>
            </div>
            <ol className="about-steps">
              <li>
                <span>01</span>
                <div>
                  <h3>Make this house nice.</h3>
                  <p>Useful upgrades, cleaner systems, and fewer mystery cables.</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <h3>Buy a bad house.</h3>
                  <p>Then fix it up with the benefit of everything learned here.</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <h3>Build one from scratch.</h3>
                  <p>The someday project: a house designed around how it really works.</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section className="subscribe-band">
          <div className="shell subscribe-inner">
            <div>
              <p className="overline light">Keep up with the projects</p>
              <h2>The next problem is already waiting.</h2>
            </div>
            <a
              className="button button-paper"
              href="https://www.youtube.com/@kennedyish?sub_confirmation=1"
              target="_blank"
              rel="noreferrer"
            >
              Subscribe on YouTube <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
