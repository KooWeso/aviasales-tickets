import { useMemo, useState } from 'react'

import Card from '../card/Card'
import { useAppSelector } from '../../app/hooks'
import type { DescriptionData } from '../../components/typography/Description'

import { selectError, selectStatus, selectTicketsData } from './ticketsAPISlice'
import refactorSegment from './utils'

interface TicketListType {
  id: string
  carrier: string
  price: number
  img: string
  data: DescriptionData[]
}

// faster then map method ;)
const limitTickets = (ticketsList: TicketListType[], max: number): JSX.Element[] => {
  if (!ticketsList.length) return []
  const endList = []
  let maxTickets = max
  if (maxTickets > ticketsList.length) maxTickets = ticketsList.length
  for (let i = 0; i < maxTickets; i += 1) {
    endList.push(
      <Card key={ticketsList[i].id} price={ticketsList[i].price} img={ticketsList[i].img} data={ticketsList[i].data} />
    )
  }
  return endList
}

function Tickets() {
  const [maxTickets, setMaxTickets] = useState(5)
  const ticketsData = useAppSelector(selectTicketsData)
  const error = useAppSelector(selectError)
  const status = useAppSelector(selectStatus)

  const memoizedRefactoredTickets = useMemo(() => {
    console.log('%cMEMOIZED ticketsData', 'color: red', ticketsData.length)

    return ticketsData.map((i, ind) => {
      const refactoredTicket = {
        id: `${i.price}-${i.carrier}-${i.segments[0].origin}-${i.segments[0].destination}-${ind}`,
        carrier: i.carrier,
        price: i.price,
        img: `https://pics.avs.io/99/36/${i.carrier}.png`,
        data: i.segments ? i.segments.map((j) => refactorSegment(j)) : [],
      }

      return refactoredTicket
    })
  }, [ticketsData])

  if (error) {
    return <div>{`${error.name} : ${error.message}`}</div>
  }

  if (status === 'loading' || !memoizedRefactoredTickets.length) {
    return <div>Loading...</div>
  }

  return (
    <>
      {limitTickets(memoizedRefactoredTickets, maxTickets)}
      <button
        style={{ margin: '3rem', padding: '3rem', paddingBlock: '1.5rem' }}
        type="button"
        onClick={() => setMaxTickets(maxTickets + 5)}
      >
        Show 5 more
      </button>
    </>
  )
}

export default Tickets
