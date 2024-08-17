/* eslint-disable no-param-reassign */
import type { SerializedError } from '@reduxjs/toolkit'

import createAppSlice from '../../app/createAppSlice'
import type { AppThunk } from '../../app/store'

import { fetchSearchId, fetchTickets, subToTickets } from './ticketsAPI'
import type { Ticket } from './types'

export interface TicketsStateType {
  ticketsData: Ticket[]
  moreData: boolean
  status: 'idle' | 'loading' | 'failed'
  error: SerializedError | undefined
  searchId: string
}

const initialState: TicketsStateType = {
  ticketsData: [],
  moreData: false,
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
        state.ticketsData.push(...payload.tickets)
        state.moreData = payload.stop
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
        state.searchId = payload
        state.error = undefined
        state.status = 'idle'
      },
      rejected: (state, action) => {
        state.error = action.error
        state.status = 'failed'
      },
    }),
    subedToTickets: create.asyncThunk(subToTickets, {
      pending: (state) => {
        state.status = 'loading'
      },
      fulfilled: (state, { payload }) => {
        state.ticketsData.push(...payload.tickets)
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
  },
})

export const { getTickets, getSearchId } = ticketsAPISlice.actions

export const { selectTicketsData, selectStatus, selectError, selectSearchId } = ticketsAPISlice.selectors

// XXX
// TODO  refactor !
export const initializeTickets = (): AppThunk => async (dispatch, getState) => {
  // if id exists, do not fetch
  const searchId = selectSearchId(getState())
  const statusSearchIdle = selectStatus(getState())
  if (!searchId && statusSearchIdle === 'idle') await dispatch(getSearchId())
  // ==============================================
  // if fetching failed, fetch again
  const updatedSearchId = selectSearchId(getState())
  const statusSearchFailed = selectStatus(getState())
  if (!updatedSearchId || statusSearchFailed === 'failed') {
    await new Promise((resolve) => {
      setTimeout(resolve, 200)
    })
    initializeTickets()
  }
  // ==============================================
  // if fetching succeeded, get tickets
  // right now, it's not possible to fetch tickets without searchId
  // ticketsData array should be empty here !
  console.log('%c searchId: ', 'color: yellow', selectSearchId(getState()), 'before initT => SHOUD NOT BE EMPTY <=')
  console.log('%c status: ', 'color: pink', selectStatus(getState()), 'before initT => SHOUD BE IDLE <=')
  if (selectTicketsData(getState()).length)
    console.error('ticketsData should be empty here ! GOT: ', selectTicketsData(getState()))
  if (updatedSearchId) await dispatch(getTickets(updatedSearchId))
  console.log('%c ticketsData: ', 'color: green', selectTicketsData(getState()), 'after initT')
  console.log('%c status: ', 'color: blue', selectStatus(getState()), 'after initT => SHOUD BE failed or idle <=')

  // ==============================================
  // if fetching failed, fetch again
  const ticketsData = selectTicketsData(getState())
  const statusTicketsFailed = selectStatus(getState())
  if (!ticketsData.length && statusTicketsFailed === 'failed') {
    await new Promise((resolve) => {
      setTimeout(resolve, 200)
    })
    initializeTickets()
  }
  // ==============================================
  // if fetching succeeded, return tickets
  return ticketsData
}
