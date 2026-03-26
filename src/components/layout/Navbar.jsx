import { useState, useEffect, useRef, useCallback } from 'react'
import Button from '../ui/Button'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'Features', href: 'features' },
  { label: 'How It Works', href: 'how-it-works' },
  { label: 'Pricing', href: 'pricing' },
  { label: 'FAQ', href: 'faq' },
  { label: 'About', href: 'about' },
]

const CTA_URL = 'https://app.shtek.me/?utm_source=landing&utm_medium=nav&utm_campaign=navbar'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const menuRef = useRef(null)
  const hamburgerRef = useRef(null)

  // Scroll detection for glass effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section tracking via Intersection Observer
  useEffect(() => {
    const sectionIds = ['features', 'how-it-works', 'pricing', 'faq', 'about']
    const observers = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return
    const handleClick = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target)
      ) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [menuOpen])

  // Close menu on Escape
  useEffect(() => {
    if (!menuOpen) return
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        hamburgerRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [menuOpen])

  // Lock body scroll when mobile menu open & focus first item
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      // Move focus to first menu item for accessibility
      requestAnimationFrame(() => {
        const firstLink = menuRef.current?.querySelector('button, a')
        firstLink?.focus()
      })
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrollTo = useCallback((id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  // Focus trap for mobile menu
  const handleMenuKeyDown = (e) => {
    if (e.key !== 'Tab' || !menuRef.current) return
    const focusable = menuRef.current.querySelectorAll('button, a, [tabindex]:not([tabindex="-1"])')
    if (focusable.length === 0) return

    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  return (
    <header role="banner">
      <nav
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${menuOpen ? 'navbar--menu-open' : ''}`}
        aria-label="Main navigation"
      >
        <div className="navbar__inner">
          <a href="/" className="navbar__logo" aria-label="Shtek home">
            <span className="navbar__logo-icon" aria-hidden="true">✦</span>
            <span>shtek</span>
          </a>

          {/* Desktop nav links */}
          <div className="navbar__links" role="list">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                role="listitem"
                className={`navbar__link ${activeSection === link.href ? 'navbar__link--active' : ''}`}
                onClick={() => scrollTo(link.href)}
                aria-current={activeSection === link.href ? 'true' : undefined}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <Button
            variant="secondary"
            size="default"
            href={CTA_URL}
            external
            className="navbar__cta"
          >
            Start Free
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Button>

          {/* Hamburger button */}
          <button
            ref={hamburgerRef}
            className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          ref={menuRef}
          className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}
          role="navigation"
          aria-label="Mobile navigation"
          onKeyDown={handleMenuKeyDown}
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              className={`navbar__mobile-link ${activeSection === link.href ? 'navbar__mobile-link--active' : ''}`}
              onClick={() => scrollTo(link.href)}
              aria-current={activeSection === link.href ? 'true' : undefined}
            >
              {link.label}
            </button>
          ))}
          <Button
            variant="primary"
            fullWidth
            href={CTA_URL}
            external
            shimmer
            className="navbar__mobile-cta"
          >
            Start Planning — It's Free
          </Button>
        </div>
      </nav>
    </header>
  )
}
