import { business } from "../lib/business";
import { navLinks } from "../lib/content";
import { goHome } from "../lib/navigation";
import { VersionLine } from "./VersionLine";

export function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        background: "var(--tpl-bg)",
        borderColor: "var(--tpl-line)",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 md:px-8">
        <div className="flex flex-col">
          <a
            href="/"
            onClick={goHome}
            className="font-display text-2xl font-semibold tracking-tight transition-opacity hover:opacity-80"
            style={{ color: "var(--tpl-ink)", letterSpacing: "-0.018em" }}
          >
            {business.brandName}
          </a>
          <VersionLine className="mt-0.5" />
        </div>

        <nav className="hidden items-center gap-8 text-sm md:flex">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-opacity hover:opacity-70"
              style={{ color: "var(--tpl-ink)", fontWeight: 500 }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="inline-flex items-center justify-center px-5 py-2.5 text-sm transition hover:opacity-90"
          style={{
            background: "var(--tpl-accent)",
            color: "var(--tpl-accent-ink)",
            fontWeight: 600,
            letterSpacing: "0.04em",
          }}
        >
          Schedule a consultation
        </a>
      </div>
    </header>
  );
}
