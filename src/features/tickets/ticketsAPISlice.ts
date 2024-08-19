/* eslint-disable indent */
/* eslint-disable no-param-reassign */
import type { SerializedError } from '@reduxjs/toolkit'

import createAppSlice from '../../app/createAppSlice'
import type { AppThunk } from '../../app/store'

import { fetchSearchId, fetchTickets } from './ticketsAPI'
import type { RefactoredTicketType } from './types'
import refactorSegment from './utils'

export interface TicketsStateType {
  ticketsData: RefactoredTicketType[]
  stop: boolean
  status: 'idle' | 'loading' | 'failed'
  error: SerializedError | undefined
  searchId: string
}

const initialState: TicketsStateType = {
  ticketsData: [],
  stop: false,
  status: 'idle',
  error: undefined,
  searchId: '',
}

export const ticketsAPISlice = createAppSlice({
  name: 'tickets',
  initialState,
  reducers: (create) => ({
    getTickets: create.asyncThunk(fetchTickets, {
      pending: (state) => {
        state.status = 'loading'
      },
      fulfilled: (state, { payload }) => {
        // thunks logic can have dependencies btw ;)
        // refactor logic
        // cons easy to operate
        state.ticketsData.push(
          ...payload.tickets.map((i, ind) => {
            const refactoredTicket = {
              id: `Ticket-${ind}-${i.segments[0].date}`,
              carrier: i.carrier,
              price: i.price,
              img: `https://pics.avs.io/99/36/${i.carrier}.png`,
              data: i.segments ? i.segments.map((j) => refactorSegment(j)) : [],
            }
            return refactoredTicket
          })
        )
        state.stop = payload.stop
        state.error = undefined
        state.status = 'idle'
      },
      rejected: (state, action) => {
        state.error = action.error
        state.status = 'failed'
      },
    }),
    getSearchId: create.asyncThunk(fetchSearchId, {
      pending: (state) => {
        state.status = 'loading'
      },
      fulfilled: (state, { payload }) => {
        if (!state.searchId) {
          state.searchId = payload
        }
        state.error = undefined
        state.status = 'idle'
      },
      rejected: (state, action) => {
        state.error = action.error
        state.status = 'failed'
      },
    }),
  }),
  selectors: {
    selectTicketsData: (tickets) => tickets.ticketsData,
    selectStatus: (tickets) => tickets.status,
    selectError: (tickets) => tickets.error,
    selectSearchId: (tickets) => tickets.searchId,
    selectStop: (tickets) => tickets.stop,
  },
})

export const { getTickets, getSearchId } = ticketsAPISlice.actions

export const { selectTicketsData, selectStatus, selectError, selectSearchId, selectStop } = ticketsAPISlice.selectors

export const subedToTickets =
  (t?: number): AppThunk =>
  async (dispatch, getState) => {
    // end of recursion / polling
    if (selectStop(getState())) return 'no more data'
    // useless unless in dev mode
    if (selectStatus(getState()) === 'loading') return 'already loading'
    // guard if something went wrong
    const id = selectSearchId(getState())
    if (!id) throw new Error('searchId is not defined, it should exist in this moment')
    // actuall logic
    await dispatch(getTickets(id))
    // error logic
    if (selectStatus(getState()) === 'failed' && selectError(getState())) {
      // t means how many **tries** Error occurred
      if (t && t >= 5)
        throw new Error(
          `Server is not responding: ${selectError(getState())!.name} : ${selectError(getState())!.message}`
        )
      await new Promise((resolve) => {
        setTimeout(resolve, 150)
      })
      dispatch(subedToTickets(t ? t + 1 : 1))
    }
    // stop === true, data is over
    if (!selectStop(getState())) {
      // t reset, can be used without 0, it'll be the same
      dispatch(subedToTickets(0))
    }
    // (-_-)
    return 'ok'
  }
