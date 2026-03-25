import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { useCountUp } from '../../hooks/useCountUp'
import Container from '../layout/Container'
import './TrustBar.css'

export default function TrustBar() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.15 })
  const users = useCountUp(500, 800, isVisible)
  const currencies = useCountUp(2, 600, isVisible)

  const items = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      value: `${users}+`,
      label: 'Beta Users',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--info)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      value: 'Zero',
      label: 'Data Tracking',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
      ),
      value: `EUR + RSD`,
      label: 'Dual Currency',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      ),
      value: 'Free',
      label: 'No Card Needed',
    },
  ]

  return (
    <section
      ref={ref}
      className={`trust-bar ${isVisible ? 'visible' : ''}`}
      aria-label="Social proof"
    >
      <Container>
        <div className="trust-bar__inner">
          {items.map((item, i) => (
            <div
              key={i}
              className="trust-bar__item anim-slide-up"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <div className="trust-bar__icon" aria-hidden="true">
                {item.icon}
              </div>
              <div className="trust-bar__text">
                <span className="trust-bar__value">{item.value}</span>
                <span className="trust-bar__label">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
