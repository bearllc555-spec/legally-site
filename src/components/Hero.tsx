import { ArrowRight } from "lucide-react";
import { content } from "../lib/content";

export function Hero() {
  return (
    <section
      style={{ background: "var(--tpl-bg)" }}
      className="border-b"
      id="start"
    >
      <div
        className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24"
        style={{ borderColor: "var(--tpl-line)" }}
      >
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <p
              className="text-xs uppercase"
              style={{
                color: "var(--tpl-accent)",
                letterSpacing: "0.22em",
                fontWeight: 600,
              }}
            >
              {content.hero.eyebrow}
            </p>
            <h1
              className="mt-6 font-display text-5xl leading-[1.05] md:text-7xl"
              style={{
                color: "var(--tpl-ink)",
                fontWeight: 600,
                letterSpacing: "-0.018em",
              }}
            >
              {content.hero.headline}
            </h1>
            <p
              className="mt-8 max-w-xl text-lg leading-relaxed md:text-xl"
              style={{ color: "var(--tpl-muted)" }}
            >
              {content.hero.sub}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-8">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 text-sm transition hover:opacity-90"
                style={{
                  background: "var(--tpl-accent)",
                  color: "var(--tpl-accent-ink)",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                }}
              >
                Schedule a consultation
              </a>
              <a
                href={content.hero.secondaryLink.href}
                className="group inline-flex items-center gap-2 text-sm transition hover:opacity-70"
                style={{ color: "var(--tpl-ink)", fontWeight: 500 }}
              >
                <span
                  className="border-b"
                  style={{ borderColor: "var(--tpl-line)" }}
                >
                  {content.hero.secondaryLink.label}
                </span>
                <ArrowRight
                  className="h-4 w-4 transition group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
          <div className="md:col-span-5">
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: "4 / 5" }}
            >
              <img
                src="/images/hero.jpg"
                alt="The Legally conference room"
                loading="eager"
                decoding="async"
                className="block h-full w-full object-cover"
              />
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{ background: "var(--tpl-accent)" }}
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
                style={{ background: "var(--tpl-accent)" }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
