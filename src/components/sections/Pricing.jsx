import Section from '../layout/Section'
import Container from '../layout/Container'
import SectionHeader from '../ui/SectionHeader'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import './Pricing.css'

const FREE_FEATURES = [
  'Dashboard overview',
  'Daily expense logging',
  'Budget planning (5 frequencies)',
  'Savings goals with templates',
  'Ideal Life calculator',
  'Dual currency (EUR & RSD)',
  'Dark mode by default',
  'No ads, ever',
]

const PRO_FEATURES = [
  'Everything in Free',
  'CSV & PDF export',
  'Custom categories',
  'Advanced analytics',
  'Priority support',
  'Multi-device sync',
]

const CTA_URL = 'https://app.shtek.me/?utm_source=landing&utm_medium=cta&utm_campaign=pricing'

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

export default function Pricing() {
  return (
    <Section id="pricing" ariaLabel="Pricing" variant="alt">
      <Container width="narrow">
        <SectionHeader
          title="Transparent pricing"
          subtitle="No hidden fees. No premium wall. Just a free app that works."
        />

        <div className="pricing__grid">
          {/* Free Card */}
          <Card variant="featured" className="pricing__card pricing__card--free">
            <div className="pricing__card-header">
              <Badge variant="free">Free Forever</Badge>
              <h3 className="pricing__price">€0<span className="pricing__period">/month</span></h3>
              <p className="pricing__desc">Everything you need to take control of your finances.</p>
            </div>
            <ul className="pricing__features">
              {FREE_FEATURES.map((f, i) => (
                <li key={i} className="pricing__feature">
                  <CheckIcon />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Button
              variant="primary"
              size="lg"
              href={CTA_URL}
              external
              fullWidth
              shimmer
            >
              Start Free
            </Button>
          </Card>

          {/* Pro Card */}
          <Card className="pricing__card pricing__card--pro">
            <div className="pricing__card-header">
              <Badge variant="coming-soon">Coming Soon</Badge>
              <h3 className="pricing__price pricing__price--dimmed">Pro<span className="pricing__period"> — TBD</span></h3>
              <p className="pricing__desc">Advanced features for power users. We're building it.</p>
            </div>
            <ul className="pricing__features">
              {PRO_FEATURES.map((f, i) => (
                <li key={i} className="pricing__feature pricing__feature--dimmed">
                  <CheckIcon />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Button variant="ghost" size="lg" fullWidth>
              Notify Me
            </Button>
          </Card>
        </div>
      </Container>
    </Section>
  )
}
