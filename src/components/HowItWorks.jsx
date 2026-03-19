import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const STEPS = [
  {
    num: '01',
    title: 'Sign up free',
    desc: 'Create your account in 30 seconds with Google. No credit card, no catch.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <line x1="20" y1="8" x2="20" y2="14" />
        <line x1="23" y1="11" x2="17" y2="11" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Set your goals & budget',
    desc: 'Pick from 10+ goal templates or create your own. Add your recurring expenses.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Track, adjust, achieve',
    desc: 'Log daily expenses, watch your progress, and adjust your plan as life changes.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--info)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
      </svg>
    ),
  },
]

export default function HowItWorks() {
  const [ref, isVisible] = useIntersectionObserver()

  return (
    <section ref={ref} className={`how-it-works ${isVisible ? 'visible' : ''}`} id="how-it-works">
      <h2 className="section-title">How it works</h2>
      <p className="section-sub">Three steps. That's it.</p>

      <div className="steps">
        {/* Connecting line */}
        <svg className="steps-line" viewBox="0 0 800 4" preserveAspectRatio="none">
          <line x1="0" y1="2" x2="800" y2="2" stroke="var(--border)" strokeWidth="2" strokeDasharray="6 4" />
          <line x1="0" y1="2" x2="800" y2="2" stroke="var(--accent)" strokeWidth="2" className="steps-line-fill" />
        </svg>

        {STEPS.map((step, i) => (
          <div key={i} className="step" style={{ animationDelay: `${i * 0.15}s` }}>
            <div className="step-num-ring">
              <span className="step-num">{step.num}</span>
            </div>
            <div className="step-icon">{step.icon}</div>
            <h3 className="step-title">{step.title}</h3>
            <p className="step-desc">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
