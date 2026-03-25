import Section from '../layout/Section'
import Container from '../layout/Container'
import SectionHeader from '../ui/SectionHeader'
import './Comparison.css'

const COLUMNS = ['Spreadsheets', 'Other Apps', 'Shtek']

const ROWS = [
  { feature: 'Goal tracking with calculators', values: ['❌', '⚠️ Partial', '✅'] },
  { feature: 'Ideal Life planning', values: ['❌', '❌', '✅'] },
  { feature: 'Dual currency (EUR/RSD)', values: ['❌', '⚠️ Rare', '✅'] },
  { feature: 'Free forever', values: ['⚠️ Varies', '❌', '✅'] },
  { feature: 'No ads', values: ['⚠️ Varies', '❌', '✅'] },
  { feature: 'Mobile-first', values: ['❌', '✅', '✅'] },
  { feature: 'Privacy-first', values: ['✅', '❌', '✅'] },
]

export default function Comparison() {
  return (
    <Section id="comparison" ariaLabel="Feature comparison" className="comparison">
      <Container>
        <div className="anim-slide-up">
          <SectionHeader
            title="Shtek vs The Old Way"
            subtitle="See how Shtek stacks up against spreadsheets and other budgeting apps."
          />
        </div>

        <div className="comparison__scroll anim-slide-up" style={{ transitionDelay: '0.1s' }}>
          <table className="comparison__table" role="table">
            <thead>
              <tr>
                <th className="comparison__feature-header">Feature</th>
                {COLUMNS.map((col, i) => (
                  <th
                    key={col}
                    className={`comparison__col-header ${i === 2 ? 'comparison__col-header--highlight' : ''}`}
                  >
                    {col}
                    {i === 2 && <span className="comparison__check" aria-hidden="true"> ✓</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, ri) => (
                <tr key={ri} className="comparison__row">
                  <td className="comparison__feature">{row.feature}</td>
                  {row.values.map((val, ci) => (
                    <td
                      key={ci}
                      className={`comparison__cell ${ci === 2 ? 'comparison__cell--highlight' : ''}`}
                    >
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </Section>
  )
}
