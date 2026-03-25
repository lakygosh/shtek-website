import AnimatedDashboard from '../mocks/AnimatedDashboard'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import './Hero.css'

const CTA_URL = 'https://app.shtek.me/?utm_source=landing&utm_medium=cta&utm_campaign=hero'

const TRUST_ITEMS = [
  { icon: '👥', text: '500+ users' },
  { icon: '🔒', text: 'No tracking' },
  { icon: '💱', text: 'EUR & RSD' },
]

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

        <div className="hero__visual">
          <AnimatedDashboard />
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
