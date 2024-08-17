import Tickets from './features/tickets/Tickets'
import Filter from './features/filter/Filter'
import Tabs from './components/tabs/Tabs'
import style from './app.module.scss'
import useTheme from './hook/useTheme'
import useTickets from './features/tickets/hook'

function App() {
  useTheme()

  useTickets()

  // data for tabs
  const tabs = [
    {
      name: 'FUCKING TICKETS',
      data: <Tickets />,
    },
    {
      name: ' TICKETS',
      data: <Tickets />,
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
