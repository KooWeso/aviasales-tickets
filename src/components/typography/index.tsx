import Description from './Description'
import Price from './Price'
import Text from './Text'

export type TypographyProps = {
  Text: typeof Text
  Price: typeof Price
  Description: typeof Description
}

const Typography = {} as TypographyProps
Typography.Text = Text
Typography.Price = Price
Typography.Description = Description

export default Typography
