import styles from './MediaItem.module.css'

function isVideoUrl(url) {
  if (!url) return false
  return (
    url.match(/\.(mp4|webm|mov)$/i) ||
    (url.includes('cloudinary.com') && url.includes('/video/'))
  )
}

export default function MediaItem({ url, alt = '', className = '', ...props }) {
  if (!url) return null

  if (isVideoUrl(url)) {
    return (
      <video
        src={url}
        className={`${styles.media} ${className}`}
        {...props}
      />
    )
  }

  return (
    <img
      src={url}
      alt={alt}
      className={`${styles.media} ${className}`}
      {...props}
    />
  )
}