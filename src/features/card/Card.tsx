import Image from '../../components/image/Image'
import type { DescriptionData } from '../../components/typography/Description'
import Typography from '../../components/typography/index'
import type { Ticket } from '../tickets/types'

import style from './card.module.scss'

const { Price, Description } = Typography

export type CardProps = {
  price: Ticket['price']
  img: Ticket['carrier']
  data: DescriptionData[]
}

function Card({ price, img, data }: CardProps) {
  return (
    <div className={style.card}>
      <div className={style.card__header}>
        <Price price={price} /> <Image src={img} />
      </div>
      <div className={style.card__content}>
        {data.map((i) => (
          <Description key={`${i.origin}-${i.destination}`} data={i} />
        ))}
      </div>
    </div>
  )
}

export default Card
