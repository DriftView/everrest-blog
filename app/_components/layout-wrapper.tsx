import React from "react";
import { Logo, AuroraRibbon, I } from "./er";
import { NewsletterSignup } from "./interactive";
import { Button } from "@/components/ui/button";
import { mainLink, userLink, partnerLink } from "@/lib/site-links";

// ── Top nav ──────────────────────────────────────────────────────
export function Nav() {
  return (
    <nav className="er-topnav" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 40px", position: "relative", zIndex: 10 }}>
      <a href={mainLink()} style={{ textDecoration: "none" }}>
        <Logo size={20} color="var(--ink)" />
      </a>
      <div
        className="er-topnav-links"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          padding: 6,
          borderRadius: 999,
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 0 0 1px rgba(15,19,17,0.06), 0 4px 20px rgba(15,19,17,0.04)",
        }}
      >
        {[
          { l: "The Journal", href: "/" },
          { l: "How it works", href: mainLink("/#how-it-works") },
          { l: "Meet Eva", href: mainLink("/#meet-eva") },
          { l: "Pricing", href: mainLink("/#pricing") },
          { l: "For partners", href: partnerLink() },
        ].map((n) => (
          <a key={n.l} href={n.href} style={{ padding: "8px 16px", fontSize: 13, color: "var(--ink-3)", borderRadius: 999, textDecoration: "none" }}>{n.l}</a>
        ))}
      </div>
      {/* Two distinct entry points: returning users log in, new users sign up */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <a href={userLink("/login")} style={{ fontSize: 13, color: "var(--ink-3)", textDecoration: "none" }}>Log in</a>
        <Button asChild className="rounded-full px-[18px] text-[13px] h-auto py-[10px]"><a href={userLink("/signup")}>Sign up free</a></Button>
      </div>
    </nav>
  );
}

// ── Footer ───────────────────────────────────────────────────────
export function Footer() {
  return (
    <footer style={{ padding: "80px 40px 40px", background: "var(--bg-2)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 32, marginBottom: 64 }}>
        <div>
          <a href={mainLink()} style={{ textDecoration: "none" }}>
            <Logo size={20} color="var(--ink)" />
          </a>
          <p className="serif" style={{ marginTop: 20, fontSize: 18, color: "var(--ink-3)", fontStyle: "italic", maxWidth: 280, fontWeight: 300 }}>Carry their light, gently.</p>
          <div style={{ marginTop: 20 }}>
            <AuroraRibbon width={140} height={6} />
          </div>
          <div style={{ marginTop: 32 }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Stay gently in touch</div>
            <NewsletterSignup />
          </div>
        </div>
        {[
          { h: "Plan", items: [
            { l: "For a loved one", href: userLink("/onboarding") },
            { l: "For yourself", href: userLink("/preplanner") },
            { l: "Memorial Wall", href: mainLink("/memorial-wall") },
            { l: "Pricing", href: mainLink("/#pricing") },
          ] },
          { h: "Resources", items: [{ l: "The Journal", href: "/" }, { l: "Planning guide", href: mainLink("/planning-guide") }, { l: "Grief support", href: mainLink("/grief-support") }, { l: "FAQs", href: mainLink("/faqs") }] },
          { h: "Company", items: [{ l: "About", href: mainLink("/about") }, { l: "Team", href: mainLink("/team") }, { l: "Partners", href: partnerLink() }, { l: "Careers", href: mainLink("/careers") }] },
          { h: "Legal", items: [{ l: "Terms", href: mainLink("/terms") }, { l: "Privacy", href: mainLink("/privacy") }, { l: "Cookies", href: mainLink("/cookies") }, { l: "Press", href: mainLink("/press") }] },
        ].map((col) => (
          <div key={col.h}>
            <div className="eyebrow" style={{ marginBottom: 16 }}>{col.h}</div>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 10 }}>
              {col.items.map((i) => (
                <li key={i.l} style={{ fontSize: 14, color: "var(--ink-3)" }}>
                  {i.href ? <a href={i.href} style={{ color: "inherit", textDecoration: "none" }}>{i.l}</a> : i.l}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ paddingTop: 32, borderTop: "1px solid var(--ink-line)", display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--ink-4)" }}>
        <div>© 2026 EverRest · A patient companion</div>
        <div>support@everrest.com · (800) 246-7378</div>
      </div>
    </footer>
  );
}

// ── Layout Wrapper ───────────────────────────────────────────────
export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="er-frame" style={{ width: "100%", minHeight: "100vh", background: "var(--bg)", display: "flex", flexDirection: "column" }}>
      <Nav />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  );
}
