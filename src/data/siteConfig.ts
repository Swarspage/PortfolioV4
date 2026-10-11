// Central config for every outbound link. All values below are PLACEHOLDERS — replace them.
export interface SocialLink {
  id: string;
  label: string;
  handle: string;
  url: string;
  icon: string; // filename in src/All data/assets/
}

export const siteConfig = {
  email: "hello@example.com",
  location: "Navi Mumbai, India",
  // Used only if src/All data/assets/Swar-Res.pdf is not present.
  resumeFallbackUrl: "https://example.com/Swar-Res.pdf",
  socials: [
  { id: "github", label: "GitHub", handle: "@your-handle", url: "https://github.com/your-handle", icon: "github.webp" },
  { id: "linkedin", label: "LinkedIn", handle: "in/your-handle", url: "https://www.linkedin.com/in/your-handle", icon: "linkedin-logo.webp" },
  { id: "x", label: "X", handle: "@your-handle", url: "https://x.com/your-handle", icon: "X.webp" },
  { id: "discord", label: "Discord", handle: "your-handle", url: "https://discord.com/users/your-id", icon: "discord.webp" },
  { id: "email", label: "Email", handle: "hello@example.com", url: "mailto:hello@example.com", icon: "email.webp" }] as
  SocialLink[]
};