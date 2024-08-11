import { configureStore, combineSlices } from '@reduxjs/toolkit'

import { filterSlice } from '../features/filter/filterSlice'

const rootReducer = combineSlices(filterSlice)

export const store = configureStore({
  reducer: rootReducer,
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof rootReducer>
