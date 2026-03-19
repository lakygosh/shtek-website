export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <svg width="22" height="22" viewBox="0 0 48 48" fill="none">
            <rect x="6" y="22" width="8" height="22" rx="3" fill="#8FB996" opacity="0.6" />
            <rect x="20" y="12" width="8" height="32" rx="3" fill="#8FB996" opacity="0.8" />
            <rect x="34" y="4" width="8" height="40" rx="3" fill="#8FB996" />
          </svg>
          <span>Shtek</span>
        </div>

        <div className="footer-links">
          <a href="https://app.shtek.me/" target="_blank" rel="noopener noreferrer">Open App</a>
          <a href="mailto:lazarfin10@gmail.com">Contact</a>
        </div>

        <div className="footer-meta">
          <span>Made in Serbia</span>
          <span>© {new Date().getFullYear()} Shtek</span>
        </div>
      </div>
    </footer>
  )
}
