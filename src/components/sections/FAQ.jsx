import Section from '../layout/Section'
import Container from '../layout/Container'
import SectionHeader from '../ui/SectionHeader'
import Accordion from '../ui/Accordion'
import './FAQ.css'

const FAQ_ITEMS = [
  {
    question: 'Is Shtek really free?',
    answer: 'Yes, 100% free. No hidden fees, no premium wall, no ads. Every feature you see is available to everyone. We believe financial tools should be accessible to all.',
  },
  {
    question: 'Do you sell my data?',
    answer: "No, we never sell your data. Your financial information stays private and secure. We don't run ads or share data with third parties. Period.",
  },
  {
    question: 'What currencies are supported?',
    answer: 'Currently we support EUR and RSD (Serbian Dinar) with real-time conversion. More currencies are on the roadmap based on user demand.',
  },
  {
    question: 'Can I use it on my phone?',
    answer: 'Yes, Shtek is fully responsive and works great on any device — phone, tablet, or desktop. Just open it in your browser, no app store needed.',
  },
  {
    question: 'How do I set up a savings goal?',
    answer: 'Go to the Goals tab, pick a template (housing, car, emergency fund, retirement, and more), set your target amount and deadline, and Shtek calculates your monthly contribution automatically.',
  },
  {
    question: 'Who built Shtek?',
    answer: 'Shtek is a solo project built from Serbia with love. One developer, one mission: make personal finance simple, beautiful, and accessible for everyone in the region.',
  },
  {
    question: 'Will there be a Pro plan?',
    answer: "We're considering a Pro plan with advanced features like CSV export, custom categories, and multi-device sync. The free plan will always remain fully functional.",
  },
  {
    question: 'Can I export my data?',
    answer: "Coming soon! CSV and PDF export are on our near-term roadmap. Your data is yours — you'll always be able to take it with you.",
  },
]

export default function FAQ() {
  return (
    <Section id="faq" ariaLabel="Frequently Asked Questions">
      <Container width="narrow">
        <SectionHeader
          title="Frequently asked questions"
          subtitle="Got questions? We've got answers."
        />

        <div className="faq__content">
          <Accordion items={FAQ_ITEMS} />
        </div>
      </Container>
    </Section>
  )
}
