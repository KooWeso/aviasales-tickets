import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../app/hooks'

import { subedToTickets, getSearchId, selectSearchId } from './ticketsAPISlice'

// logic to fetch tickets
const useTickets = () => {
  const dispatch = useAppDispatch()
  const searchId = useAppSelector(selectSearchId)

  // will be called only on first render
  useEffect(() => {
    if (searchId) return
    dispatch(getSearchId()).catch((error) => {
      throw new Error(`getSearchId error: ${error}`)
    })
  }, [dispatch, searchId])
  // will be called only if searchId is defined
  // and expectedly from here it will be called only once
  // but its own logic uses Recursirsion
  useEffect(() => {
    if (!searchId) return
    dispatch(subedToTickets())
  }, [dispatch, searchId])
}

export default useTickets
