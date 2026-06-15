// ============================================================
// Single source of truth for site-wide config.
// Edit these and they propagate everywhere.
// ============================================================

export const SITE = {
  name: 'Nakshatra',                 // short wordmark — nav brand, footer, page titles
  fullName: 'Nakshatra Bansal',      // full name — hero headline only
  // TODO: this thesis line is the first thing visitors read. Make it yours.
  tagline:
    'Physics PhD working where neuromorphic hardware, spintronics, and the physics of learning meet.',
  email: 'nakshatra.bansal@gmail.com',
  location: 'Irvine, CA',
};

export const NAV = [
  { label: 'Work', href: '/' },
  { label: 'Research', href: '/research' },
  { label: 'Writing', href: '/writing' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
];

// TODO: fill in your real handles. Anything left blank is hidden.
export const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/Nakshatra120' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nakshatrabansal/' },
  { label: 'Email', href: 'mailto:nakshatra.bansal@gmail.com' },
];
