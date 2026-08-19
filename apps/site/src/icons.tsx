import type { ReactElement, ReactNode } from 'react'

/** 共享的 24×24 线性图标外壳，统一描边与圆角风格。 */
function IconSvg({ children }: { children: ReactNode }): ReactElement {
  return (
    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  )
}

/** 不可达值兜底：闭合联合在 switch 中穷举后落入 never。 */
function assertNever(value: never): never {
  throw new Error(`unexpected icon name: ${String(value)}`)
}

/** 通过 {@link Icon} 渲染的功能 / 场景图标键。 */
export type IconName =
  | 'training' | 'finetune' | 'deploy' | 'evaluate' | 'data' | 'prompt'
  | 'layers' | 'target' | 'shield' | 'bot'

/** 按名称渲染功能或场景图标。 */
export function Icon({ name }: { name: IconName }): ReactElement {
  switch (name) {
    case 'training':
      return (
        <IconSvg>
          <rect x="7.5" y="7.5" width="9" height="9" rx="2" />
          <rect x="10.5" y="10.5" width="3" height="3" />
          <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" />
        </IconSvg>
      )
    case 'finetune':
      return (
        <IconSvg>
          <path d="M4 7h16M4 12h16M4 17h16" />
          <circle cx="9" cy="7" r="2" />
          <circle cx="15" cy="12" r="2" />
          <circle cx="7" cy="17" r="2" />
        </IconSvg>
      )
    case 'deploy':
      return (
        <IconSvg>
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </IconSvg>
      )
    case 'evaluate':
      return (
        <IconSvg>
          <path d="M3 3v18h18" />
          <rect x="7" y="12" width="3" height="6" rx="1" />
          <rect x="12" y="8" width="3" height="10" rx="1" />
          <rect x="17" y="5" width="3" height="13" rx="1" />
        </IconSvg>
      )
    case 'data':
      return (
        <IconSvg>
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
          <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
        </IconSvg>
      )
    case 'prompt':
      return (
        <IconSvg>
          <path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z" />
          <path d="M13 7.5 13.9 9.6 16 10.5 13.9 11.4 13 13.5 12.1 11.4 10 10.5 12.1 9.6z" />
        </IconSvg>
      )
    case 'layers':
      return (
        <IconSvg>
          <path d="M12 3.5 21 8l-9 4.5L3 8z" />
          <path d="M3 12.5 12 17l9-4.5" />
          <path d="M3 16.5 12 21l9-4.5" />
        </IconSvg>
      )
    case 'target':
      return (
        <IconSvg>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" />
        </IconSvg>
      )
    case 'shield':
      return (
        <IconSvg>
          <path d="M12 3l7 3v5c0 4.4-3 7.4-7 9-4-1.6-7-4.6-7-9V6z" />
          <path d="M9 11.5l2 2 4-4" />
        </IconSvg>
      )
    case 'bot':
      return (
        <IconSvg>
          <rect x="5" y="9" width="14" height="10" rx="2" />
          <path d="M12 9V5" />
          <circle cx="12" cy="4.5" r="1" />
          <circle cx="9.5" cy="14" r="1" />
          <circle cx="14.5" cy="14" r="1" />
          <path d="M9.5 17.5h5" />
        </IconSvg>
      )
    default:
      return assertNever(name)
  }
}

/** 品牌图形标记：渐变圆角块上的三层节点网络。 */
export function LogoMark({ id = 'dsg' }: { id?: string }): ReactElement {
  return (
    <svg className="logo-mark" viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#34a1dc" />
          <stop offset="1" stopColor="#3793db" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill={`url(#${id})`} />
      <path d="M16 7 8 12v4l8-5 8 5v-4z" fill="#fff" />
      <path d="M8.5 20 16 24.5 23.5 20" fill="none" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="8.5" cy="20" r="2" fill="#fff" />
      <circle cx="16" cy="24.5" r="2" fill="#fff" />
      <circle cx="23.5" cy="20" r="2" fill="#fff" />
    </svg>
  )
}

export function ChevronDown(): ReactElement {
  return <IconSvg><path d="M6 9l6 6 6-6" /></IconSvg>
}

export function MenuIcon(): ReactElement {
  return <IconSvg><path d="M3 6h18M3 12h18M3 18h18" /></IconSvg>
}

export function CloseIcon(): ReactElement {
  return <IconSvg><path d="M6 6l12 12M18 6L6 18" /></IconSvg>
}

export function ArrowRight(): ReactElement {
  return <IconSvg><path d="M5 12h14M13 6l6 6-6 6" /></IconSvg>
}

export function CheckIcon(): ReactElement {
  return <IconSvg><path d="M20 6 9 17l-5-5" /></IconSvg>
}

export function PhoneIcon(): ReactElement {
  return (
    <IconSvg>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </IconSvg>
  )
}

export function MailIcon(): ReactElement {
  return <IconSvg><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></IconSvg>
}

export function PinIcon(): ReactElement {
  return <IconSvg><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></IconSvg>
}

export function ClockIcon(): ReactElement {
  return <IconSvg><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></IconSvg>
}
