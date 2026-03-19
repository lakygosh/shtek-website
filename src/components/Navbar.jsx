import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-inner">
        <a href="/" className="navbar-logo" aria-label="Shtek home">
          <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
            <rect x="6" y="22" width="8" height="22" rx="3" fill="#8FB996" opacity="0.6" />
            <rect x="20" y="12" width="8" height="32" rx="3" fill="#8FB996" opacity="0.8" />
            <rect x="34" y="4" width="8" height="40" rx="3" fill="#8FB996" />
          </svg>
          <span>Shtek</span>
        </a>

        <div className="navbar-links desktop-only">
          <button onClick={() => scrollTo('features')}>Features</button>
          <button onClick={() => scrollTo('how-it-works')}>How It Works</button>
        </div>

        <a href="https://app.shtek.me/" target="_blank" rel="noopener noreferrer" className="navbar-cta desktop-only">
          Open App
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>

        <button
          className={`navbar-hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`navbar-mobile ${menuOpen ? 'navbar-mobile-open' : ''}`}>
        <button onClick={() => scrollTo('features')}>Features</button>
        <button onClick={() => scrollTo('how-it-works')}>How It Works</button>
        <a href="https://app.shtek.me/" target="_blank" rel="noopener noreferrer" className="navbar-cta">
          Open App →
        </a>
      </div>
    </nav>
  )
}
