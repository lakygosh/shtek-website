import AnimatedDashboard from './AnimatedDashboard'

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <div className="hero-gradient" />
      </div>

      <div className="hero-inner">
        <div className="hero-text">
          <h1 className="hero-headline">
            <span className="hero-word">Know</span>
            <span className="hero-word">exactly</span>
            <span className="hero-word">where</span>
            <span className="hero-word">your</span>
            <span className="hero-word">money</span>
            <span className="hero-word hero-word-accent">goes.</span>
          </h1>
          <p className="hero-sub">
            Budget, track daily spending, and plan the life you actually want.
          </p>
          <div className="hero-ctas">
            <a href="https://app.shtek.me/" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
              <span>Start Planning — It's Free</span>
              <span className="btn-shimmer" />
            </a>
            <button
              className="btn btn-ghost btn-lg"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See How It Works
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <AnimatedDashboard />
        </div>
      </div>
    </section>
  )
}
