import { business } from "../lib/business";
import { content } from "../lib/content";
import { goHome } from "../lib/navigation";
import { VersionLine } from "./VersionLine";

export function SiteFooter() {
  return (
    <footer style={{ background: "var(--tpl-card)" }}>
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <a
              href="/"
              onClick={goHome}
              className="font-display text-2xl font-semibold tracking-tight transition-opacity hover:opacity-80"
              style={{ color: "var(--tpl-ink)", letterSpacing: "-0.018em" }}
            >
              {business.brandName}
            </a>
            <VersionLine className="mt-2" />
            <p
              className="mt-6 max-w-sm text-base leading-relaxed"
              style={{ color: "var(--tpl-muted)" }}
            >
              {content.footer.blurb}
            </p>
          </div>
          <div className="md:col-span-3">
            <p
              className="text-xs uppercase"
              style={{
                color: "var(--tpl-accent)",
                letterSpacing: "0.22em",
                fontWeight: 600,
              }}
            >
              Office
            </p>
            <address
              className="mt-4 space-y-2 text-sm not-italic leading-relaxed"
              style={{ color: "var(--tpl-ink)" }}
            >
              {business.address.split("\n").map((line) => (
                <p key={line}>{line}</p>
              ))}
              <p>
                <a href={business.phoneHref} className="hover:opacity-70">
                  {business.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${business.email}`}
                  className="hover:opacity-70"
                >
                  {business.email}
                </a>
              </p>
            </address>
          </div>
          <div className="md:col-span-4">
            <p
              className="text-xs uppercase"
              style={{
                color: "var(--tpl-accent)",
                letterSpacing: "0.22em",
                fontWeight: 600,
              }}
            >
              Hours
            </p>
            <ul className="mt-4 space-y-2 text-sm" style={{ color: "var(--tpl-ink)" }}>
              {business.hours.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
        <div
          className="mt-16 border-t pt-8 text-xs"
          style={{ borderColor: "var(--tpl-line)", color: "var(--tpl-muted)" }}
        >
          <p>
            &copy; {new Date().getFullYear()} {business.legalName}. Design
            concept by 998 Web Designs.
          </p>
        </div>
      </div>
    </footer>
  );
}
