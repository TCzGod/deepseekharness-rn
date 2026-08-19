import type { ReactElement } from 'react'
import { ClockIcon, LogoMark, MailIcon, PhoneIcon, PinIcon } from '../icons'

/** 页脚：公司信息、快捷导航与联系方式 / 服务热线。 */
export function Footer(): ReactElement {
  return (
    <footer className="site-footer" id="contact">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <a className="brand" href="#top" aria-label="DeepSeek Harness 首页">
              <LogoMark id="dsg-footer" />
              <span className="brand__name">DeepSeek&nbsp;<span className="brand__name-accent">Harness</span></span>
            </a>
            <p className="site-footer__desc">
              DeepSeek Harness 是专注于 AI 模型训练、微调与部署的一站式平台，致力于成为 AI 工程化能力的行业领导者。
            </p>
          </div>
          <div className="site-footer__col">
            <h4>产品</h4>
            <ul>
              <li><a href="#products">模型训练</a></li>
              <li><a href="#products">模型微调</a></li>
              <li><a href="#products">模型部署</a></li>
              <li><a href="#products">模型评估</a></li>
            </ul>
          </div>
          <div className="site-footer__col">
            <h4>资源</h4>
            <ul>
              <li><a href="#news">开发文档</a></li>
              <li><a href="#scenarios">模型库</a></li>
              <li><a href="#scenarios">企业方案</a></li>
              <li><a href="#news">加入我们</a></li>
            </ul>
          </div>
          <div className="site-footer__col site-footer__contact">
            <h4>联系我们</h4>
            <ul>
              <li><PhoneIcon /><span>服务热线：400-888-0000</span></li>
              <li><MailIcon /><span>support@deepseekharness.com</span></li>
              <li><PinIcon /><span>北京市海淀区中关村科技园</span></li>
              <li><ClockIcon /><span>周一至周五 9:00 - 18:00</span></li>
            </ul>
          </div>
        </div>
        <div className="site-footer__bottom">
          <p>© 2025 DeepSeek Harness. 保留所有权利。</p>
          <p>京ICP备XXXXXXXX号 · 京公网安备 XXXXXXXXXX 号</p>
        </div>
      </div>
    </footer>
  )
}
