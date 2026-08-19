import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactElement, ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  /** 附加到宿主元素上的类名。 */
  className?: string
  /** 进入视口后的过渡延迟（毫秒），用于卡片错峰渐显。 */
  delay?: number
}

/** AOS 风格滚动渐显：元素首次进入视口时淡入并上移复位。 */
export function Reveal({ children, className = '', delay = 0 }: RevealProps): ReactElement {
  const host = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = host.current
    if (node === null) return
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
          return
        }
      }
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const style: CSSProperties | undefined = delay > 0 ? { transitionDelay: `${delay}ms` } : undefined
  return (
    <div ref={host} className={`reveal${visible ? ' reveal--is-visible' : ''}${className === '' ? '' : ` ${className}`}`} style={style}>
      {children}
    </div>
  )
}
