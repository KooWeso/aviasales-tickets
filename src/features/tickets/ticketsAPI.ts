import type { SearchIdType, TicketsType } from './types'

export const fetchSearchId = async () => {
  const response = await fetch('https://aviasales-test-api.kata.academy/search')
  const { searchId } = (await response.json()) as SearchIdType
  if (!response.ok) {
    const statusError = new Error(response.statusText)
    statusError.name = String(response.status)
    throw statusError
  }
  return searchId
}

export const fetchTickets = async (searchId: string) => {
  const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
  const data = (await response.json()) as TicketsType
  if (!response.ok) {
    const statusError = new Error(response.statusText)
    statusError.name = String(response.status)
    throw statusError
  }
  return data
}

// TODO REFACTOR !
export const subToTickets = async (searchId: string): Promise<TicketsType> => {
  try {
    const ticketsData = await fetchTickets(searchId)
    return ticketsData
  } catch (e) {
    if (e instanceof Error) {
      // for timeot error
      if (e.name === '502') {
        await subToTickets(searchId)
      }
      // for any other errors
      await new Promise((resolve) => {
        setTimeout(resolve, 200)
      })
      await subToTickets(searchId)
    }
    // Unexpected not an error
    throw e
  }
}
