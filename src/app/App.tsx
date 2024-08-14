import { useEffect } from 'react'

import Filter from '../features/filter/Filter'
import Tabs from '../components/tabs/Tabs'
import test from '../assets/test.png'
import Card from '../features/card/Card'

import style from './app.module.scss'

function App() {
  // auto change theme
  useEffect(() => {
    const theme: string = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    document.querySelector('html')!.setAttribute('data-theme', theme)
  }, [])

  // data for tabs
  const tabs = [
    {
      name: 'ada ada',
      data: (
        <>
          <Card price={111232000} img={test} data="MSaC" />
          <Card price={112300} img={test} data="SdML" />
          <Card price={69132690} img={test} data="NaZD" />
          <Card price={69132690} img={test} data="NaZD" />
          <Card price={69132690} img={test} data="NaZD" />
        </>
      ),
    },
    {
      name: '2second',
      data: (
        <>
          <Card price={1122000} img={test} data="MSddC" />
          <Card price={112300} img={test} data="SddML" />
          <Card price={69123690} img={test} data="NZdD" />
          <Card price={69123690} img={test} data="NZdD" />
          <Card price={69123690} img={test} data="NZdD" />
        </>
      ),
    },
    {
      name: '6s ada aa',
      data: (
        <>
          <Card price={112000} img={test} data="MSC" />
          <Card price={100} img={test} data="SML" />
          <Card price={69690} img={test} data="NZD" />
          <Card price={69690} img={test} data="NZD" />
          <Card price={69690} img={test} data="NZD" />
        </>
      ),
    },
  ]

  return (
    <div className={style.app}>
      <Filter />
      <section className={style.app_content}>
        <Tabs tabs={tabs} />
      </section>
    </div>
  )
}

export default App
