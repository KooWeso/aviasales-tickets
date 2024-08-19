import type { SearchIdType, TicketsType } from './types'

export const fetchSearchId = async () => {
  try {
    const response = await fetch('https://aviasales-test-api.kata.academy/search')
    if (!response.ok) {
      const statusError = new Error(response.statusText)
      statusError.name = String(response.status)
      throw statusError
    }
    const { searchId } = (await response.json()) as SearchIdType
    return searchId
  } catch (error) {
    if (error instanceof Error) {
      if (Number.isNaN(Number(error.name))) {
        throw new Error(`fetchSearchId error: ${error.message}`)
      }
    }
    throw error
  }
}

export const fetchTickets = async (searchId: string) => {
  try {
    const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
    if (!response.ok) {
      const statusError = new Error(response.statusText)
      statusError.name = String(response.status)
      throw statusError
    }
    const data = (await response.json()) as TicketsType
    return data
  } catch (error) {
    if (error instanceof Error) {
      if (Number.isNaN(Number(error.name))) {
        throw new Error(`fetchTickets error: ${error.message}`)
      }
    }
    throw error
  }
}
