import type { JSXElementConstructor, ReactElement } from 'react'

import cl from './style/text.module.scss'

type TextProps = {
  size?: 1 | 2 | 3 | 4
  faded?: boolean
  children: string
  style?: React.CSSProperties
}

function Text({
  style = {},
  size = 1,
  faded = false,
  children,
}: TextProps): ReactElement<TextProps, JSXElementConstructor<HTMLSpanElement>> {
  const classes = [cl.text, cl[`text_size--${size}`]]
  if (faded) classes.push(cl.text_faded)
  return (
    <span style={style} className={classes.join(' ')}>
      {children}
    </span>
  )
}

export default Text
