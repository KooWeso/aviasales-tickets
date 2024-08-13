import { useEffect } from 'react'

import Price from '../components/typography/Price'
import Description from '../components/typography/Description'
import Text from '../components/typography/Text'
import Filter from '../features/filter/Filter'
import Tabs from '../components/tabs/Tabs'

function App() {
  useEffect(() => {
    const theme: string = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    document.querySelector('html')!.setAttribute('data-theme', theme)
  }, [])

  const tabs = [
    { name: 'ada ada', data: <Text>adada</Text> },
    { name: '2second', data: <Text>22222</Text> },
    { name: '6s ada aa', data: <Text>2211222</Text> },
  ]

  return (
    <div className="app">
      <section style={{ border: '1px solid black' }}>
        TYPOGRAPHY:
        <Description data="MSC" />
        <Price price={10000} />
        <Text faded>size 1</Text>
        <Text size={2}>size 2</Text>
        <Text size={3}>size 3</Text>
        <Text size={4}>size 4</Text>
      </section>
      <section style={{ border: '1px solid grey' }}>
        OPTIONS:
        <Filter />
      </section>
      <section style={{ border: '1px solid #aaa' }}>
        TABS: <Tabs tabs={tabs} />
      </section>
    </div>
  )
}

export default App
