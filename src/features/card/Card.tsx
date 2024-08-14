import Image from '../../components/image/Image'
import Typography from '../../components/typography/index'

import style from './card.module.scss'

const { Price, Description } = Typography

type CardProps = {
  price: number
  img: string
  data: string
}

function Card({ price, img, data }: CardProps) {
  return (
    <div className={style.card}>
      <div className={style.card__header}>
        <Price price={price} /> <Image src={img} />
      </div>
      <div className={style.card__content}>
        <Description data={data} />
        <Description data={data} />
      </div>
    </div>
  )
}

export default Card
