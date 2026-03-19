import { useState } from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const FEATURES = [
  {
    id: 'dashboard',
    tab: 'Dashboard',
    tagline: 'Your finances at a glance',
    description: 'See your income, expenses, savings rate, and goal progress — all on one screen. No digging through menus.',
    bullets: ['Income vs expenses breakdown', 'Savings rate tracking', 'Goal progress cards'],
    mock: DashboardMock,
  },
  {
    id: 'daily-log',
    tab: 'Daily Log',
    tagline: 'Log expenses in seconds',
    description: 'Quick-add your daily spending with category tagging. See where your money goes with a beautiful donut chart. Supports both EUR and RSD.',
    bullets: ['Dual currency (EUR & RSD)', 'Category breakdown chart', 'Edit & delete entries'],
    mock: DailyLogMock,
  },
  {
    id: 'budget',
    tab: 'Budget',
    tagline: 'Plan every euro and dinar',
    description: 'Set up recurring expenses by frequency — daily, weekly, monthly, quarterly, or yearly. Assign priorities so you know what to cut first.',
    bullets: ['5 frequency options', '3 priority levels', 'Table & card views'],
    mock: BudgetMock,
  },
  {
    id: 'goals',
    tab: 'Goals',
    tagline: '10+ templates. Zero guesswork.',
    description: 'From housing with mortgage calculators to retirement with compound growth — pick a template and let Shtek do the math.',
    bullets: ['Mortgage & loan calculators', 'Compound growth projections', 'Deadline tracking'],
    mock: GoalsMock,
  },
  {
    id: 'ideal-life',
    tab: 'Ideal Life',
    tagline: 'Design the life you want',
    description: 'Define your dream lifestyle expenses. Shtek calculates the gross income you need and shows the gap between where you are and where you want to be.',
    bullets: ['Required income calculator', 'Income gap visualization', 'Salary growth projection'],
    mock: IdealLifeMock,
  },
]

export default function Features() {
  const [active, setActive] = useState(0)
  const [ref, isVisible] = useIntersectionObserver()

  const feature = FEATURES[active]
  const MockComponent = feature.mock

  return (
    <section ref={ref} className={`features ${isVisible ? 'visible' : ''}`} id="features">
      <div className="features-header">
        <h2 className="section-title">Everything you need to take control</h2>
        <p className="section-sub">One app. Every angle of your finances.</p>
      </div>

      <div className="features-tabs">
        {FEATURES.map((f, i) => (
          <button
            key={f.id}
            className={`features-tab ${i === active ? 'active' : ''}`}
            onClick={() => setActive(i)}
          >
            {f.tab}
          </button>
        ))}
      </div>

      <div className="features-panel">
        <div className="features-text" key={feature.id + '-text'}>
          <span className="features-tagline">{feature.tagline}</span>
          <p className="features-desc">{feature.description}</p>
          <ul className="features-bullets">
            {feature.bullets.map((b, i) => (
              <li key={i}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="features-mock" key={feature.id + '-mock'}>
          <MockComponent />
        </div>
      </div>
    </section>
  )
}

/* ─── Mock UI Components ───────────────────────────────────────── */

function DashboardMock() {
  return (
    <div className="fmock fmock-dashboard">
      <div className="fmock-row">
        <div className="fmock-stat-card">
          <span className="fmock-label">Net Income</span>
          <span className="fmock-val accent">€3,200</span>
        </div>
        <div className="fmock-stat-card">
          <span className="fmock-label">Total Expenses</span>
          <span className="fmock-val secondary">€2,150</span>
        </div>
      </div>
      <div className="fmock-savings-bar">
        <div className="fmock-savings-header">
          <span>Savings Rate</span>
          <span className="fmock-val accent">33%</span>
        </div>
        <div className="fmock-track">
          <div className="fmock-fill" style={{ width: '33%' }} />
        </div>
      </div>
      <div className="fmock-row fmock-goals-row">
        <div className="fmock-goal-chip"><span>🏠</span> House Fund<div className="fmock-mini-bar"><div style={{ width: '45%' }} /></div></div>
        <div className="fmock-goal-chip"><span>🚗</span> New Car<div className="fmock-mini-bar"><div style={{ width: '72%' }} /></div></div>
        <div className="fmock-goal-chip"><span>✈️</span> Vacation<div className="fmock-mini-bar"><div style={{ width: '28%' }} /></div></div>
      </div>
    </div>
  )
}

function DailyLogMock() {
  const entries = [
    { cat: 'Food', color: '#8FB996', desc: 'Groceries', amt: '€42.50' },
    { cat: 'Transport', color: '#B8C5E3', desc: 'Bus pass', amt: '€3.00' },
    { cat: 'Entertainment', color: '#D49A9A', desc: 'Cinema', amt: '€8.00' },
  ]
  return (
    <div className="fmock fmock-daily">
      <div className="fmock-daily-top">
        <div className="fmock-mini-donut">
          <svg width="90" height="90" viewBox="0 0 90 90">
            <circle cx="45" cy="45" r="34" fill="none" stroke="#8FB996" strokeWidth="10" strokeDasharray="80 214" transform="rotate(-90 45 45)" />
            <circle cx="45" cy="45" r="34" fill="none" stroke="#B8C5E3" strokeWidth="10" strokeDasharray="50 214" transform="rotate(44 45 45)" />
            <circle cx="45" cy="45" r="34" fill="none" stroke="#D49A9A" strokeWidth="10" strokeDasharray="30 214" transform="rotate(128 45 45)" />
          </svg>
          <span className="fmock-mini-donut-total">€53.50</span>
        </div>
        <div className="fmock-currency-badge">EUR ↔ RSD</div>
      </div>
      <div className="fmock-entry-list">
        {entries.map((e, i) => (
          <div key={i} className="fmock-entry" style={{ animationDelay: `${i * 0.12}s` }}>
            <span className="fmock-entry-dot" style={{ background: e.color }} />
            <div className="fmock-entry-info">
              <span>{e.desc}</span>
              <span className="fmock-entry-cat">{e.cat}</span>
            </div>
            <span className="fmock-entry-amt">{e.amt}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function BudgetMock() {
  const items = [
    { name: 'Rent', cat: 'Housing', color: '#D4C5A9', priority: 'Essential', amt: '€500', freq: 'Monthly' },
    { name: 'Groceries', cat: 'Food', color: '#8FB996', priority: 'Essential', amt: '€300', freq: 'Monthly' },
    { name: 'Gym', cat: 'Health', color: '#A8D8B9', priority: 'Important', amt: '€30', freq: 'Monthly' },
    { name: 'Netflix', cat: 'Subs', color: '#A0C4D4', priority: 'Nice-to-Have', amt: '€13', freq: 'Monthly' },
  ]
  const prioColors = { Essential: '#D49A9A', Important: '#D4C5A9', 'Nice-to-Have': '#8FB996' }
  return (
    <div className="fmock fmock-budget">
      {items.map((item, i) => (
        <div key={i} className="fmock-budget-row" style={{ animationDelay: `${i * 0.1}s` }}>
          <span className="fmock-entry-dot" style={{ background: item.color }} />
          <span className="fmock-budget-name">{item.name}</span>
          <span className="fmock-badge" style={{ '--badge-c': prioColors[item.priority] }}>{item.priority}</span>
          <span className="fmock-budget-freq">{item.freq}</span>
          <span className="fmock-budget-amt">{item.amt}</span>
        </div>
      ))}
      <div className="fmock-budget-total">
        <span>Monthly Total</span>
        <span className="fmock-val secondary">€843</span>
      </div>
    </div>
  )
}

function GoalsMock() {
  const goals = [
    { icon: '🏠', name: 'Dream Home', tmpl: 'Housing', pct: 45 },
    { icon: '🚗', name: 'New Car', tmpl: 'Car', pct: 72 },
    { icon: '🛟', name: 'Safety Net', tmpl: 'Emergency', pct: 88 },
    { icon: '🏖️', name: 'Retirement', tmpl: 'Retirement', pct: 12 },
  ]
  return (
    <div className="fmock fmock-goals">
      {goals.map((g, i) => (
        <div key={i} className="fmock-goal-card" style={{ animationDelay: `${i * 0.1}s` }}>
          <div className="fmock-goal-top">
            <span className="fmock-goal-icon">{g.icon}</span>
            <div>
              <span className="fmock-goal-name">{g.name}</span>
              <span className="fmock-goal-tmpl">{g.tmpl}</span>
            </div>
            <span className="fmock-goal-pct">{g.pct}%</span>
          </div>
          <div className="fmock-track">
            <div className="fmock-fill" style={{ width: `${g.pct}%`, background: g.pct >= 80 ? 'var(--accent)' : 'var(--info)' }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function IdealLifeMock() {
  const items = [
    { cat: 'Housing', value: 1200, max: 1200, color: '#D4C5A9' },
    { cat: 'Transport', value: 400, max: 1200, color: '#B8C5E3' },
    { cat: 'Travel', value: 600, max: 1200, color: '#C5D4A0' },
    { cat: 'Food', value: 500, max: 1200, color: '#8FB996' },
    { cat: 'Fun', value: 300, max: 1200, color: '#D49A9A' },
  ]
  const total = items.reduce((s, i) => s + i.value, 0)
  return (
    <div className="fmock fmock-ideal">
      <div className="fmock-ideal-bars">
        {items.map((item, i) => (
          <div key={i} className="fmock-ideal-row" style={{ animationDelay: `${i * 0.12}s` }}>
            <span className="fmock-ideal-cat">{item.cat}</span>
            <div className="fmock-track fmock-ideal-track">
              <div className="fmock-fill" style={{ width: `${(item.value / item.max) * 100}%`, background: item.color }} />
            </div>
            <span className="fmock-ideal-val">€{item.value}</span>
          </div>
        ))}
      </div>
      <div className="fmock-ideal-summary">
        <div className="fmock-ideal-stat">
          <span className="fmock-label">Required Income</span>
          <span className="fmock-val info">€{total}/mo</span>
        </div>
        <div className="fmock-ideal-stat">
          <span className="fmock-label">Income Gap</span>
          <span className="fmock-val error">-€800</span>
        </div>
        <div className="fmock-ideal-stat">
          <span className="fmock-label">Growth Needed</span>
          <span className="fmock-val secondary">+36%</span>
        </div>
      </div>
    </div>
  )
}
