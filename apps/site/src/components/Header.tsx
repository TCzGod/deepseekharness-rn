import { useState } from 'react'
import type { ReactElement } from 'react'
import { ChevronDown, CloseIcon, LogoMark, MenuIcon } from '../icons'

interface NavChild {
  label: string
  href?: string
}

interface NavItem {
  label: string
  href?: string
  children?: NavChild[]
}

const NAV_ITEMS: readonly NavItem[] = [
  {
    label: '产品功能',
    href: '#products',
    children: [
      { label: '模型训练', href: '#products' },
      { label: '模型微调', href: '#products' },
      { label: '模型部署', href: '#products' },
      { label: '模型评估', href: '#products' },
      { label: '数据管理', href: '#products' },
      { label: '提示词工程', href: '#products' },
    ],
  },
  {
    label: '模型库',
    children: [
      { label: '预训练模型' },
      { label: '领域微调模型' },
      { label: '开源模型' },
      { label: '自定义模型' },
    ],
  },
  {
    label: '开发文档',
    children: [
      { label: '快速上手' },
      { label: 'API 参考' },
      { label: 'SDK 文档' },
      { label: '最佳实践' },
    ],
  },
  {
    label: '企业方案',
    children: [
      { label: '私有化部署', href: '#scenarios' },
      { label: '行业解决方案', href: '#scenarios' },
      { label: '安全合规' },
      { label: '技术支持' },
    ],
  },
  {
    label: '公司资讯',
    href: '#news',
    children: [
      { label: '最新动态', href: '#news' },
      { label: '版本更新', href: '#news' },
      { label: '技术博客', href: '#news' },
    ],
  },
  {
    label: '加入我们',
    children: [
      { label: '社会招聘' },
      { label: '校园招聘' },
      { label: '团队介绍' },
    ],
  },
  {
    label: '联系我们',
    href: '#contact',
  },
]

/** 固定顶部导航栏：桌面悬停下拉子菜单 + 移动端汉堡折叠面板。 */
export function Header(): ReactElement {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openSub, setOpenSub] = useState<string | null>(null)

  function toggleSub(label: string): void {
    setOpenSub(current => (current === label ? null : label))
  }

  function closeMenu(): void {
    setMenuOpen(false)
    setOpenSub(null)
  }

  return (
    <header className="site-header" id="top">
      <div className="container site-header__inner">
        <a className="brand" href="#top" aria-label="DeepSeek Harness 首页">
          <LogoMark />
          <span className="brand__name">DeepSeek&nbsp;<span className="brand__name-accent">Harness</span></span>
        </a>

        <nav className="nav" aria-label="主导航">
          {NAV_ITEMS.map(item => (item.children === undefined
            ? (
              <div className="nav__item" key={item.label}>
                <a className="nav__link" href={item.href ?? '#'}>{item.label}</a>
              </div>
            )
            : (
              <div className="nav__item" key={item.label}>
                <a className="nav__link nav__link--has-dropdown" href={item.href ?? '#'} aria-haspopup="true">
                  {item.label}
                  <span className="nav__chevron"><ChevronDown /></span>
                </a>
                <div className="nav__dropdown">
                  {item.href !== undefined && (
                    <a className="dropdown__link" href={item.href}>查看全部</a>
                  )}
                  {item.children.map(child => (
                    <a className="dropdown__link" href={child.href ?? '#'} key={child.label}>{child.label}</a>
                  ))}
                </div>
              </div>
            )))}
        </nav>

        <button
          type="button"
          className={`nav-toggle${menuOpen ? ' nav-toggle--open' : ''}`}
          aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(current => !current)}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      <div className={`mobile-menu${menuOpen ? ' mobile-menu--open' : ''}`}>
        <nav aria-label="移动端导航">
          {NAV_ITEMS.map((item) => {
            if (item.children === undefined) {
              return (
                <div className="mobile-menu__item" key={item.label}>
                  <a className="mobile-menu__link" href={item.href ?? '#'} onClick={closeMenu}>{item.label}</a>
                </div>
              )
            }
            const open = openSub === item.label
            return (
              <div className={`mobile-menu__item${open ? ' mobile-menu__item--open' : ''}`} key={item.label}>
                <button type="button" className="mobile-menu__link mobile-menu__toggle" onClick={() => toggleSub(item.label)} aria-expanded={open}>
                  {item.label}
                  <span className="nav__chevron"><ChevronDown /></span>
                </button>
                <div className="mobile-menu__sub">
                  {item.href !== undefined && (
                    <a className="mobile-menu__sublink" href={item.href} onClick={closeMenu}>查看全部</a>
                  )}
                  {item.children.map(child => (
                    <a className="mobile-menu__sublink" href={child.href ?? '#'} key={child.label} onClick={closeMenu}>{child.label}</a>
                  ))}
                </div>
              </div>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
