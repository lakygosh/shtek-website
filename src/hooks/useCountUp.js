import { useState, useEffect, useRef } from 'react'

export function useCountUp(target, duration = 1500, shouldStart = false) {
  const [value, setValue] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!shouldStart || startedRef.current) return
    startedRef.current = true

    const start = performance.now()
    const step = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [shouldStart, target, duration])

  return value
}
