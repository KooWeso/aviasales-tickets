import { useAppDispatch, useAppSelector } from '../../app/hooks'
import Checkbox from '../../components/checkbox/Checkbox'
import Text from '../../components/typography/Text'

import { selectFilters, checkedFilter } from './filterSlice'
import style from './filter.module.scss'

function Filter() {
  const filters = useAppSelector(selectFilters)
  const dispatch = useAppDispatch()

  return (
    <section className={style.filter_wrapper}>
      <div className={style.filter_title}>
        <Text size={2}>AMOUNT OF TRANSFERS</Text>
      </div>
      <ul className={style.filter}>
        {filters.map((i) => (
          <li key={i.name}>
            <Checkbox item={i} onChange={() => dispatch(checkedFilter(i.name))} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Filter
