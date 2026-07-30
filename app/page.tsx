/* eslint-disable @next/next/no-img-element */
import { VideoCard } from "./components/VideoCard";
import { videos } from "../lib/videos";
import { sitePath } from "../lib/site-path";

const videosNewestFirst = videos
  .filter((video) => video.listed !== false)
  .sort((a, b) => Date.parse(b.publishedDate) - Date.parse(a.publishedDate));

export default function Home() {
  return (
    <>
      <main className="home-page">
        <section className="about-band" id="about">
          <div className="about-layout">
            <div className="about-content">
              <h2 className="about-headline">
                Brian <span>Kennedy</span>
              </h2>
              <p className="about-tagline">home improvement tech</p>
            </div>
            <div className="about-photo">
              <img src={sitePath("/images/000full.jpg")} alt="Brian Kennedy" />
            </div>
            <div className="about-lower">
              <div className="about-intro">
                <p className="about-copy">
                  Hi, I&apos;m Brian. I spent 10 years traveling the world
                  mountain biking on{" "}
                  <a
                    href="https://www.youtube.com/@bkxc"
                    target="_blank"
                    rel="noreferrer"
                  >
                    YouTube
                  </a>{" "}
                  and now I&apos;m trying to make my house nice.
                </p>
                <p className="about-copy">
                  I live in Northern California with my amazing wife Sarah.
                </p>
                <p className="about-copy">
                  When I&apos;m not working on my house, I spend a lot of time at
                  my private mountain bike club,{" "}
                  <a
                    href="https://www.everstoke.bike/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Everstoke
                  </a>
                  , in The Lost Sierra.
                </p>
              </div>
            </div>
            <div className="about-actions">
              <a
                className="button button-youtube"
                href="https://www.youtube.com/@kennedyish"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="button-logo"
                  src={sitePath("/images/products/youtube.svg")}
                  alt=""
                  aria-hidden="true"
                />
                YouTube
              </a>
              <a
                className="button button-gradient"
                href="mailto:kennedyishcontact@gmail.com"
              >
                <span aria-hidden="true">💬</span> Contact
              </a>
            </div>
            <ol className="about-steps">
              <li>
                <div className="about-step-panel">
                  <span>Step 1:</span>
                  <h3>Make my current house nice.</h3>
                </div>
              </li>
              <li>
                <div className="about-step-panel">
                  <span>Step 2:</span>
                  <h3>Buy a bad house and fix it up.</h3>
                </div>
              </li>
              <li>
                <div className="about-step-panel">
                  <span>Step 3:</span>
                  <h3>Build a new house from scratch.</h3>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section className="section shell videos-section" id="videos">
          <h2 className="videos-title">Videos</h2>
          <div className="video-grid video-grid-lead">
            {videosNewestFirst.slice(0, 2).map((video) => (
              <VideoCard key={video.slug} video={video} />
            ))}
          </div>
          <div className="video-grid video-grid-three">
            {videosNewestFirst.slice(2).map((video) => (
              <VideoCard key={video.slug} video={video} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
