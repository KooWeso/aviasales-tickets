import { add, format, minutesToHours } from 'date-fns'

import type { DescriptionData } from '../../components/typography/Description'

import type { Ticket } from './types'

const refactorSegment = (i: Ticket['segments'][0]): DescriptionData => {
  const date = new Date(i.date)
  const dateB = add(date, { minutes: i.duration })

  const timeA = format(date, 'hh:mm aa')
  const timeB = format(dateB, 'hh:mm aa')

  const hours = minutesToHours(i.duration)
  const days = Math.floor(hours / 24)

  return {
    origin: i.origin,
    destination: i.destination,
    timeFromAToB: `${timeA} - ${timeB}`,
    duration: `${days ? `${days}d` : ''} ${hours % 24}h ${i.duration % 60}m`,
    durationMin: i.duration,
    stops: i.stops,
  }
}

export default refactorSegment
