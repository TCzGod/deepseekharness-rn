import type { ReactElement } from 'react'
import { Reveal } from './Reveal'

interface Stat {
  value: string
  unit: string
  label: string
}

const STATS: readonly Stat[] = [
  { value: '100', unit: '万+', label: '模型训练任务' },
  { value: '50', unit: '+', label: '预训练模型' },
  { value: '99.9', unit: '%', label: '服务可用性' },
  { value: '1000', unit: '+', label: '企业客户' },
]

/** 核心数据 / 信任背书：叠加在 Hero 底部的一张数据卡片。 */
export function Stats(): ReactElement {
  return (
    <section className="stats" aria-label="核心数据">
      <div className="container">
        <Reveal>
          <div className="stats__card">
            {STATS.map(stat => (
              <div className="stats__item" key={stat.label}>
                <div className="stats__num">
                  {stat.value}
                  <span className="stats__unit">{stat.unit}</span>
                </div>
                <div className="stats__label">{stat.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
