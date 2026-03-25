import Section from '../layout/Section'
import Container from '../layout/Container'
import SectionHeader from '../ui/SectionHeader'
import Button from '../ui/Button'
import Card from '../ui/Card'
import './IdealLifePromo.css'

const CATEGORIES = [
  { cat: 'Housing', value: 1200, color: '#D4C5A9', icon: '🏠' },
  { cat: 'Transport', value: 400, color: '#B8C5E3', icon: '🚗' },
  { cat: 'Travel', value: 600, color: '#C5D4A0', icon: '✈️' },
  { cat: 'Food', value: 500, color: '#8FB996', icon: '🍕' },
  { cat: 'Fun', value: 300, color: '#D49A9A', icon: '🎉' },
]

const TOTAL_REQUIRED = CATEGORIES.reduce((s, c) => s + c.value, 0)
const CURRENT_INCOME = 2400
const GAP = TOTAL_REQUIRED - CURRENT_INCOME
const CTA_URL = 'https://app.shtek.me/?utm_source=landing&utm_medium=cta&utm_campaign=ideal-life'
const MAX_VALUE = Math.max(...CATEGORIES.map((c) => c.value))

export default function IdealLifePromo() {
  return (
    <Section id="ideal-life" ariaLabel="Ideal Life Promo" variant="alt">
      <Container>
        <SectionHeader
          title="Design the life you actually want"
          subtitle="Set your dream lifestyle. Shtek calculates the income you need — and shows you the gap."
        />

        <div className="ideal-promo__content">
          {/* Category bars */}
          <Card className="ideal-promo__bars-card">
            <h3 className="ideal-promo__bars-title">Monthly Ideal Spending</h3>
            <div className="ideal-promo__bars">
              {CATEGORIES.map((item, i) => (
                <div
                  key={item.cat}
                  className="ideal-promo__bar-row"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <span className="ideal-promo__bar-icon" aria-hidden="true">{item.icon}</span>
                  <span className="ideal-promo__bar-label">{item.cat}</span>
                  <div className="ideal-promo__bar-track">
                    <div
                      className="ideal-promo__bar-fill"
                      style={{
                        width: `${(item.value / MAX_VALUE) * 100}%`,
                        background: item.color,
                      }}
                    />
                  </div>
                  <span className="ideal-promo__bar-value">€{item.value}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Income summary */}
          <div className="ideal-promo__summary">
            <Card className="ideal-promo__stat-card ideal-promo__stat-card--required">
              <span className="ideal-promo__stat-label">Required Income</span>
              <span className="ideal-promo__stat-value ideal-promo__stat-value--info">€{TOTAL_REQUIRED}<small>/mo</small></span>
            </Card>

            <Card className="ideal-promo__stat-card ideal-promo__stat-card--current">
              <span className="ideal-promo__stat-label">Current Income</span>
              <span className="ideal-promo__stat-value">€{CURRENT_INCOME}<small>/mo</small></span>
            </Card>

            <Card className="ideal-promo__stat-card ideal-promo__stat-card--gap" accentBorder>
              <span className="ideal-promo__stat-label">Income Gap</span>
              <span className="ideal-promo__stat-value ideal-promo__stat-value--error">-€{GAP}<small>/mo</small></span>
              <div className="ideal-promo__gap-bar">
                <div
                  className="ideal-promo__gap-fill"
                  style={{ width: `${(CURRENT_INCOME / TOTAL_REQUIRED) * 100}%` }}
                />
              </div>
              <span className="ideal-promo__gap-text">
                You need <strong>+{Math.round((GAP / CURRENT_INCOME) * 100)}%</strong> income growth
              </span>
            </Card>

            <Button
              variant="primary"
              size="lg"
              href={CTA_URL}
              external
              className="ideal-promo__cta"
            >
              Design Your Ideal Life →
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}
