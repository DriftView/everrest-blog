// External destinations. GrowthHub is its own deployment, so every link back
// to the marketing site and the apps is absolute.
const FALLBACK = {
  main: "https://everrest.ai",
  user: "https://app.everrest.ai",
  partner: "https://partner.everrest.ai",
} as const;

export const appLinks = {
  main: process.env.NEXT_PUBLIC_MAIN_SITE_URL ?? FALLBACK.main,
  user: process.env.NEXT_PUBLIC_USER_APP_URL ?? FALLBACK.user,
  partner: process.env.NEXT_PUBLIC_PARTNER_APP_URL ?? FALLBACK.partner,
};

export const mainLink = (path = "") => `${appLinks.main}${path}`;
export const userLink = (path = "") => `${appLinks.user}${path}`;
export const partnerLink = (path = "") => `${appLinks.partner}${path}`;
