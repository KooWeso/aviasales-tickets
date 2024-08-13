import style from './style/price.module.scss'

type PriceProps = {
  price: number
}

function Price({ price }: PriceProps) {
  const formated = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
    currencyDisplay: 'symbol',
  }).format(price)

  return <span className={style.price}>{formated}</span>
}

export default Price
