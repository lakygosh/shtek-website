import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import Container from '../layout/Container'
import Button from '../ui/Button'
import './Manifesto.css'

const CTA_URL = 'https://app.shtek.me/?utm_source=landing&utm_medium=cta&utm_campaign=manifesto'

export default function Manifesto() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.15 })

  return (
    <section
      ref={ref}
      className={`manifesto ${isVisible ? 'visible' : ''}`}
      aria-label="Our philosophy"
    >
      <div className="manifesto__bg" aria-hidden="true" />
      <Container>
        <div className="manifesto__inner anim-slide-up">
          <blockquote className="manifesto__quote">
            <p className="manifesto__text">
              Most apps track where your money <em>went</em>.
              <br />
              Shtek helps you decide where it <em>should go</em>.
            </p>
          </blockquote>
          <Button
            variant="primary"
            size="lg"
            href={CTA_URL}
            external
            shimmer
            className="manifesto__cta"
          >
            Start Planning
          </Button>
        </div>
      </Container>
    </section>
  )
}
