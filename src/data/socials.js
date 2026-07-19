/*
 * External profiles. Links render in Contact and Footer only when `href`
 * is filled in, so the empty entries below are invisible on the site.
 *
 * TODO(Tomáš): paste your real profile URLs here - for a client, a
 * portfolio without verifiable traces (LinkedIn above all) reads as a
 * portfolio that can't be checked. Add or remove entries freely; the
 * label is what visitors see.
 */
export const SOCIALS = [
  { label: 'LinkedIn', href: '' },
  { label: 'Instagram', href: '' },
  { label: 'Behance', href: '' },
].filter((s) => s.href)
