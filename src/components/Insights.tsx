const insights = [
  {
    date: "March 2026",
    title: "When a family trust outlives its trustee",
    summary:
      "Successor provisions that read well on paper and still work twenty years later.",
  },
  {
    date: "January 2026",
    title: "Selling a closely held company without selling the bench",
    summary:
      "How owner-led transitions preserve the people who made the business worth buying.",
  },
  {
    date: "November 2025",
    title: "Conservation easements and the next generation",
    summary:
      "Structuring land stewardship so the farm and the family can both endure.",
  },
] as const;

export function Insights() {
  return (
    <section
      style={{ background: "var(--tpl-bg)" }}
      className="border-b"
      id="insights"
    >
      <div
        className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28"
        style={{ borderColor: "var(--tpl-line)" }}
      >
        <p
          className="text-xs uppercase"
          style={{
            color: "var(--tpl-accent)",
            letterSpacing: "0.22em",
            fontWeight: 600,
          }}
        >
          Insights
        </p>
        <h2
          className="mt-6 font-display text-3xl leading-tight md:text-5xl"
          style={{
            color: "var(--tpl-ink)",
            fontWeight: 600,
            letterSpacing: "-0.018em",
          }}
        >
          Notes from the practice
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {insights.map((item) => (
            <article
              key={item.title}
              className="border-t pt-8"
              style={{ borderColor: "var(--tpl-line)" }}
            >
              <p
                className="text-xs uppercase"
                style={{
                  color: "var(--tpl-muted)",
                  letterSpacing: "0.18em",
                }}
              >
                {item.date}
              </p>
              <h3
                className="mt-4 font-display text-xl leading-snug"
                style={{
                  color: "var(--tpl-ink)",
                  fontWeight: 600,
                  letterSpacing: "-0.018em",
                }}
              >
                {item.title}
              </h3>
              <p
                className="mt-3 text-base leading-relaxed"
                style={{ color: "var(--tpl-muted)" }}
              >
                {item.summary}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
