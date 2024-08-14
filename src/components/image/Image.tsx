import style from './image.module.scss'

type ImageProps = {
  src: string
}

function Image({ src }: ImageProps) {
  return <img className={style.image} src={src} alt="company logo" />
}

export default Image
