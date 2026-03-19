import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

export default function Manifesto() {
  const [ref, isVisible] = useIntersectionObserver()

  return (
    <section ref={ref} className={`manifesto ${isVisible ? 'visible' : ''}`}>
      <div className="manifesto-bg" />
      <div className="manifesto-inner">
        <p className="manifesto-text">
          Most apps track where your money <em>went</em>.
          <br />
          Shtek helps you decide where it <em>should go</em>.
        </p>
        <a href="https://app.shtek.me/" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg manifesto-cta">
          <span>Start Planning</span>
          <span className="btn-shimmer" />
        </a>
      </div>
    </section>
  )
}
