// Small shared helpers.

// Attributes that make an external link open in a new tab, safely.
// Returns nothing for internal paths (/...), mailto:, tel:, and #anchors, so
// those keep their normal same-tab behaviour. Spread onto an <a>:
//   <a href={href} {...newTabIfExternal(href)}>
// rel="noopener noreferrer" stops the new tab from reaching back via
// window.opener and from leaking the referrer URL.
export function newTabIfExternal(href: string | undefined) {
  const isExternal = !!href && /^https?:\/\//i.test(href);
  return isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};
}
