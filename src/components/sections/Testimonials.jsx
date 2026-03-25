import Section from '../layout/Section'
import Container from '../layout/Container'
import SectionHeader from '../ui/SectionHeader'
import Card from '../ui/Card'
import './Testimonials.css'

const TESTIMONIALS = [
  {
    quote: 'Finally an app that helps me plan forward, not just look back.',
    name: 'Marko',
    age: 28,
    city: 'Belgrade',
    stars: 5,
  },
  {
    quote: 'The Ideal Life feature changed how I think about my salary.',
    name: 'Ana',
    age: 31,
    city: 'Novi Sad',
    stars: 5,
  },
  {
    quote: 'Simple, dark, no ads. Exactly what I needed.',
    name: 'Stefan',
    age: 25,
    city: 'Niš',
    stars: 5,
  },
]

function StarRating({ count }) {
  return (
    <div className="testimonial__stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }, (_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="var(--accent)"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <Section id="testimonials" ariaLabel="Testimonials">
      <Container>
        <SectionHeader
          title="What early users say"
          subtitle="Real people. Real feedback. Real results."
        />

        <div className="testimonials__grid">
          {TESTIMONIALS.map((t, i) => (
            <Card
              key={i}
              variant="testimonial"
              className="testimonial__card"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <span className="testimonial__quote-mark" aria-hidden="true">"</span>
              <blockquote className="testimonial__quote">{t.quote}</blockquote>
              <StarRating count={t.stars} />
              <div className="testimonial__author">
                <span className="testimonial__name">{t.name}</span>
                <span className="testimonial__meta">{t.age}, {t.city}</span>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  )
}
