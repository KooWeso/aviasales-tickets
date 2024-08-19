// eslint-disable-next-line import/no-unresolved
import { SpeedInsights } from '@vercel/speed-insights/react'

import Tickets from './features/tickets/Tickets'
import Filter from './features/filter/Filter'
import Tabs from './components/tabs/Tabs'
import style from './app.module.scss'
import useTheme from './hook/useTheme'
import useTickets from './features/tickets/hook'

function App() {
  const [theme, setTheme] = useTheme()

  useTickets()

  // data for tabs
  const tabs = [
    {
      name: 'CHEAPEST TICKETS',
      data: <Tickets sortMethod={(a, b) => a.price - b.price} />,
    },
    {
      name: 'QUICKEST TICKETS',
      data: (
        <Tickets
          sortMethod={(a, b) => {
            const maxA = a.data.reduce((prev, curr) => {
              return prev.durationMin > curr.durationMin ? prev : curr
            })
            const maxB = b.data.reduce((prev, curr) => {
              return prev.durationMin > curr.durationMin ? prev : curr
            })

            return maxA.durationMin - maxB.durationMin
          }}
        />
      ),
    },
    {
      name: 'BEST',
      data: (
        <Tickets
          sortMethod={(a, b) => {
            const maxA = a.data.reduce((prev, curr) => {
              return prev.durationMin > curr.durationMin ? prev : curr
            })
            const maxB = b.data.reduce((prev, curr) => {
              return prev.durationMin > curr.durationMin ? prev : curr
            })

            const cheap = a.price - b.price > 0 ? 1 : -1
            const fast = maxA.durationMin - maxB.durationMin > 0 ? 1 : -1

            return cheap + fast
          }}
        />
      ),
    },
    // {
    //   name: 'SLOWEST TICKETS',
    //   data: (
    //     <Tickets
    //       sortMethod={(a, b) => {
    //         const maxA = a.data.reduce((prev, curr) => {
    //           return prev.durationMin > curr.durationMin ? prev : curr
    //         })
    //         const maxB = b.data.reduce((prev, curr) => {
    //           return prev.durationMin > curr.durationMin ? prev : curr
    //         })

    //         return maxB.durationMin - maxA.durationMin
    //       }}
    //     />
    //   ),
    // },
    // {
    //   name: 'CHEAPEST TICKETS',
    //   data: <Tickets sortMethod={(a, b) => b.price - a.price} />,
    // },
  ]

  return (
    <>
      <div className={style.app_header}>
        <button
          type="button"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className={`${style.app_img} ${theme === 'light' ? '' : style.app_dark}`}
        >
          <img className={style['app_img-glob']} src="/form.png" alt="glob" />
          <img className={style['app_img-plane']} src="/plane.png" alt="plane" />
        </button>
      </div>
      <div className={style.app}>
        <Filter />
        <section className={style.app_content}>
          <Tabs tabs={tabs} />
        </section>
      </div>
      <SpeedInsights />
    </>
  )
}

export default App
