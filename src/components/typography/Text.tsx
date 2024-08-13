import { JSXElementConstructor, ReactElement } from 'react'

import style from './style/text.module.scss'

type TextProps = {
  size?: 1 | 2 | 3 | 4
  faded?: boolean
  children: string
}

function Text({
  size = 1,
  faded = false,
  children,
}: TextProps): ReactElement<TextProps, JSXElementConstructor<HTMLSpanElement>> {
  const classes = [style.text, style[`text_size--${size}`]]
  if (faded) classes.push(style.text_faded)
  return <span className={classes.join(' ')}>{children}</span>
}

export default Text
