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

export interface TicketsType {
  tickets: Ticket[]
  stop: boolean
}

export interface SearchIdType {
  searchId: string
}
