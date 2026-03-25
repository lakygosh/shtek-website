import { useCountUp } from '../../hooks/useCountUp'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

export default function AnimatedDashboard() {
  const [ref, isVisible] = useIntersectionObserver()
  const income = useCountUp(3200, 1800, isVisible)
  const expenses = useCountUp(2150, 1800, isVisible)
  const savingsRate = useCountUp(33, 2000, isVisible)

  const barData = [
    { label: 'Mon', h: 35, color: '#8FB996' },
    { label: 'Tue', h: 55, color: '#D4C5A9' },
    { label: 'Wed', h: 25, color: '#8FB996' },
    { label: 'Thu', h: 70, color: '#B8C5E3' },
    { label: 'Fri', h: 45, color: '#D4C5A9' },
    { label: 'Sat', h: 80, color: '#D49A9A' },
    { label: 'Sun', h: 30, color: '#8FB996' },
  ]

  const categories = [
    { pct: 35, color: '#D4C5A9', label: 'Housing' },
    { pct: 20, color: '#8FB996', label: 'Food' },
    { pct: 15, color: '#B8C5E3', label: 'Transport' },
    { pct: 12, color: '#C9B8D9', label: 'Utilities' },
    { pct: 10, color: '#D49A9A', label: 'Fun' },
    { pct: 8, color: '#E8C4A0', label: 'Other' },
  ]
  const radius = 52
  const circumference = 2 * Math.PI * radius
  let accum = 0

  return (
    <div ref={ref} className={`mock-dashboard ${isVisible ? 'visible' : ''}`} aria-hidden="true">
      {/* Top stat row */}
      <div className="mock-stats">
        <div className="mock-stat">
          <span className="mock-stat-label">Net Income</span>
          <span className="mock-stat-value accent">€{income.toLocaleString()}</span>
        </div>
        <div className="mock-stat">
          <span className="mock-stat-label">Expenses</span>
          <span className="mock-stat-value secondary">€{expenses.toLocaleString()}</span>
        </div>
        <div className="mock-stat">
          <span className="mock-stat-label">Surplus</span>
          <span className="mock-stat-value accent">€{(income - expenses).toLocaleString()}</span>
        </div>
      </div>

      {/* Middle row: donut + savings rate */}
      <div className="mock-middle">
        <div className="mock-donut-area">
          <svg width="130" height="130" viewBox="0 0 130 130">
            {categories.map((cat, i) => {
              const dash = (cat.pct / 100) * circumference
              const gap = circumference - dash
              const rotation = (accum / 100) * 360 - 90
              accum += cat.pct
              return (
                <circle
                  key={cat.label}
                  cx="65" cy="65" r={radius}
                  fill="none"
                  stroke={cat.color}
                  strokeWidth="14"
                  strokeDasharray={`${dash} ${gap}`}
                  transform={`rotate(${rotation} 65 65)`}
                  className="mock-donut-segment"
                  style={{ animationDelay: `${0.3 + i * 0.12}s` }}
                />
              )
            })}
          </svg>
          <div className="mock-donut-center">
            <span className="mock-donut-total">€{expenses.toLocaleString()}</span>
            <span className="mock-donut-sub">total</span>
          </div>
        </div>

        <div className="mock-savings-ring-area">
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="var(--border)" strokeWidth="8" />
            <circle
              cx="50" cy="50" r="40"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(savingsRate / 100) * 251.3} 251.3`}
              transform="rotate(-90 50 50)"
              className="mock-progress-ring"
            />
          </svg>
          <div className="mock-ring-center">
            <span className="mock-ring-value">{savingsRate}%</span>
            <span className="mock-ring-label">saved</span>
          </div>
        </div>
      </div>

      {/* Bar chart */}
      <div className="mock-bars">
        {barData.map((bar, i) => (
          <div key={bar.label} className="mock-bar-col">
            <div
              className="mock-bar"
              style={{
                height: `${bar.h}%`,
                background: bar.color,
                animationDelay: `${0.6 + i * 0.08}s`,
              }}
            />
            <span className="mock-bar-label">{bar.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
