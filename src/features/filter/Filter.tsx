import { useAppDispatch, useAppSelector } from '../../app/hooks'

import { selectFilters, checkedFilter } from './filterSlice'

function Filter() {
  const filters = useAppSelector(selectFilters)
  const dispatch = useAppDispatch()

  return (
    <ul className="options">
      {filters.map((i) => (
        <li key={i.name}>
          <input
            type="checkbox"
            checked={i.state}
            name={i.name}
            id={i.name}
            onChange={() => dispatch(checkedFilter(i.name))}
          />
          <label htmlFor={i.name}>{i.name}</label>
        </li>
      ))}
    </ul>
  )
}

export default Filter
