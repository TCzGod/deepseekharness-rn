import type { ReactElement } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Stats } from './components/Stats'
import { Products } from './components/Products'
import { Scenarios } from './components/Scenarios'
import { News } from './components/News'
import { Footer } from './components/Footer'

/** 品牌形象页：按信息架构把各模块组装成完整落地页。 */
export function App(): ReactElement {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Products />
        <Scenarios />
        <News />
      </main>
      <Footer />
    </>
  )
}
