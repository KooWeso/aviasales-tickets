import { useAppDispatch, useAppSelector } from '../../app/hooks'
import Checkbox from '../../components/checkbox/Checkbox'

import { selectFilters, checkedFilter } from './filterSlice'

import './filter.scss'

function Filter() {
  const filters = useAppSelector(selectFilters)
  const dispatch = useAppDispatch()

  return (
    <ul className="options">
      {filters.map((i) => (
        <li key={i.name}>
          <Checkbox item={i} onChange={() => dispatch(checkedFilter(i.name))} />
        </li>
      ))}
    </ul>
  )
}

export default Filter
