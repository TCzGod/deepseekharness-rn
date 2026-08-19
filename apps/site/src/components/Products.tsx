import type { ReactElement } from 'react'
import { Icon } from '../icons'
import type { IconName } from '../icons'
import { Reveal } from './Reveal'

interface Product {
  icon: IconName
  title: string
  desc: string
  tags: readonly [string, string]
}

const PRODUCTS: readonly Product[] = [
  { icon: 'training', title: '模型训练', desc: '端到端的训练平台，显著加速模型收敛', tags: ['分布式训练', '自动超参调优'] },
  { icon: 'finetune', title: '模型微调', desc: '低成本适配业务，快速打造行业模型', tags: ['LoRA 微调', '全参微调'] },
  { icon: 'deploy', title: '模型部署', desc: '上线即高可用，资源按需弹性伸缩', tags: ['一键部署', 'GPU 弹性伸缩'] },
  { icon: 'evaluate', title: '模型评估', desc: '量化模型质量，让迭代有据可依', tags: ['自动化评测', '基准测试'] },
  { icon: 'data', title: '数据管理', desc: '让数据资产可信、可回溯、可复用', tags: ['数据集版本控制', '数据标注'] },
  { icon: 'prompt', title: '提示词工程', desc: '沉淀稳定可靠的 Prompt 工程实践', tags: ['Prompt 模板库', 'A/B 测试'] },
]

/** 产品中心：六张功能卡片网格。 */
export function Products(): ReactElement {
  return (
    <section className="section" id="products">
      <div className="container">
        <Reveal>
          <div className="section__head">
            <span className="section__kicker">产品中心</span>
            <h2 className="section__title">全栈模型平台，覆盖 AI 全生命周期</h2>
            <p className="section__desc">从数据、训练、微调到部署与评估，DeepSeek Harness 提供企业级的一站式能力。</p>
          </div>
        </Reveal>
        <div className="products__grid">
          {PRODUCTS.map((product, index) => (
            <Reveal key={product.title} delay={(index % 3) * 90} className="products__cell">
              <article className="product-card">
                <div className="product-card__icon"><Icon name={product.icon} /></div>
                <h3 className="product-card__title">{product.title}</h3>
                <p className="product-card__desc">{product.desc}</p>
                <ul className="product-card__tags">
                  {product.tags.map(tag => <li key={tag}>{tag}</li>)}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
