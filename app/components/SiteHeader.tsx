import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link
          className="header-wordmark brand-wordmark"
          href="/"
          aria-label="Brian Kennedy home"
        >
          Brian <span>Kennedy</span>
        </Link>
        <nav className="primary-nav" aria-label="Primary navigation">
          <Link href="/#videos">Videos</Link>
        </nav>
      </div>
    </header>
  );
}
