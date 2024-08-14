import style from './checkbox.module.scss'

type CheckboxProps = {
  item: {
    name: string
    state: boolean
  }
  onChange: () => void
}

function Checkbox({ item, onChange }: CheckboxProps) {
  return (
    <label htmlFor={item.name} className={style.checkbox}>
      <input type="checkbox" checked={item.state} name="filter" id={item.name} value={item.name} onChange={onChange} />
      <span className={style.checkbox_dummy} />
      {item.name}
    </label>
  )
}

export default Checkbox
