// Vercel — like a .env file — can define a variable with an EMPTY value, and
// `??` only falls back on null/undefined, so `""` sails through and
// `new URL("")` throws during "Collecting page data". Treat blank (and
// malformed) as absent so a mis-set dashboard field degrades to the fallback
// instead of failing the build.
export function envUrl(value: string | undefined, fallback: string): string {
  const raw = value?.trim();
  if (!raw) return fallback;
  try {
    return new URL(raw).toString().replace(/\/$/, "");
  } catch {
    return fallback;
  }
}

// Public origin of this deployment.
export const siteUrl = envUrl(
  process.env.NEXT_PUBLIC_SITE_URL,
  "https://blog.everrest.ai",
);
