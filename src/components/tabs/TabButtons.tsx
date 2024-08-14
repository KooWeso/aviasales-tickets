/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ReactNode } from 'react'

import Text from '../typography/Text'

import style from './tabs.module.scss'

interface Tab {
  name: string
  data: ReactNode
}

type TabButtonsProps = {
  tabs: Tab[]
  currentTab: number
  setCurrentTab: (i: number) => void
}

function TabButtons({ tabs, setCurrentTab, currentTab }: TabButtonsProps) {
  return (
    <div className={style.tabs_header}>
      {tabs.map((i, index) => (
        <li
          tabIndex={0}
          className={`${style.tabs_button} ${index === currentTab ? style.tabs_active : ''}`}
          key={i.name}
          onKeyDownCapture={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              setCurrentTab(index)
            }
          }}
          onClick={() => {
            setCurrentTab(index)
          }}
        >
          <Text size={2}>{i.name}</Text>
        </li>
      ))}
    </div>
  )
}

export default TabButtons
