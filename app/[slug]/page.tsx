import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LayoutWrapper } from "@/app/_components/layout-wrapper";
import { HorizonScene, Img, Avatar, AuroraRibbon, I } from "@/app/_components/er";
import { NewsletterSignup } from "@/app/_components/interactive";
import { POSTS, getPost, relatedTo, type Block } from "@/app/_data";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: [{ url: post.image }],
    },
  };
}

// ── Prose blocks ────────────────────────────────────────────────
function Prose({ blocks }: { blocks: Block[] }) {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      {blocks.map((b, i) => {
        if (b.t === "h2")
          return (
            <h2
              key={i}
              className="serif"
              style={{
                margin: "20px 0 0",
                fontSize: 28,
                lineHeight: 1.25,
                color: "var(--ink)",
                fontWeight: 400,
              }}
            >
              {b.text}
            </h2>
          );

        if (b.t === "quote")
          return (
            <blockquote
              key={i}
              style={{
                margin: "12px 0",
                padding: "4px 0 4px 24px",
                borderLeft: "2px solid var(--amber)",
              }}
            >
              <p
                className="serif"
                style={{
                  margin: 0,
                  fontSize: 22,
                  lineHeight: 1.45,
                  color: "var(--ink-2)",
                  fontStyle: "italic",
                }}
              >
                {b.text}
              </p>
              {b.cite && (
                <cite
                  style={{
                    display: "block",
                    marginTop: 12,
                    fontSize: 13,
                    color: "var(--ink-4)",
                    fontStyle: "normal",
                  }}
                >
                  {b.cite}
                </cite>
              )}
            </blockquote>
          );

        if (b.t === "list")
          return (
            <ul
              key={i}
              style={{
                margin: 0,
                paddingLeft: 0,
                listStyle: "none",
                display: "grid",
                gap: 12,
              }}
            >
              {b.items.map((item) => (
                <li
                  key={item}
                  style={{
                    display: "flex",
                    gap: 12,
                    fontSize: 17,
                    lineHeight: 1.65,
                    color: "var(--ink-2)",
                  }}
                >
                  <span style={{ color: "var(--amber)", flexShrink: 0, marginTop: 4 }}>
                    {I.check(15)}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );

        return (
          <p
            key={i}
            style={{
              margin: 0,
              fontSize: 17,
              lineHeight: 1.75,
              color: "var(--ink-2)",
            }}
          >
            {b.text}
          </p>
        );
      })}
    </div>
  );
}

export default async function ArticlePage(props: PageProps<"/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = relatedTo(post);

  return (
    <LayoutWrapper>
      {/* ── Article head ─────────────────────────────────────────── */}
      <section
        style={{
          padding: "56px 40px 40px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: 0.22,
            pointerEvents: "none",
          }}
        >
          <HorizonScene tone="light" />
        </div>
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              color: "var(--ink-4)",
              textDecoration: "none",
              marginBottom: 32,
            }}
          >
            {I.back(14)} The Journal
          </Link>

          <div
            className="eyebrow"
            style={{ marginBottom: 16, color: "var(--amber)" }}
          >
            {post.category}
          </div>

          <h1
            className="display"
            style={{ margin: 0, fontSize: 54, color: "var(--ink)" }}
          >
            {post.title}
          </h1>

          <p
            style={{
              margin: "20px 0 0",
              fontSize: 19,
              color: "var(--ink-3)",
              lineHeight: 1.6,
            }}
          >
            {post.excerpt}
          </p>

          <div
            style={{
              marginTop: 32,
              paddingTop: 24,
              borderTop: "1px solid var(--ink-line)",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <Avatar size={40} initials={post.author.initials} tone="amber" />
            <div style={{ fontSize: 13, lineHeight: 1.4 }}>
              <div style={{ color: "var(--ink-2)", fontWeight: 500 }}>
                {post.author.name}
              </div>
              <div style={{ color: "var(--ink-4)" }}>
                {post.author.role} ·{" "}
                <time dateTime={post.iso}>{post.date}</time> · {post.readMins}{" "}
                min read
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Hero image ───────────────────────────────────────────── */}
      <section style={{ padding: "0 40px 48px" }}>
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            borderRadius: "var(--r-lg)",
            overflow: "hidden",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <Img src={post.image} aspect="21/9" alt="" />
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────────────── */}
      <section style={{ padding: "0 40px 72px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <Prose blocks={post.body} />

          <div
            style={{
              marginTop: 56,
              paddingTop: 32,
              borderTop: "1px solid var(--ink-line)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Avatar size={44} initials={post.author.initials} tone="jade" />
              <div style={{ fontSize: 14, lineHeight: 1.45 }}>
                <div style={{ color: "var(--ink-2)", fontWeight: 500 }}>
                  Written by {post.author.name}
                </div>
                <div style={{ color: "var(--ink-4)", fontSize: 13 }}>
                  {post.author.role} at EverRest
                </div>
              </div>
            </div>
            <AuroraRibbon width={120} height={6} />
          </div>
        </div>
      </section>

      {/* ── Related ──────────────────────────────────────────────── */}
      <section style={{ padding: "72px 40px", background: "var(--bg-2)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: 24 }}>
            Keep reading
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 32,
            }}
          >
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/${r.slug}`}
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
                    overflow: "hidden",
                  }}
                >
                  <Img src={r.image} aspect="3/2" alt="" />
                  <div style={{ padding: 22 }}>
                    <div
                      style={{
                        fontSize: 12,
                        color: "var(--amber)",
                        fontWeight: 500,
                        marginBottom: 10,
                      }}
                    >
                      {r.category}
                    </div>
                    <h3
                      className="serif"
                      style={{
                        margin: 0,
                        fontSize: 19,
                        lineHeight: 1.28,
                        color: "var(--ink)",
                        fontWeight: 400,
                      }}
                    >
                      {r.title}
                    </h3>
                    <div
                      style={{
                        marginTop: 14,
                        fontSize: 12,
                        color: "var(--ink-4)",
                      }}
                    >
                      <time dateTime={r.iso}>{r.date}</time> · {r.readMins} min
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ───────────────────────────────────────────── */}
      <section
        style={{ padding: "72px 40px", background: "var(--dark)", color: "#fff" }}
      >
        <div style={{ maxWidth: 620, margin: "0 auto", textAlign: "center" }}>
          <div
            className="eyebrow"
            style={{ marginBottom: 16, color: "var(--gold)" }}
          >
            The Journal, monthly
          </div>
          <h2 className="display" style={{ margin: 0, fontSize: 40, color: "#fff" }}>
            One letter a month.{" "}
            <span style={{ fontStyle: "italic" }}>No more.</span>
          </h2>
          <div
            style={{
              marginTop: 28,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <NewsletterSignup tone="dark" />
          </div>
        </div>
      </section>
    </LayoutWrapper>
  );
}
