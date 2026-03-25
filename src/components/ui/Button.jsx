import './Button.css'

export default function Button({
  variant = 'primary',
  size = 'default',
  href,
  onClick,
  shimmer = false,
  fullWidth = false,
  external = false,
  children,
  className = '',
  ...props
}) {
  const classes = [
    'btn',
    `btn--${variant}`,
    size !== 'default' ? `btn--${size}` : '',
    fullWidth ? 'btn--full' : '',
    className,
  ].filter(Boolean).join(' ')

  const content = (
    <>
      {children}
      {shimmer && <span className="btn__shimmer" aria-hidden="true" />}
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...props}
      >
        {content}
      </a>
    )
  }

  return (
    <button className={classes} onClick={onClick} {...props}>
      {content}
    </button>
  )
}
