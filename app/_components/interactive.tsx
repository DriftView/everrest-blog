"use client";

// Interactive, client-side pieces for the marketing landing page.
// Addresses the review findings: engagement, the "2026 update" content bug,
// a pre-signup testable Eva demo (with AI disclosure + human escalation),
// a rotating testimonial carousel, and an opt-in newsletter capture.

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { I } from "./er";

const SUPPORT_PHONE = "(800) 246-7378";
const SUPPORT_TEL = "+18002467378";

/* ─── Scroll-reveal wrapper ──────────────────────────────────────── */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  style,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  as?: React.ElementType;
  style?: React.CSSProperties;
  className?: string;
}) {
  const ref = React.useRef<HTMLElement | null>(null);
  const [shown, setShown] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      const raf = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(raf);
    }
    const io = new IntersectionObserver(
      (entries) => {
        // The initial callback also fires for elements already in view on mount.
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    // Safety net: never leave content hidden if the observer misses (e.g. loaded scrolled past).
    const t = window.setTimeout(() => setShown(true), 2500);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={`er-reveal ${shown ? "is-in" : ""} ${className}`.trim()}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms", ...style }}
    >
      {children}
    </Tag>
  );
}

/* ─── "2026 update" — real content in a dialog (fixes dead chip) ──── */
export function UpdateChip() {
  const notes: { t: string; d: string }[] = [
    {
      t: "Eva, now more present",
      d: "Our guide remembers more of your story and checks in with a lighter touch — never pushing, always at your pace.",
    },
    {
      t: "Life Check-In, clearer",
      d: "A gentle wellness pulse with a documented cadence and grace period, so your plans activate only when they truly should.",
    },
    {
      t: "Memory Vault encryption",
      d: "Documents and letters are encrypted, with beneficiary access you control — released on your terms, not before.",
    },
    {
      t: "780+ partner funeral homes",
      d: "More trusted providers across the country, so coordination stays local and personal wherever you are.",
    },
  ];
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label="Read what's new in the 2026 update"
          style={{
            padding: "3px 9px",
            background: "#fff",
            borderRadius: 999,
            fontSize: 11,
            color: "var(--ink-2)",
            boxShadow: "0 0 0 1px rgba(15,19,17,0.06)",
            whiteSpace: "nowrap",
            cursor: "pointer",
            border: "none",
            font: "inherit",
            fontWeight: 500,
          }}
        >
          2026 update →
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle asChild>
            <span
              className="display"
              style={{ fontSize: 30, color: "var(--ink)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
            >
              What&apos;s new in <span style={{ fontStyle: "italic", color: "var(--amber)" }}>2026</span>
            </span>
          </DialogTitle>
          <DialogDescription asChild>
            <span style={{ fontSize: 14, color: "var(--ink-3)" }}>
              Small, careful improvements to how EverRest holds your wishes.
            </span>
          </DialogDescription>
        </DialogHeader>
        <div style={{ display: "grid", gap: 16, marginTop: 8 }}>
          {notes.map((n) => (
            <div key={n.t} style={{ display: "flex", gap: 13 }}>
              <span
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: "var(--bg-2)",
                  color: "var(--amber)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                {I.check(11)}
              </span>
              <div>
                <div className="serif" style={{ fontSize: 16, color: "var(--ink)", letterSpacing: "-0.015em" }}>
                  {n.t}
                </div>
                <div style={{ fontSize: 13.5, color: "var(--ink-3)", marginTop: 3, lineHeight: 1.55 }}>{n.d}</div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ─── Eva demo — testable pre-signup, with disclosure + escalation ── */
type Turn = { q: string; a: string };
const EVA_TURNS: Turn[] = [
  {
    q: "I just lost my mother. Where do I even start?",
    a: "I'm so sorry. There's no rush right now. When you're ready, we can do just one small thing — find a nearby funeral home, or simply note who should be told. I'll hold the rest.",
  },
  {
    q: "What would a simple, meaningful service look like?",
    a: "Often it's a quiet gathering — a place that felt like them, a few readings, music they loved. I can draft a gentle outline you can change freely, whenever you like.",
  },
  {
    q: "Can I plan ahead for myself?",
    a: "Yes — many people find real relief in it. You decide your wishes, write letters, and set a Life Check-In so nothing activates until it's needed. It stays yours, entirely.",
  },
  {
    q: "How much does this cost?",
    a: "Beginning to plan is free — you only pay when you choose a service. Your chosen funeral home provides the final quote, so there are no surprises from us.",
  },
];

export function EvaDemo() {
  const [active, setActive] = React.useState<number | null>(null);
  const [typed, setTyped] = React.useState("");
  const [typing, setTyping] = React.useState(false);

  React.useEffect(() => {
    if (active == null) return;
    const full = EVA_TURNS[active].a;
    let i = 0;
    let id: ReturnType<typeof setInterval>;
    // Defer state updates out of the synchronous effect body.
    const raf = requestAnimationFrame(() => {
      setTyped("");
      setTyping(true);
      id = setInterval(() => {
        i += 2;
        setTyped(full.slice(0, i));
        if (i >= full.length) {
          clearInterval(id);
          setTyping(false);
        }
      }, 16);
    });
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, [active]);

  return (
    <div
      style={{
        borderRadius: "var(--r-xl)",
        overflow: "hidden",
        boxShadow: "var(--shadow-xl)",
        background: "var(--ink)",
      }}
    >
      {/* header */}
      <div
        style={{
          padding: "18px 22px",
          background: "#1A1F1B",
          display: "flex",
          alignItems: "center",
          gap: 12,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, #F5D9A7, #DC6D2E 60%, #B45419)",
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, color: "#fff" }}>Eva</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Your AI guide · demo conversation</div>
        </div>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 10px",
            fontSize: 11,
            borderRadius: 999,
            background: "rgba(232,178,89,0.16)",
            color: "var(--gold)",
          }}
        >
          <span className="er-pulse" style={{ width: 5, height: 5, borderRadius: 5, background: "var(--gold)" }} />
          Live
        </span>
      </div>

      {/* conversation */}
      <div style={{ padding: 22, minHeight: 220, background: "var(--ink)" }}>
        {active == null ? (
          <div
            className="serif"
            style={{ fontSize: 17, color: "rgba(255,255,255,0.55)", fontStyle: "italic", lineHeight: 1.5, padding: "24px 4px" }}
          >
            Try a question below — see how Eva responds, before you sign up.
          </div>
        ) : (
          <div className="er-fade-enter" key={active}>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 14 }}>
              <div
                style={{
                  maxWidth: "78%",
                  padding: "11px 15px",
                  borderRadius: "16px 16px 4px 16px",
                  background: "rgba(255,255,255,0.1)",
                  color: "#fff",
                  fontSize: 14,
                  lineHeight: 1.5,
                }}
              >
                {EVA_TURNS[active].q}
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 35% 35%, #F5D9A7, #DC6D2E)",
                  flexShrink: 0,
                  marginTop: 2,
                }}
              />
              <div
                className="serif"
                style={{
                  maxWidth: "82%",
                  fontSize: 15,
                  color: "rgba(255,255,255,0.92)",
                  lineHeight: 1.6,
                  fontStyle: "italic",
                }}
              >
                {typed}
                {typing && <span className="er-caret" />}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* prompt chips */}
      <div style={{ padding: "0 22px 18px", display: "flex", flexWrap: "wrap", gap: 8 }}>
        {EVA_TURNS.map((t, i) => (
          <button
            key={t.q}
            type="button"
            onClick={() => setActive(i)}
            style={{
              padding: "9px 14px",
              borderRadius: 999,
              fontSize: 12.5,
              cursor: "pointer",
              border: "1px solid rgba(255,255,255,0.14)",
              background: active === i ? "var(--gold)" : "transparent",
              color: active === i ? "var(--ink)" : "rgba(255,255,255,0.8)",
              transition: "background 0.2s, color 0.2s",
            }}
          >
            {t.q}
          </button>
        ))}
      </div>

      {/* AI disclosure + human escalation */}
      <div
        style={{
          padding: "14px 22px",
          background: "#151A16",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 12,
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.5)", maxWidth: 420, lineHeight: 1.5 }}>
          Eva is an AI guide, and this is a sample conversation. Answers are AI-generated and reviewed by our care
          team — never a substitute for professional or medical advice.
        </div>
        <a
          href={`tel:${SUPPORT_TEL}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "9px 15px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.1)",
            color: "#fff",
            fontSize: 12.5,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          Prefer a person? Call {SUPPORT_PHONE}
        </a>
      </div>
    </div>
  );
}

/* ─── Rotating testimonials (social proof) ───────────────────────── */
type Story = { quote: string; name: string; meta: string; img: string };

export function TestimonialCarousel({ stories }: { stories: Story[] }) {
  const [idx, setIdx] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const count = stories.length;

  React.useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % count), 6000);
    return () => clearInterval(id);
  }, [paused, count]);

  const s = stories[idx];

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div key={idx} className="er-fade-enter">
        <p
          className="display"
          style={{
            fontSize: 52,
            color: "var(--ink)",
            lineHeight: 1.12,
            letterSpacing: "-0.025em",
            margin: 0,
            fontStyle: "italic",
          }}
        >
          &ldquo;{s.quote}&rdquo;
        </p>
        <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 14 }}>
          <img
            src={s.img}
            alt={s.name}
            style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover" }}
          />
          <div>
            <div style={{ fontSize: 14, color: "var(--ink)" }}>{s.name}</div>
            <div style={{ fontSize: 12, color: "var(--ink-4)" }}>{s.meta}</div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 2 }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} style={{ color: "var(--gold)" }}>
                {I.star(16)}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* controls */}
      <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ display: "flex", gap: 8 }}>
          {stories.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => setIdx(i)}
              style={{
                width: i === idx ? 26 : 8,
                height: 8,
                borderRadius: 999,
                border: "none",
                cursor: "pointer",
                padding: 0,
                background: i === idx ? "var(--amber)" : "var(--ink-line-2)",
                transition: "width 0.3s, background 0.3s",
              }}
            />
          ))}
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => setIdx((i) => (i - 1 + count) % count)}
            className="er-carousel-btn"
          >
            {I.back(16)}
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => setIdx((i) => (i + 1) % count)}
            className="er-carousel-btn"
          >
            {I.arrow(16)}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Newsletter opt-in (lead capture) ───────────────────────────── */
const newsletterSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  consent: z.literal(true, { message: "Please confirm you'd like to receive occasional emails" }),
});
type NewsletterValues = z.infer<typeof newsletterSchema>;

// `tone="dark"` lifts the muted text off a dark band (the blog's newsletter
// section); the default keeps the light footer treatment unchanged.
export function NewsletterSignup({ tone = "light" }: { tone?: "light" | "dark" } = {}) {
  const dark = tone === "dark";
  const mutedColor = dark ? "rgba(255,255,255,0.6)" : "var(--ink-4)";
  const doneColor = dark ? "rgba(255,255,255,0.85)" : "var(--ink-2)";
  const [done, setDone] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "", consent: false as unknown as true },
  });

  const onSubmit = async () => {
    // No marketing backend is wired yet — capture succeeds locally and
    // shows confirmation. Point this at the email provider when available.
    await new Promise((r) => setTimeout(r, 400));
    setDone(true);
  };

  if (done) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontSize: 14,
          color: doneColor,
        }}
      >
        <span
          style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: "var(--bg-2)",
            color: "var(--amber)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {I.check(12)}
        </span>
        You&apos;re on the list — we&apos;ll write gently, and rarely.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ maxWidth: 420 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="email"
          placeholder="you@email.com"
          aria-label="Email address"
          {...register("email")}
          style={{
            flex: 1,
            padding: "12px 16px",
            borderRadius: 999,
            border: "1px solid var(--ink-line-2)",
            background: "#fff",
            fontSize: 14,
            color: "var(--ink)",
            outline: "none",
          }}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="er-btn er-btn-amber"
          style={{ padding: "12px 20px", fontSize: 14, whiteSpace: "nowrap", opacity: isSubmitting ? 0.7 : 1 }}
        >
          {isSubmitting ? "…" : "Subscribe"}
        </button>
      </div>
      <label
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 8,
          marginTop: 12,
          fontSize: 12,
          color: mutedColor,
          lineHeight: 1.5,
          cursor: "pointer",
        }}
      >
        <input type="checkbox" {...register("consent")} style={{ marginTop: 2 }} />
        <span>
          Send me occasional planning guidance and grief-support resources. No spam; unsubscribe anytime.
        </span>
      </label>
      {(errors.email || errors.consent) && (
        <div style={{ marginTop: 8, fontSize: 12, color: dark ? "#F2A08A" : "var(--danger)" }}>
          {errors.email?.message ?? errors.consent?.message}
        </div>
      )}
    </form>
  );
}
