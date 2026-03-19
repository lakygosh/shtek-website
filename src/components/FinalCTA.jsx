import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

export default function FinalCTA() {
  const [ref, isVisible] = useIntersectionObserver()

  return (
    <section ref={ref} className={`final-cta ${isVisible ? 'visible' : ''}`}>
      <div className="final-cta-inner">
        <h2 className="final-cta-title">Your financial plan starts today.</h2>
        <p className="final-cta-sub">Free. Private. Built for real life.</p>
        <a href="https://app.shtek.me/" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-xl">
          <span>Open Shtek</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          <span className="btn-shimmer" />
        </a>
        <p className="final-cta-note">No credit card. No ads. Just your plan.</p>
      </div>
    </section>
  )
}
