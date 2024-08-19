import type { DescriptionData } from '../../components/typography/Description'

export interface Ticket {
  price: number
  carrier: string
  segments: {
    origin: string
    destination: string
    date: string
    duration: number
    stops: string[]
  }[]
}

export interface RefactoredTicketType {
  id: string
  carrier: string
  price: number
  img: string
  data: DescriptionData[]
}

export interface TicketsType {
  tickets: Ticket[]
  stop: boolean
}

export interface SearchIdType {
  searchId: string
}
