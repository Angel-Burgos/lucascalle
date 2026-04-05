import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import MediaItem from '../components/MediaItem'
import './Aboutpage.css'

export default function AboutPage() {
  const navigate = useNavigate()
  const [about, setAbout] = useState(null)

  useEffect(() => {
    async function load() {
      const snap = await getDoc(doc(db, 'config', 'about'))
      if (snap.exists()) setAbout(snap.data())
    }
    load()
  }, [])

  if (!about) return null

  return (
    <div className="about-page">

      <nav className="about-nav">
        <button className="nav-btn" onClick={() => navigate('/')}>Projects</button>
      </nav>

      <div className="about-box">
        <div className="about-left">
          <MediaItem url={about.imageUrl} alt="about" />
        </div>

        <div className="about-right">
          <p className="about-text">{about.text}</p>

          <div className="about-buttons">
            {about.buttons?.map((btn, i) => (
              btn.url ? (
                <a key={i} href={btn.url} target="_blank" rel="noreferrer" className="about-btn">
                  {btn.label}
                </a>
              ) : null
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}