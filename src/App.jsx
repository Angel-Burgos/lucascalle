import { useMemo, useRef, useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import ProjectCard from './components/ProjectCard'
import projects from './config/projects'
import './App.css'

// ── Genera posiciones dispersas alrededor del centro ──────────────────────────
// Devuelve { left, top, rotate } en porcentajes/grados
function generateLayout(count) {
  const positions = []
  const angleStep = (2 * Math.PI) / count

  for (let i = 0; i < count; i++) {
    const angle = angleStep * i + (Math.random() - 0.5) * angleStep * 0.5

    // Radio mayor para alejar del centro, y ligeramente sesgado hacia abajo
    const radius = 28 + Math.random() * 18

    // cx centrado en 50%, cy subido a 55% para sesgar hacia abajo
    const cx = 50 + Math.cos(angle) * radius
    const cy = 55 + Math.sin(angle) * radius * 0.75

    const rotate = (Math.random() - 0.5) * 14

    positions.push({
      left: `${Math.max(15, Math.min(90, cx))}%`,
      top:  `${Math.max(10, Math.min(92, cy))}%`,
      rotate,
    })
  }
  return positions
}

// ── Página de proyecto (placeholder) ─────────────────────────────────────────
function ProjectPage() {
  const navigate = useNavigate()
  const id = window.location.pathname.split('/').pop()
  const project = projects.find((p) => p.id === id)

  if (!project) return (
    <div className="project-page">
      <p>Proyecto no encontrado</p>
    </div>
  )

  return (
    <div className="project-layout">

      {/* ── Nav ── */}
      <nav className="project-nav">
        <button className="nav-btn" onClick={() => navigate('/about')}>About Me</button>
        <button className="nav-btn" onClick={() => navigate('/')}>Projects</button>
      </nav>

      {/* ── Panel izquierdo ── */}
      <aside className="project-left">
        <div className="project-card-box">
          <h1 className="project-title">{project.title}</h1>

          <div className="project-tags">
            {project.tags?.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>

          <p className="project-description">{project.description}</p>

          <footer className="project-meta">
            <span><strong>DATE</strong> {project.year}</span>
            <span><strong>FOR</strong> {project.client}</span>
          </footer>
        </div>
      </aside>

      {/* ── Panel derecho — galería ── */}
      <section className="project-right">
        {project.gallery?.length > 0
          ? project.gallery.map((img, i) => (
              <img key={i} src={img} alt={`${project.title} ${i + 1}`} className="gallery-img" />
            ))
          : <img src={project.image} alt={project.title} className="gallery-img" />
        }
      </section>

    </div>
  )
}
// ── Home ──────────────────────────────────────────────────────────────────────
function Home() {
  const featured = projects.find((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)
  const layout = useMemo(() => generateLayout(rest.length), [])
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <main className={`scatter-canvas ${visible ? 'visible' : ''}`}>
      <div className="site-name">Lucas<br />Portfolio</div>

      {/* Tarjetas dispersas */}
      {rest.map((project, i) => (
        <ProjectCard
          key={project.id}
          project={project}
          style={{
            left: layout[i].left,
            top:  layout[i].top,
            '--rotate': `${layout[i].rotate}deg`,   // ← variable CSS
            transform: `translate(-50%, -50%) rotate(var(--rotate, 0deg))`,
            opacity: visible ? 1 : 0,
          }}
        />
        )
      )}
      {/* About me — siempre centrado y encima */}
      {featured && (
        <ProjectCard
          key={featured.id}
          project={featured}
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 50,
            opacity: visible ? 1 : 0,
          }}
        />
      )}
    </main>
  )
}

// ── App root ──────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <Routes>
      <Route path="/"               element={<Home />} />
      <Route path="/project/:id"    element={<ProjectPage />} />
    </Routes>
  )
}
