import { content } from "../lib/content";

export function Services() {
  return (
    <section
      style={{ background: "var(--tpl-bg)" }}
      className="border-b"
      id="practice"
    >
      <div
        className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28"
        style={{ borderColor: "var(--tpl-line)" }}
      >
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <p
              className="text-xs uppercase"
              style={{
                color: "var(--tpl-accent)",
                letterSpacing: "0.22em",
                fontWeight: 600,
              }}
            >
              {content.services.sectionLabel}
            </p>
            <h2
              className="mt-6 font-display text-3xl leading-tight md:text-5xl"
              style={{
                color: "var(--tpl-ink)",
                fontWeight: 600,
                letterSpacing: "-0.018em",
              }}
            >
              {content.services.sectionHeadline}
            </h2>
            <p
              className="mt-6 max-w-sm text-base leading-relaxed"
              style={{ color: "var(--tpl-muted)" }}
            >
              {content.services.sectionSub}
            </p>
          </div>
          <ul className="md:col-span-8">
            {content.services.items.map((item) => (
              <li
                key={item.number}
                className="grid grid-cols-[auto_1fr] gap-6 border-t py-8 md:gap-12 md:py-10"
                style={{ borderColor: "var(--tpl-line)" }}
              >
                <p
                  className="font-display text-2xl leading-none md:text-3xl"
                  style={{ color: "var(--tpl-accent)", fontWeight: 500 }}
                >
                  {item.number}
                </p>
                <div>
                  <h3
                    className="font-display text-xl md:text-2xl"
                    style={{
                      color: "var(--tpl-ink)",
                      fontWeight: 600,
                      letterSpacing: "-0.018em",
                    }}
                  >
                    {item.name}
                  </h3>
                  <p
                    className="mt-3 max-w-prose text-base leading-relaxed"
                    style={{ color: "var(--tpl-muted)" }}
                  >
                    {item.summary}
                  </p>
                </div>
              </li>
            ))}
            <li
              className="border-t"
              style={{ borderColor: "var(--tpl-line)" }}
              aria-hidden="true"
            />
          </ul>
        </div>
      </div>
    </section>
  );
}
