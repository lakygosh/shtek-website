import Section from '../layout/Section'
import Container from '../layout/Container'
import SectionHeader from '../ui/SectionHeader'
import Card from '../ui/Card'
import './Privacy.css'

const PRIVACY_CARDS = [
  {
    icon: '🔒',
    title: 'Your data stays yours',
    description: 'We don\'t sell your data, show ads, or share anything with third parties. Your finances are nobody\'s business but yours.',
  },
  {
    icon: '🛡️',
    title: 'Bank-grade security',
    description: 'Built on Supabase with Row Level Security and encryption. Your data is protected at every layer.',
  },
  {
    icon: '👤',
    title: 'Minimal data collection',
    description: 'We only collect what\'s needed to make Shtek work. No tracking pixels, no analytics profiling, no data hoarding.',
  },
  {
    icon: '🇪🇺',
    title: 'GDPR-friendly',
    description: 'Want your data deleted? Done. Export it, delete it, leave anytime — no questions asked, no dark patterns.',
  },
]

export default function Privacy() {
  return (
    <Section id="privacy" ariaLabel="Privacy and security" className="privacy">
      <Container>
        <div className="anim-slide-up">
          <SectionHeader
            title="Your privacy, our priority"
            subtitle="We built Shtek with privacy-first principles. Here's what that means."
          />
        </div>

        <div className="privacy__grid">
          {PRIVACY_CARDS.map((card, i) => (
            <Card
              key={i}
              className="privacy__card anim-slide-up"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <span className="privacy__icon" aria-hidden="true">{card.icon}</span>
              <h3 className="privacy__title">{card.title}</h3>
              <p className="privacy__desc">{card.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  )
}
