import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { useCountUp } from '../hooks/useCountUp'

export default function TrustBar() {
  const [ref, isVisible] = useIntersectionObserver()
  const templates = useCountUp(10, 1200, isVisible)
  const currencies = useCountUp(2, 800, isVisible)

  const items = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      value: `${templates}+`,
      label: 'Goal Templates',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
      ),
      value: `${currencies}`,
      label: 'Currencies (EUR & RSD)',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--info)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      value: '100%',
      label: 'Free · No Credit Card',
    },
  ]

  return (
    <section ref={ref} className={`trust-bar ${isVisible ? 'visible' : ''}`}>
      <div className="trust-inner">
        {items.map((item, i) => (
          <div key={i} className="trust-item" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="trust-icon">{item.icon}</div>
            <div className="trust-text">
              <span className="trust-value">{item.value}</span>
              <span className="trust-label">{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
