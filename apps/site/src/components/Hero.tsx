import type { ReactElement } from 'react'
import { CheckIcon } from '../icons'

const HIGHLIGHTS = ['分布式训练', '一键部署', '私有化安全', '弹性伸缩'] as const

/** 主视觉区：深蓝到浅蓝渐变背景 + 核心价值主张与 CTA。 */
export function Hero(): ReactElement {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <p className="hero__eyebrow">一站式 AI 模型训练 · 微调 · 部署平台</p>
        <h1 className="hero__title">DeepSeek Harness —— AI 模型训练与部署的智能引擎</h1>
        <p className="hero__subtitle">让 AI 开发更高效、更安全、更智能，从训练到上线一站打通模型全生命周期。</p>
        <ul className="hero__chips">
          {HIGHLIGHTS.map(text => (
            <li key={text}><CheckIcon />{text}</li>
          ))}
        </ul>
        <div className="hero__actions">
          <a className="btn btn--primary" href="#products">立即体验</a>
          <a className="btn btn--light" href="#products">查看文档</a>
        </div>
      </div>
    </section>
  )
}
