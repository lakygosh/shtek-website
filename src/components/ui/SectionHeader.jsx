import './SectionHeader.css'

export default function SectionHeader({
  title,
  subtitle,
  centered = true,
  className = '',
}) {
  return (
    <div className={`section-header ${centered ? 'section-header--centered' : ''} ${className}`}>
      <h2 className="section-header__title">{title}</h2>
      {subtitle && <p className="section-header__subtitle">{subtitle}</p>}
    </div>
  )
}
