import './Stack.css'

export default function Stack({
  direction = 'vertical',
  gap = 'default',
  align = 'stretch',
  justify = 'flex-start',
  wrap = false,
  children,
  className = '',
  as: Tag = 'div',
  ...props
}) {
  const classes = [
    'stack',
    `stack--${direction}`,
    gap !== 'default' ? `stack--gap-${gap}` : '',
    wrap ? 'stack--wrap' : '',
    className,
  ].filter(Boolean).join(' ')

  const style = {
    alignItems: align,
    justifyContent: justify,
  }

  return (
    <Tag className={classes} style={style} {...props}>
      {children}
    </Tag>
  )
}
