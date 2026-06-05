import { content } from "../lib/content";

export function Testimonials() {
  return (
    <section style={{ background: "var(--tpl-bg)" }} className="border-b">
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
          In their words
        </p>
        <div className="mt-10 grid gap-12 md:grid-cols-3 md:gap-12">
          {content.testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="border-t pt-8"
              style={{ borderColor: "var(--tpl-line)" }}
            >
              <blockquote
                className="font-display text-xl leading-snug md:text-2xl"
                style={{
                  color: "var(--tpl-ink)",
                  fontWeight: 500,
                  letterSpacing: "-0.018em",
                }}
              >
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8">
                <p
                  className="text-sm"
                  style={{ color: "var(--tpl-ink)", fontWeight: 600 }}
                >
                  {testimonial.name}
                </p>
                <p
                  className="mt-1 text-xs uppercase"
                  style={{
                    color: "var(--tpl-muted)",
                    letterSpacing: "0.18em",
                  }}
                >
                  {testimonial.role}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
