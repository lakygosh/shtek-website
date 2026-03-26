import Button from '../ui/Button'
import Badge from '../ui/Badge'
import './Hero.css'

const CTA_URL = 'https://app.shtek.me/?utm_source=landing&utm_medium=cta&utm_campaign=hero'

const TRUST_ITEMS = [
  { icon: '👥', text: '500+ users' },
  { icon: '🔒', text: 'No tracking' },
  { icon: '💱', text: 'EUR & RSD' },
]

function HeroDashboardMock() {
  const stats = [
    { label: 'Net Income', value: '€3,200', color: 'var(--accent)' },
    { label: 'Expenses', value: '€2,150', color: 'var(--secondary)' },
    { label: 'Surplus', value: '€1,050', color: 'var(--accent)' },
  ]

  const bars = [
    { label: 'Housing', pct: 35, color: '#D4C5A9' },
    { label: 'Food', pct: 20, color: '#8FB996' },
    { label: 'Transport', pct: 15, color: '#B8C5E3' },
    { label: 'Utilities', pct: 12, color: '#C9B8D9' },
    { label: 'Fun', pct: 10, color: '#D49A9A' },
  ]

  const goals = [
    { icon: '🏠', name: 'House Fund', pct: 45 },
    { icon: '🚗', name: 'New Car', pct: 72 },
    { icon: '🛟', name: 'Safety Net', pct: 88 },
  ]

  return (
    <div className="hero-mock">
      {/* Header */}
      <div className="hero-mock__header">
        <span className="hero-mock__logo">💰</span>
        <span className="hero-mock__title">Money Planner</span>
        <span className="hero-mock__dot" />
      </div>

      {/* Stats row */}
      <div className="hero-mock__stats">
        {stats.map((s, i) => (
          <div key={i} className="hero-mock__stat">
            <span className="hero-mock__stat-label">{s.label}</span>
            <span className="hero-mock__stat-value" style={{ color: s.color }}>{s.value}</span>
          </div>
        ))}
      </div>

      {/* Savings rate */}
      <div className="hero-mock__savings">
        <div className="hero-mock__savings-row">
          <span>Savings Rate</span>
          <span style={{ color: 'var(--accent)', fontWeight: 600 }}>33%</span>
        </div>
        <div className="hero-mock__track">
          <div className="hero-mock__fill" style={{ width: '33%' }} />
        </div>
      </div>

      {/* Category bars */}
      <div className="hero-mock__categories">
        {bars.map((b, i) => (
          <div key={i} className="hero-mock__cat-row">
            <span className="hero-mock__cat-name">{b.label}</span>
            <div className="hero-mock__cat-track">
              <div className="hero-mock__cat-fill" style={{ width: `${b.pct}%`, background: b.color }} />
            </div>
            <span className="hero-mock__cat-pct">{b.pct}%</span>
          </div>
        ))}
      </div>

      {/* Goals */}
      <div className="hero-mock__goals">
        {goals.map((g, i) => (
          <div key={i} className="hero-mock__goal">
            <span>{g.icon}</span>
            <span className="hero-mock__goal-name">{g.name}</span>
            <div className="hero-mock__goal-track">
              <div className="hero-mock__goal-fill" style={{ width: `${g.pct}%`, background: g.pct >= 80 ? 'var(--accent)' : 'var(--info)' }} />
            </div>
            <span className="hero-mock__goal-pct">{g.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Hero() {
  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" id="hero" aria-label="Hero">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__gradient" />
      </div>

      <div className="hero__inner">
        <div className="hero__text">
          <Badge variant="beta" className="hero__badge anim-badge">
            ✦ Beta — Free to use
          </Badge>

          <h1 className="hero__headline">
            <span className="hero__word">Know</span>
            <span className="hero__word">exactly</span>
            <span className="hero__word">where</span>
            <span className="hero__word">your</span>
            <span className="hero__word">money</span>
            <span className="hero__word hero__word--accent">goes.</span>
          </h1>

          <p className="hero__subtitle">
            Budget, track daily spending, and plan the life you actually want. Made for EUR & RSD.
          </p>

          <div className="hero__ctas">
            <Button
              variant="primary"
              size="lg"
              href={CTA_URL}
              external
              shimmer
              className="hero__cta-primary"
            >
              Start Planning — It's Free
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={scrollToHowItWorks}
              className="hero__cta-secondary"
            >
              See How It Works
            </Button>
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <HeroDashboardMock />
        </div>

        <div className="hero__trust">
          {TRUST_ITEMS.map((item, i) => (
            <span key={i} className="hero__trust-item">
              <span aria-hidden="true">{item.icon}</span> {item.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
