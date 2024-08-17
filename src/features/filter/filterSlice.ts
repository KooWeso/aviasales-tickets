/* eslint-disable no-param-reassign */
// REDUCKS pattern ;)

import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

type Filter = {
  name: string
  state: boolean
}

export interface FilterState {
  filterData: Filter[]
}

const initialState: FilterState = {
  filterData: [
    { name: 'All', state: true },
    { name: 'No transfers', state: true },
    { name: '1 transfer', state: true },
    { name: '2 transfers', state: true },
    { name: '3 transfers', state: true },
  ],
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: (create) => ({
    checkedFilter: create.reducer((state, action: PayloadAction<string>) => {
      const foundFilter = state.filterData.find((i) => i.name === action.payload)
      const filterAll = state.filterData[0]
      // Toggles state
      if (foundFilter) {
        foundFilter.state = !foundFilter.state
      }
      // Then =>
      // Changes every state the same as filter 'All' state
      if (filterAll === foundFilter) {
        state.filterData.forEach((i) => {
          i.state = filterAll.state
        })
        return
      }
      // Or =>
      // If every state except filterAll is true, it checks or unchecks filterAll
      if (state.filterData.every((i) => i.state || i === filterAll)) {
        filterAll.state = true
      } else {
        filterAll.state = false
      }
      if (!foundFilter) throw new Error(`Filter by name '${action.payload}' was not found on 'filterData'!`)
    }),
  }),
  selectors: {
    selectFilters: (filter) => filter.filterData,
  },
})

export const { selectFilters } = filterSlice.selectors

export const { checkedFilter } = filterSlice.actions
