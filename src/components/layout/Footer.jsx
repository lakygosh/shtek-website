import Container from './Container'
import './Footer.css'

const SHTEK_LOGO = (
  <svg width="22" height="22" viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <rect x="6" y="22" width="8" height="22" rx="3" fill="#8FB996" opacity="0.6" />
    <rect x="20" y="12" width="8" height="32" rx="3" fill="#8FB996" opacity="0.8" />
    <rect x="34" y="4" width="8" height="40" rx="3" fill="#8FB996" />
  </svg>
)

const CTA_URL = 'https://app.shtek.me/?utm_source=landing&utm_medium=footer&utm_campaign=nav'

const PRODUCT_LINKS = [
  { label: 'Open App', href: CTA_URL, external: true },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
]

const RESOURCE_LINKS = [
  { label: 'FAQ', href: '#faq' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: 'mailto:lazarfin10@gmail.com' },
]

const LEGAL_LINKS = [
  { label: 'Privacy', href: '#privacy' },
]

function FooterLinkGroup({ title, links }) {
  return (
    <div className="footer__col">
      <h4 className="footer__col-title">{title}</h4>
      <ul className="footer__links">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="footer__link"
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="footer">
      <Container>
        <div className="footer__grid">
          {/* Brand Column */}
          <div className="footer__col footer__col--brand">
            <div className="footer__brand">
              {SHTEK_LOGO}
              <span className="footer__brand-name">Shtek</span>
            </div>
            <p className="footer__tagline">
              Plan your money. Build your life.
            </p>
            <p className="footer__origin">Made in Serbia 🇷🇸</p>
          </div>

          {/* Link Columns */}
          <FooterLinkGroup title="Product" links={PRODUCT_LINKS} />
          <FooterLinkGroup title="Resources" links={RESOURCE_LINKS} />
          <FooterLinkGroup title="Legal" links={LEGAL_LINKS} />
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <span className="footer__copyright">
            © {new Date().getFullYear()} Shtek. All rights reserved.
          </span>
          <div className="footer__social">
            {/* Social links placeholder */}
          </div>
        </div>
      </Container>
    </footer>
  )
}
