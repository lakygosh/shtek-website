import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import Container from '../layout/Container'
import Button from '../ui/Button'
import './FinalCTA.css'

const CTA_URL = 'https://app.shtek.me/?utm_source=landing&utm_medium=cta&utm_campaign=final'

export default function FinalCTA() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.15 })

  return (
    <section
      ref={ref}
      className={`final-cta ${isVisible ? 'visible' : ''}`}
      aria-label="Get started"
    >
      <div className="final-cta__bg" aria-hidden="true" />
      <Container>
        <div className="final-cta__inner anim-slide-up">
          <h2 className="final-cta__title">Your financial plan starts today.</h2>
          <p className="final-cta__subtitle">Free. Private. Built for real life.</p>
          <Button
            variant="primary"
            size="xl"
            href={CTA_URL}
            external
            shimmer
            className="final-cta__btn"
          >
            Open Shtek
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Button>
          <p className="final-cta__note">No credit card. No ads. Just your plan.</p>
        </div>
      </Container>
    </section>
  )
}
