import type { ReactElement } from 'react'
import { ArrowRight } from '../icons'
import { Reveal } from './Reveal'

interface NewsItem {
  tag: string
  date: string
  title: string
  summary: string
}

const NEWS: readonly NewsItem[] = [
  {
    tag: '版本更新',
    date: '2025-07-18',
    title: 'DeepSeek Harness v0.1 正式发布',
    summary: '全新插件化架构与统一能力服务上线，训练与部署链路进一步简化。',
  },
  {
    tag: '技术博客',
    date: '2025-07-02',
    title: '深入分布式训练：如何把收敛速度再提升 40%',
    summary: '从并行策略到显存优化，一文讲透大模型训练的工程实践。',
  },
  {
    tag: '公司动态',
    date: '2025-06-20',
    title: 'DeepSeek Harness 企业客户突破 1000 家',
    summary: '覆盖金融、制造、互联网等行业，助力企业 AI 能力规模化落地。',
  },
]

/** 品牌资讯：最新动态、版本更新与技术博客。 */
export function News(): ReactElement {
  return (
    <section className="section" id="news">
      <div className="container">
        <Reveal>
          <div className="section__head">
            <span className="section__kicker">品牌资讯</span>
            <h2 className="section__title">最新动态与深度洞察</h2>
            <p className="section__desc">版本更新、技术博客与公司动态，第一时间了解 DeepSeek Harness。</p>
          </div>
        </Reveal>
        <div className="news__grid">
          {NEWS.map((item, index) => (
            <Reveal key={item.title} delay={(index % 3) * 90} className="news__cell">
              <article className="news-card">
                <div className="news-card__body">
                  <div className="news-card__meta">
                    <span className="news-card__tag">{item.tag}</span>
                    <time dateTime={item.date}>{item.date}</time>
                  </div>
                  <h3 className="news-card__title"><a href="#news">{item.title}</a></h3>
                  <p className="news-card__summary">{item.summary}</p>
                  <a className="news-card__more" href="#news">阅读更多 <ArrowRight /></a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
