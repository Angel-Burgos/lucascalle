import { useNavigate } from 'react-router-dom'
import styles from './ProjectCard.module.css'

// Tamaños base en px (escalan con CSS clamp)
const SIZE_MAP = {
  sm: { w: 200, h: 260 },
  md: { w: 280, h: 360 },
  lg: { w: 360, h: 460 },
}

export default function ProjectCard({ project, style }) {
  const navigate = useNavigate()
  const { w, h } = SIZE_MAP[project.size] ?? SIZE_MAP.md

  return (
    <article
      className={styles.card}
      style={{
        '--w': `${w}px`,
        '--h': `${h}px`,
        ...style,
      }}
      onClick={() => navigate(`/project/${project.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/project/${project.id}`)}
    >
      <div className={styles.imageWrap}>
        <img src={project.imageUrl} alt={project.title} draggable={false} />
        <footer className={styles.footer}>
          <span className={styles.title}>{project.title}</span>
        </footer>
      </div>
    </article>
  )
}
