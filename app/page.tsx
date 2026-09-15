import type { Metadata } from "next";
import Link from "next/link";
import { LayoutWrapper } from "@/app/_components/layout-wrapper";
import { HorizonScene, AuroraRibbon, Img, Avatar, I } from "@/app/_components/er";
import { NewsletterSignup } from "@/app/_components/interactive";
import { CATEGORIES, FEATURED, POSTS, type Category } from "@/app/_data";

export const metadata: Metadata = {
  title: { absolute: "The EverRest Journal" },
  description:
    "Stories, insights, and guidance for navigating loss and preparing for the future.",
  alternates: { canonical: "/" },
};

const ALL = "All writing";

export default async function BlogPage(props: PageProps<"/">) {
  const { category } = await props.searchParams;
  const active =
    CATEGORIES.find((c) => c === category) ?? (ALL as typeof ALL | Category);

  const posts = POSTS.filter(
    (p) => active === ALL || p.category === active,
  ).filter((p) => p.slug !== FEATURED.slug || active !== ALL);

  const showFeatured = active === ALL;

  return (
    <LayoutWrapper>
      {/* ── Masthead ─────────────────────────────────────────────── */}
      <section
        style={{
          padding: "80px 40px 56px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "55%",
            height: "100%",
            opacity: 0.3,
            pointerEvents: "none",
            // Fade the panel away from its top-right anchor so it never cuts a
            // hard edge through the headline or the copy at narrow widths.
            maskImage:
              "radial-gradient(130% 105% at 100% 0%, #000 25%, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(130% 105% at 100% 0%, #000 25%, transparent 78%)",
          }}
        >
          <HorizonScene tone="dawn" />
        </div>
        <div
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            className="eyebrow"
            style={{ marginBottom: 18, color: "var(--amber)" }}
          >
            The Journal
          </div>
          <h1
            className="display"
            style={{
              margin: 0,
              fontSize: 72,
              color: "var(--ink)",
              maxWidth: 760,
            }}
          >
            Words for the days{" "}
            <span style={{ fontStyle: "italic" }}>after,</span> and the years
            before.
          </h1>
          <p
            style={{
              margin: "24px 0 0",
              fontSize: 18,
              color: "var(--ink-3)",
              lineHeight: 1.6,
              maxWidth: 560,
            }}
          >
            Guidance from care advisors, funeral directors and counsellors —
            written for people in the middle of it, not for the industry.
          </p>
          <div style={{ marginTop: 28 }}>
            <AuroraRibbon width={180} height={6} />
          </div>
        </div>
      </section>

      {/* ── Category filter ──────────────────────────────────────── */}
      <section style={{ padding: "0 40px 40px" }}>
        <div
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            paddingBottom: 28,
            borderBottom: "1px solid var(--ink-line)",
          }}
        >
          {[ALL, ...CATEGORIES].map((c) => {
            const on = c === active;
            return (
              <Link
                key={c}
                href={c === ALL ? "/" : `/?category=${encodeURIComponent(c)}`}
                style={{
                  padding: "9px 16px",
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 500,
                  textDecoration: "none",
                  border: "1px solid",
                  borderColor: on ? "var(--ink)" : "var(--ink-line)",
                  background: on ? "var(--ink)" : "transparent",
                  color: on ? "var(--bg)" : "var(--ink-3)",
                }}
              >
                {c}
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Featured ─────────────────────────────────────────────── */}
      {showFeatured && (
        <section style={{ padding: "0 40px 72px" }}>
          <Link
            href={`/${FEATURED.slug}`}
            style={{
              display: "block",
              maxWidth: 1080,
              margin: "0 auto",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.15fr 1fr",
                gap: 48,
                alignItems: "center",
                padding: 32,
                background: "#fff",
                borderRadius: "var(--r-lg)",
                border: "1px solid var(--ink-line)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div
                style={{
                  borderRadius: "var(--r-md)",
                  overflow: "hidden",
                }}
              >
                <Img src={FEATURED.image} aspect="16/10" alt="" />
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 16,
                  }}
                >
                  <span
                    className="eyebrow"
                    style={{ color: "var(--amber)", margin: 0 }}
                  >
                    Featured
                  </span>
                  <span style={{ color: "var(--ink-5)" }}>·</span>
                  <span style={{ fontSize: 13, color: "var(--ink-4)" }}>
                    {FEATURED.category}
                  </span>
                </div>
                <h2
                  className="serif"
                  style={{
                    margin: 0,
                    fontSize: 38,
                    lineHeight: 1.12,
                    color: "var(--ink)",
                    fontWeight: 400,
                  }}
                >
                  {FEATURED.title}
                </h2>
                <p
                  style={{
                    margin: "16px 0 0",
                    fontSize: 16,
                    color: "var(--ink-3)",
                    lineHeight: 1.6,
                  }}
                >
                  {FEATURED.excerpt}
                </p>
                <div
                  style={{
                    marginTop: 28,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <Avatar size={36} initials={FEATURED.author.initials} tone="amber" />
                  <div style={{ fontSize: 13, lineHeight: 1.35 }}>
                    <div style={{ color: "var(--ink-2)", fontWeight: 500 }}>
                      {FEATURED.author.name}
                    </div>
                    <div style={{ color: "var(--ink-4)" }}>
                      <time dateTime={FEATURED.iso}>{FEATURED.date}</time> ·{" "}
                      {FEATURED.readMins} min read
                    </div>
                  </div>
                </div>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    marginTop: 28,
                    fontSize: 14,
                    color: "var(--ink-2)",
                    fontWeight: 500,
                  }}
                >
                  Read the story {I.arrow(14)}
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ── Post grid ────────────────────────────────────────────── */}
      <section style={{ padding: "0 40px 100px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div
            className="eyebrow"
            style={{ marginBottom: 24 }}
          >
            {active === ALL ? "Latest writing" : active} · {posts.length}{" "}
            {posts.length === 1 ? "piece" : "pieces"}
          </div>

          {posts.length === 0 ? (
            <div
              style={{
                padding: "64px 32px",
                textAlign: "center",
                background: "var(--bg-2)",
                borderRadius: "var(--r-lg)",
                border: "1px solid var(--ink-line)",
              }}
            >
              <p style={{ margin: 0, fontSize: 16, color: "var(--ink-3)" }}>
                Nothing here yet. We are still writing this one.
              </p>
              <Link
                href="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  marginTop: 20,
                  fontSize: 14,
                  color: "var(--ink-2)",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                {I.back(14)} All writing
              </Link>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 32,
              }}
            >
              {posts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/${p.slug}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <article
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      background: "#fff",
                      borderRadius: "var(--r-lg)",
                      border: "1px solid var(--ink-line)",
                      boxShadow: "var(--shadow-xs)",
                      overflow: "hidden",
                    }}
                  >
                    <Img src={p.image} aspect="3/2" alt="" />
                    <div
                      style={{
                        padding: 24,
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 12,
                          color: "var(--amber)",
                          fontWeight: 500,
                          marginBottom: 12,
                        }}
                      >
                        {p.category}
                      </div>
                      <h3
                        className="serif"
                        style={{
                          margin: 0,
                          fontSize: 21,
                          lineHeight: 1.25,
                          color: "var(--ink)",
                          fontWeight: 400,
                        }}
                      >
                        {p.title}
                      </h3>
                      <p
                        style={{
                          margin: "12px 0 0",
                          fontSize: 14,
                          color: "var(--ink-3)",
                          lineHeight: 1.55,
                        }}
                      >
                        {p.excerpt}
                      </p>
                      <div
                        style={{
                          marginTop: "auto",
                          paddingTop: 20,
                          fontSize: 12,
                          color: "var(--ink-4)",
                        }}
                      >
                        {p.author.name} ·{" "}
                        <time dateTime={p.iso}>{p.date}</time> · {p.readMins} min
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Newsletter ───────────────────────────────────────────── */}
      <section
        style={{
          padding: "72px 40px",
          background: "var(--dark)",
          color: "#fff",
        }}
      >
        <div
          style={{
            maxWidth: 620,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <div
            className="eyebrow"
            style={{ marginBottom: 16, color: "var(--gold)" }}
          >
            The Journal, monthly
          </div>
          <h2
            className="display"
            style={{ margin: 0, fontSize: 44, color: "#fff" }}
          >
            One letter a month. <span style={{ fontStyle: "italic" }}>No more.</span>
          </h2>
          <p
            style={{
              margin: "18px auto 28px",
              fontSize: 16,
              color: "rgba(255,255,255,0.72)",
              lineHeight: 1.6,
              maxWidth: 440,
            }}
          >
            New writing, gathered and sent once. Unsubscribe in a click, no
            hard feelings.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <NewsletterSignup tone="dark" />
          </div>
        </div>
      </section>
    </LayoutWrapper>
  );
}
