import { IMG } from '../data/imageMeta.js'

/*
 * Project image with the boring-but-vital plumbing done once: a WebP
 * source (plus an 800px cut when one exists), explicit width/height so
 * the layout never shifts, and the original JPG as the fallback <img>.
 * `sizes` describes the rendered width so the browser picks the cut.
 */
export default function Pic({ src, alt, sizes = '100vw', loading = 'lazy', className }) {
  const meta = IMG[src]
  const webp = src.replace(/\.jpg$/, '.webp')
  const srcSet = meta?.small
    ? `${src.replace(/\.jpg$/, '-800.webp')} 800w, ${webp} ${meta.w}w`
    : webp
  return (
    <picture className={className}>
      <source type="image/webp" srcSet={srcSet} sizes={meta?.small ? sizes : undefined} />
      <img
        src={src}
        alt={alt}
        width={meta?.w}
        height={meta?.h}
        loading={loading}
        decoding="async"
      />
    </picture>
  )
}
