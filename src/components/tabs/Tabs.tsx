import type { ReactNode } from 'react'
import { useState } from 'react'

import style from './tabs.module.scss'
import TabButtons from './TabButtons'

interface Tab {
  name: string
  data: ReactNode
}
export type TabsProps = {
  tabs: Tab[]
}

function Tabs({ tabs }: TabsProps) {
  const [currentTab, setCurrentTab] = useState(0)

  const content = (
    <div className={style.tabs}>
      <TabButtons tabs={tabs} setCurrentTab={setCurrentTab} currentTab={currentTab} />
      <div className={style.tabs_content} key={tabs[currentTab].name}>
        {tabs[currentTab].data}
      </div>
    </div>
  )

  return content
}

export default Tabs
