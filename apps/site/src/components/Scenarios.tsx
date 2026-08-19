import type { ReactElement } from 'react'
import { ArrowRight, Icon } from '../icons'
import type { IconName } from '../icons'
import { Reveal } from './Reveal'

interface Scenario {
  icon: IconName
  en: string
  title: string
  desc: string
}

const SCENARIOS: readonly Scenario[] = [
  { icon: 'layers', en: 'LLM Training', title: '大语言模型训练', desc: '面向大模型的分布式训练框架，支持超大规模集群与高效并行策略，显著加速收敛。' },
  { icon: 'target', en: 'Domain Fine-tuning', title: '垂直领域微调', desc: '基于预训练模型快速构建行业专属模型，覆盖金融、医疗、制造等业务场景。' },
  { icon: 'shield', en: 'Private Deployment', title: '企业私有化部署', desc: '数据不出域、安全合规，支持企业内部一键交付与全栈托管。' },
  { icon: 'bot', en: 'Agent Development', title: 'AI Agent 开发', desc: '从模型到工具链的完整基础设施，加速智能体应用从想法走向上线。' },
]

/** 产品应用：四大场景分类卡片。 */
export function Scenarios(): ReactElement {
  return (
    <section className="section section--alt" id="scenarios">
      <div className="container">
        <Reveal>
          <div className="section__head">
            <span className="section__kicker">产品应用</span>
            <h2 className="section__title">一个平台，适配多元 AI 场景</h2>
            <p className="section__desc">无论大模型训练、行业微调还是私有化交付，DeepSeek Harness 都能弹性适配。</p>
          </div>
        </Reveal>
        <div className="scenarios__grid">
          {SCENARIOS.map((scenario, index) => (
            <Reveal key={scenario.en} delay={(index % 2) * 90} className="scenarios__cell">
              <article className="scenario-card">
                <div className="scenario-card__top">
                  <div className="scenario-card__icon"><Icon name={scenario.icon} /></div>
                  <span className="scenario-card__num">{`0${index + 1}`}</span>
                </div>
                <span className="scenario-card__en">{scenario.en}</span>
                <h3 className="scenario-card__title">{scenario.title}</h3>
                <p className="scenario-card__desc">{scenario.desc}</p>
                <a className="scenario-card__link" href="#products">了解更多 <ArrowRight /></a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
