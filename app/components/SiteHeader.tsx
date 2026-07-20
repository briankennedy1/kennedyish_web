import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="wordmark" href="/" aria-label="Kennedyish home">
          Kennedy<span>ish</span>
        </Link>
        <nav className="primary-nav" aria-label="Primary navigation">
          <Link href="/#videos">Videos</Link>
          <Link href="/#about">About</Link>
          <a
            className="button button-small button-gradient"
            href="https://www.youtube.com/@kennedyish?sub_confirmation=1"
            target="_blank"
            rel="noreferrer"
          >
            Subscribe
          </a>
        </nav>
      </div>
    </header>
  );
}

