// ─────────────────────────────────────────────
//  Añade aquí tus proyectos.
//  - id:    identificador único (usado en la URL)
//  - title: nombre del proyecto
//  - year:  año
//  - image: ruta relativa desde src/assets/projects/
//  - size:  'sm' | 'md' | 'lg'  (controla el tamaño de la tarjeta)
// ─────────────────────────────────────────────

import about_me        from '../assets/projects/about_me.png'
import animacion_gif   from '../assets/projects/animacion_gif.gif'
import as_gif          from '../assets/projects/as.gif'
import backbenchers    from '../assets/projects/backbenchers.png'
import boltonfood      from '../assets/projects/boltonfood.png'
import coomunidad_animacion from '../assets/projects/coomunidad_animacion.gif'
import mockup_carta    from '../assets/projects/mockup_carta.jpg'
import portada         from '../assets/projects/portada.png'
 
const projects = [
  {
    id: 'about_me',
    title: 'about_me',
    year: 2023,
    image: about_me,
    size: 'lg',
    featured: true,
    tags: ['Branding', 'Editorial Design', 'Motion Graphics', 'Web Design'],
    description: 'In my third year of graphic design school...',
    client: 'Academic',
    gallery: [],
  },
  {
    id: 'animacion_gif',
    title: 'animacion_gif',
    year: 2023,
    image: animacion_gif,
    size: 'lg',
    tags: ['Branding', 'Editorial Design', 'Motion Graphics', 'Web Design'],
    description: 'In my third year of graphic design school...',
    client: 'Academic',
    gallery: [],
  },
  {
    id: 'as',
    title: 'as',
    year: 2023,
    image: as_gif,
    size: 'lg',
    tags: ['Branding', 'Editorial Design', 'Motion Graphics', 'Web Design'],
    description: 'In my third year of graphic design school...',
    client: 'Academic',
    gallery: [],
  },
  {
    id: 'backbenchers',
    title: 'backbenchers',
    year: 2023,
    image: backbenchers,
    size: 'lg',
    tags: ['Branding', 'Editorial Design', 'Motion Graphics', 'Web Design'],
    description: 'In my third year of graphic design school...',
    client: 'Academic',
    gallery: [],
  },
  {
    id: 'boltonfood',
    title: 'boltonfood',
    year: 2023,
    image: boltonfood,
    size: 'lg',
    tags: ['Branding', 'Editorial Design', 'Motion Graphics', 'Web Design'],
    description: 'In my third year of graphic design school...',
    client: 'Academic',
    gallery: [],
  },
  {
    id: 'coomunidad_animacion',
    title: 'coomunidad_animacion',
    year: 2023,
    image: coomunidad_animacion,
    size: 'lg',
    tags: ['Branding', 'Editorial Design', 'Motion Graphics', 'Web Design'],
    description: 'In my third year of graphic design school...',
    client: 'Academic',
    gallery: [],
  },  
  {
    id: 'mockup_carta',
    title: 'mockup_carta',
    year: 2023,
    image: mockup_carta,
    size: 'lg',
    tags: ['Branding', 'Editorial Design', 'Motion Graphics', 'Web Design'],
    description: 'In my third year of graphic design school...',
    client: 'Academic',
    gallery: [],
  },
  {
    id: 'portada',
    title: 'portada',
    year: 2023,
    image: portada,
    size: 'lg',
    tags: ['Branding', 'Editorial Design', 'Motion Graphics', 'Web Design'],
    description: 'In my third year of graphic design school...',
    client: 'Academic',
    gallery: [],
  },
]
 
export default projects