import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import './Section.css'

export default function Section({
  id,
  ariaLabel,
  variant = 'default',
  className = '',
  children,
  ...props
}) {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.15 })

  const classes = [
    'section',
    `section--${variant}`,
    isVisible ? 'visible' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <section
      ref={ref}
      id={id}
      aria-label={ariaLabel}
      className={classes}
      {...props}
    >
      {children}
    </section>
  )
}
