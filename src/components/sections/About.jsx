import Section from '../layout/Section'
import Container from '../layout/Container'
import Card from '../ui/Card'
import './About.css'

export default function About() {
  return (
    <Section id="about" ariaLabel="About the founder" className="about">
      <Container>
        <Card className="about__card">
          <div className="about__layout">
            {/* Photo placeholder */}
            <div className="about__photo-col anim-slide-up">
              <div className="about__avatar" aria-label="Lazar Grbović">
                <span className="about__initials">LG</span>
              </div>
              <p className="about__location">Built with love in Serbia 🇷🇸</p>
            </div>

            {/* Story */}
            <div className="about__story-col anim-slide-up" style={{ transitionDelay: '0.1s' }}>
              <h2 className="about__greeting">Hi, I'm Lazar 👋</h2>
              <p className="about__role">Solo developer from Serbia</p>

              <div className="about__narrative">
                <p>
                  I built Shtek because I was tired of juggling spreadsheets, currency
                  converters, and half-baked budgeting apps that never quite fit my life
                  in Serbia — where you earn in dinars but dream in euros.
                </p>
                <p>
                  I wanted one place to track daily spending, plan budgets with real
                  priorities, set savings goals with actual calculators, and figure out
                  what my ideal life would cost. Nothing out there did all of that,
                  so I built it myself.
                </p>
                <p>
                  Shtek is a passion project — no VC money, no growth hacks, no
                  selling your data. Just a tool I use every day, now shared with
                  anyone who wants to take control of their finances.
                </p>
              </div>

              <div className="about__tech">
                <span className="about__tech-label">Built with</span>
                <div className="about__tech-tags">
                  <span className="about__tech-tag">React</span>
                  <span className="about__tech-tag">Supabase</span>
                  <span className="about__tech-tag">Vite</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Container>
    </Section>
  )
}
