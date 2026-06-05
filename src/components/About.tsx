import { content } from "../lib/content";

export function About() {
  return (
    <section
      style={{ background: "var(--tpl-card)" }}
      className="border-b"
      id="about"
    >
      <div
        className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28"
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
              {content.about.eyebrow}
            </p>
            <h2
              className="mt-6 font-display text-3xl leading-tight md:text-5xl"
              style={{
                color: "var(--tpl-ink)",
                fontWeight: 600,
                letterSpacing: "-0.018em",
              }}
            >
              {content.about.headline}
            </h2>
            <div
              className="mt-8 space-y-5 text-lg leading-relaxed"
              style={{ color: "var(--tpl-ink)" }}
            >
              {content.about.body.map((paragraph, index) => (
                <p
                  key={index}
                  className={index === 0 ? "legally-dropcap" : undefined}
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <a
              href="#attorneys"
              className="mt-10 inline-flex items-center gap-2 text-sm transition hover:opacity-70"
              style={{ color: "var(--tpl-ink)", fontWeight: 500 }}
            >
              <span
                className="border-b"
                style={{ borderColor: "var(--tpl-line)" }}
              >
                Meet the attorneys
              </span>
            </a>
          </div>
          <aside className="md:col-span-5">
            <div className="space-y-6">
              {content.about.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="border-t pt-5"
                  style={{ borderColor: "var(--tpl-line)" }}
                >
                  <p
                    className="font-display text-5xl leading-none md:text-6xl"
                    style={{
                      color: "var(--tpl-ink)",
                      fontWeight: 600,
                      letterSpacing: "-0.018em",
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="mt-3 text-xs uppercase"
                    style={{
                      color: "var(--tpl-muted)",
                      letterSpacing: "0.22em",
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-10 overflow-hidden">
              <img
                src="/images/library.jpg"
                alt="The Legally library"
                loading="lazy"
                decoding="async"
                className="block h-auto w-full object-cover"
                style={{ aspectRatio: "4 / 3" }}
              />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
