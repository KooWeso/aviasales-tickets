import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../app/hooks'

import { initializeTickets, selectTicketsData } from './ticketsAPISlice'

// logic to fetch tickets
const useTickets = () => {
  const dispatch = useAppDispatch()
  const ticketsData = useAppSelector(selectTicketsData)

  // will be called only on first render
  useEffect(() => {
    if (ticketsData.length > 0) return
    console.log('useTickets is called ! 2 times in development !')
    dispatch(initializeTickets())
  }, [dispatch, ticketsData.length])
}

export default useTickets
