import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <Link className="wordmark" href="/" aria-label="Kennedyish home">
          Kennedy<span>ish</span>
        </Link>
        <p>Projects, tech, and the house in between.</p>
        <a
          className="footer-youtube"
          href="https://www.youtube.com/@kennedyish"
          target="_blank"
          rel="noreferrer"
        >
          YouTube ↗
        </a>
      </div>
    </footer>
  );
}
