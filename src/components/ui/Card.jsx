import './Card.css'

export default function Card({
  variant = 'default',
  featured = false,
  accentBorder = false,
  children,
  className = '',
  ...props
}) {
  const classes = [
    'card',
    `card--${variant}`,
    featured ? 'card--featured' : '',
    accentBorder ? 'card--accent-border' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}
