import type { ReactElement } from 'react'

import cl from './button.module.scss'

type ButtonProps = {
  children: string | ReactElement
  onClick: () => void
  style?: React.CSSProperties
}

function Button({ children, onClick, style = {} }: ButtonProps) {
  return (
    <button style={style} type="button" onClick={onClick} className={cl.button}>
      {children}
    </button>
  )
}

export default Button
