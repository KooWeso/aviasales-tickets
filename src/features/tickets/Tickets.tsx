import { useEffect, useMemo, useRef, useState } from 'react'

import Card from '../card/Card'
import { useAppSelector } from '../../app/hooks'
import { selectFilters } from '../filter/filterSlice'
import Button from '../../components/buttons/Button'
import Text from '../../components/typography/Text'
import Loader from '../../components/loaders/Loader'

import { selectError, selectStatus, selectTicketsData } from './ticketsAPISlice'
import type { RefactoredTicketType } from './types'

interface TicketsProps {
  sortMethod: (a: RefactoredTicketType, b: RefactoredTicketType) => number
}

function updateStatus(
  newStatus: string,
  setter: React.Dispatch<React.SetStateAction<string>>,
  ref: React.MutableRefObject<number | null>
) {
  if (ref.current) {
    clearTimeout(ref.current)
  }
  // eslint-disable-next-line no-param-reassign
  ref.current = setTimeout(() => {
    setter(newStatus)
  }, 200)
}

function Tickets({ sortMethod }: TicketsProps) {
  const [maxTickets, setMaxTickets] = useState(5)
  const debounceTimeRef = useRef<number | null>(null)
  const [ticketStatus, setTicketStatus] = useState<string>('idle')
  const ticketsData = useAppSelector(selectTicketsData)
  const error = useAppSelector(selectError)
  const status = useAppSelector(selectStatus)
  const filters = useAppSelector(selectFilters)
  const limitedTicketsData = useMemo(() => {
    if (ticketsData.length) {
      const filterdTicketsData = ticketsData.filter((ticket) => {
        // IDEA ticket.data.some can be changed to ticket.data.every so it will be StrictFilter
        const validStops = ticket.data.some((d) =>
          filters.slice(1).some((filter) => d.stops.length === filter.value && filter.state)
        )
        return filters[0].state || validStops
      })

      const sortedTickets = filterdTicketsData.sort(sortMethod)

      return sortedTickets
        .filter((_, i) => i < maxTickets)
        .map((ticket) => {
          return <Card key={ticket.id} price={ticket.price} img={ticket.img} data={ticket.data} />
        })
    }
    return []
  }, [ticketsData, sortMethod, maxTickets, filters])

  useEffect(() => {
    updateStatus(status, setTicketStatus, debounceTimeRef)
  }, [status])

  if (error && !ticketsData.length) {
    return (
      <div style={{ color: 'red', textAlign: 'center', fontSize: '2rem' }}>{`${error.name} : ${error.message}`}</div>
    )
  }

  if (filters.every((filter) => !filter.state)) {
    return <Text size={3}>CAN&#39;T FIND TICKETS WITH CHOOSEN FILTERS</Text>
  }

  if (!ticketsData.length) {
    return <Loader />
  }

  return (
    <>
      {ticketStatus === 'loading' && <Loader />}
      {limitedTicketsData}
      <Button style={{ padding: '1rem', marginBottom: '3rem' }} onClick={() => setMaxTickets(maxTickets + 5)}>
        <Text style={{ color: '#fff' }} size={3}>{`SHOW ${5} MORE TICKETS!`}</Text>
      </Button>
    </>
  )
}

export default Tickets
