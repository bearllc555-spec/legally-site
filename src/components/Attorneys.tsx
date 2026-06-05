import { attorneys } from "../lib/content";

export function Attorneys() {
  return (
    <section
      style={{ background: "var(--tpl-card)" }}
      className="border-b"
      id="attorneys"
    >
      <div
        className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28"
        style={{ borderColor: "var(--tpl-line)" }}
      >
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <h2
            className="font-display text-3xl leading-tight md:text-5xl"
            style={{
              color: "var(--tpl-ink)",
              fontWeight: 600,
              letterSpacing: "-0.018em",
            }}
          >
            The bench
          </h2>
          <p
            className="text-xs uppercase"
            style={{
              color: "var(--tpl-muted)",
              letterSpacing: "0.22em",
              fontWeight: 600,
            }}
          >
            Four partners
          </p>
        </div>
        <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-x-16 md:gap-y-16">
          {attorneys.map((attorney) => (
            <article
              key={attorney.name}
              className="grid grid-cols-[auto_1fr] gap-6 border-t pt-8 md:gap-10"
              style={{ borderColor: "var(--tpl-line)" }}
            >
              <div className="w-28 md:w-40">
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: "4 / 5" }}
                >
                  <img
                    src={attorney.photo}
                    alt={attorney.name}
                    loading="lazy"
                    decoding="async"
                    className="block h-full w-full object-cover"
                  />
                </div>
              </div>
              <div>
                <h3
                  className="font-display text-xl md:text-2xl"
                  style={{
                    color: "var(--tpl-ink)",
                    fontWeight: 600,
                    letterSpacing: "-0.018em",
                  }}
                >
                  {attorney.name}
                </h3>
                <p
                  className="mt-1 text-xs uppercase"
                  style={{
                    color: "var(--tpl-accent)",
                    letterSpacing: "0.22em",
                    fontWeight: 600,
                  }}
                >
                  {attorney.role} · {attorney.bar}
                </p>
                <p
                  className="mt-4 text-base leading-relaxed"
                  style={{ color: "var(--tpl-muted)" }}
                >
                  {attorney.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
