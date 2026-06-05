import { content } from "../lib/content";

export function CtaBanner() {
  return (
    <section
      style={{ background: "var(--tpl-ink)" }}
      className="border-b"
      id="contact"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-10 md:grid-cols-12 md:items-end md:gap-16">
          <div className="md:col-span-8">
            <h2
              className="font-display text-3xl leading-tight md:text-5xl"
              style={{
                color: "var(--tpl-accent-ink)",
                fontWeight: 600,
                letterSpacing: "-0.018em",
              }}
            >
              {content.ctaBanner.headline}
            </h2>
            <p
              className="mt-6 max-w-2xl text-lg leading-relaxed"
              style={{ color: "var(--tpl-line)" }}
            >
              {content.ctaBanner.sub}
            </p>
          </div>
          <div className="md:col-span-4">
            <a
              href={content.ctaBanner.cta.href}
              className="inline-flex w-full items-center justify-center px-6 py-3 text-sm transition hover:opacity-90 md:w-auto"
              style={{
                background: "var(--tpl-accent)",
                color: "var(--tpl-accent-ink)",
                fontWeight: 600,
                letterSpacing: "0.04em",
              }}
            >
              {content.ctaBanner.cta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
