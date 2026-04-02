import { useState, useEffect } from 'react'
import { signOut } from 'firebase/auth'
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query
} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase'
import './Admin.css'

const EMPTY_FORM = {
  id: '',
  title: '',
  year: new Date().getFullYear(),
  client: '',
  tags: '',
  description: '',
  size: 'lg',
  imageUrl: '',
  gallery: [],
  _galleryInput: '',
}

const ALL_TAGS = [
  'Branding', 'Editorial Design', 'Motion Graphics',
  'Web Design', 'RRSS', 'Illustration', 'Typography',
  'Packaging', 'Photography', 'UI/UX'
]

// Convierte URL de Google Drive al formato directo para <img>
function driveUrl(input) {
  const match = input.match(/\/d\/([a-zA-Z0-9_-]+)/)
  if (match) return `https://drive.google.com/uc?export=view&id=${match[1]}`
  return input
}

export default function Admin() {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(EMPTY_FORM)
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState('')

  // ── Cargar proyectos ──────────────────────────────────
  async function loadProjects() {
    setLoading(true)
    const q = query(collection(db, 'projects'), orderBy('year', 'desc'))
    const snap = await getDocs(q)
    setProjects(snap.docs.map((d) => ({ docId: d.id, ...d.data() })))
    setLoading(false)
  }

  useEffect(() => { loadProjects() }, [])

  // ── Toggle tag ────────────────────────────────────────
  function toggleTag(tag) {
    const current = form.tags
      ? form.tags.split(',').map(t => t.trim()).filter(Boolean)
      : []
    const selected = current.includes(tag)
    const next = selected
      ? current.filter(t => t !== tag)
      : [...current, tag]
    setForm((f) => ({ ...f, tags: next.join(', ') }))
  }

  // ── Guardar (crear o editar) ──────────────────────────
  async function handleSave() {
    if (!form.title || !form.id) {
      setStatus('El título y el ID son obligatorios')
      return
    }
    setSaving(true)
    setStatus('Guardando...')
    try {
      const newGalleryUrls = form._galleryInput
        ? form._galleryInput.split('\n').map((u) => driveUrl(u.trim())).filter(Boolean)
        : []

      const data = {
        id: form.id,
        title: form.title,
        year: Number(form.year),
        client: form.client,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
        description: form.description,
        size: form.size,
        imageUrl: driveUrl(form.imageUrl),
        gallery: [...(form.gallery || []), ...newGalleryUrls],
      }

      if (editing) {
        await updateDoc(doc(db, 'projects', editing), data)
        setStatus('Proyecto actualizado ✓')
      } else {
        await addDoc(collection(db, 'projects'), data)
        setStatus('Proyecto creado ✓')
      }

      setForm(EMPTY_FORM)
      setEditing(null)
      await loadProjects()
    } catch (e) {
      setStatus('Error: ' + e.message)
    } finally {
      setSaving(false)
    }
  }

  // ── Editar ────────────────────────────────────────────
  function handleEdit(project) {
    setEditing(project.docId)
    setForm({
      ...project,
      tags: (project.tags || []).join(', '),
      _galleryInput: '',
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // ── Borrar proyecto ───────────────────────────────────
  async function handleDelete(project) {
    if (!window.confirm(`¿Borrar "${project.title}"?`)) return
    await deleteDoc(doc(db, 'projects', project.docId))
    setStatus('Proyecto borrado')
    await loadProjects()
  }

  // ── Borrar imagen de galería ──────────────────────────
  function handleDeleteGalleryImage(index) {
    setForm((f) => ({
      ...f,
      gallery: f.gallery.filter((_, i) => i !== index)
    }))
  }

  // ── Logout ────────────────────────────────────────────
  async function handleLogout() {
    await signOut(auth)
    navigate('/login')
  }

  const selectedTags = form.tags
    ? form.tags.split(',').map(t => t.trim()).filter(Boolean)
    : []

  return (
    <div className="admin-page">

      {/* ── Header ── */}
      <header className="admin-header">
        <span className="admin-logo">Admin</span>
        <div className="admin-header-right">
          <button className="admin-btn-ghost" onClick={() => navigate('/')}>Ver web</button>
          <button className="admin-btn-ghost" onClick={handleLogout}>Salir</button>
        </div>
      </header>

      <div className="admin-body">

        {/* ── Formulario ── */}
        <section className="admin-form-section">
          <h2 className="admin-section-title">
            {editing ? 'Editar proyecto' : 'Nuevo proyecto'}
          </h2>

          {/* Título */}
          <label className="admin-label">Título</label>
          <input className="admin-input" value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />

          {/* Cliente + Año + Tags / Tamaño + ID + Tags */}
          <div className="admin-row-top">
            <div className="admin-top-left">
              <div className="admin-row-halves">
                <div className="admin-col">
                  <label className="admin-label">Cliente</label>
                  <input className="admin-input" value={form.client}
                    onChange={(e) => setForm((f) => ({ ...f, client: e.target.value }))} />
                </div>
                <div className="admin-col">
                  <label className="admin-label">Año</label>
                  <input className="admin-input" type="number" value={form.year}
                    onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))} />
                </div>
              </div>
              <div className="admin-row-halves">
                <div className="admin-col">
                  <label className="admin-label">Tamaño</label>
                  <select className="admin-input" value={form.size}
                    onChange={(e) => setForm((f) => ({ ...f, size: e.target.value }))}>
                    <option value="sm">sm</option>
                    <option value="md">md</option>
                    <option value="lg">lg</option>
                  </select>
                </div>
                <div className="admin-col">
                  <label className="admin-label">ID (URL)</label>
                  <input className="admin-input" value={form.id}
                    placeholder="ej: su-rant"
                    onChange={(e) => setForm((f) => ({ ...f, id: e.target.value }))} />
                </div>
              </div>
            </div>

            <div className="admin-col">
              <label className="admin-label">Tags</label>
              <div className="admin-tags-list">
                {ALL_TAGS.map((tag) => (
                  <button key={tag} type="button"
                    className={`admin-tag-btn ${selectedTags.includes(tag) ? 'selected' : ''}`}
                    onClick={() => toggleTag(tag)}>
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Descripción */}
          <label className="admin-label">Descripción</label>
          <textarea className="admin-textarea admin-textarea-fill" value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />

          {/* Imagen principal */}
          <label className="admin-label">URL imagen principal (Google Drive)</label>
          <div className="admin-url-row">
            <input className="admin-input" value={form.imageUrl}
              placeholder="https://drive.google.com/file/d/ABC123/view"
              onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))} />
            {form.imageUrl && (
              <a href={form.imageUrl} target="_blank" rel="noreferrer"
                className="admin-url-open" title="Abrir imagen">↗</a>
            )}
          </div>

          {/* Galería */}
          <label className="admin-label">Galería — imágenes actuales</label>
          <div className="admin-gallery-preview admin-gallery-scroll">
            {form.gallery?.map((url, i) => (
              <div key={i} className="admin-gallery-thumb">
                <img src={url} alt={`gallery ${i}`} />
                <button className="admin-gallery-delete"
                  onClick={() => handleDeleteGalleryImage(i)}>✕</button>
              </div>
            ))}
          </div>

          <label className="admin-label">Añadir URLs galería (una por línea)</label>
          <textarea className="admin-textarea" rows={3}
            placeholder={"https://drive.google.com/file/d/ABC1/view\nhttps://drive.google.com/file/d/ABC2/view"}
            value={form._galleryInput || ''}
            onChange={(e) => setForm((f) => ({ ...f, _galleryInput: e.target.value }))} />

          {status && <p className="admin-status">{status}</p>}

          <div className="admin-form-actions">
            {editing && (
              <button className="admin-btn-ghost"
                onClick={() => { setForm(EMPTY_FORM); setEditing(null); setStatus('') }}>
                Cancelar
              </button>
            )}
            <button className="admin-btn-primary" onClick={handleSave} disabled={saving}>
              {saving ? 'Guardando...' : editing ? 'Guardar cambios' : 'Crear proyecto'}
            </button>
          </div>
        </section>

        {/* ── Lista de proyectos ── */}
        <section className="admin-list-section">
          <h2 className="admin-section-title">Proyectos</h2>
          {loading ? (
            <p className="admin-loading">Cargando...</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Título</th>
                  <th>Año</th>
                  <th>Cliente</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.docId}>
                    <td>
                      {p.imageUrl && (
                        <img src={p.imageUrl} alt={p.title} className="admin-table-thumb" />
                      )}
                    </td>
                    <td>{p.title}</td>
                    <td>{p.year}</td>
                    <td>{p.client}</td>
                    <td className="admin-table-actions">
                      <button className="admin-btn-ghost" onClick={() => handleEdit(p)}>Editar</button>
                      <button className="admin-btn-danger" onClick={() => handleDelete(p)}>Borrar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

      </div>
    </div>
  )
}