import './Badge.css'

export default function Badge({
  variant = 'free',
  children,
  className = '',
  ...props
}) {
  const classes = [
    'badge',
    `badge--${variant}`,
    className,
  ].filter(Boolean).join(' ')

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  )
}
