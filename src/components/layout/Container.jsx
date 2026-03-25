import './Container.css'

export default function Container({
  width = 'default',
  children,
  className = '',
  ...props
}) {
  const classes = [
    'container',
    width !== 'default' ? `container--${width}` : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}
