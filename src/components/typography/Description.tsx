import Text from './Text'
import style from './style/description.module.scss'

type TimeFormat = `${string} - ${string}`
type DurationFormat = string
export interface DescriptionData {
  origin: string
  destination: string
  timeFromAToB: TimeFormat
  duration: DurationFormat
  stops: string[]
}

type DescriptionProps = {
  data: DescriptionData
}
function Description({ data }: DescriptionProps) {
  const tab1 = (
    <div className={style.description_tab}>
      <Text faded>{`${data.origin} - ${data.destination}`}</Text>
      <Text size={3}>{data.timeFromAToB}</Text>
    </div>
  )
  const tab2 = (
    <div className={style.description_tab}>
      <Text faded>IN TRANSIT</Text>
      <Text size={3}>{data.duration}</Text>
    </div>
  )
  const tab3 = (
    <div className={style.description_tab}>
      <Text faded>{`${data.stops.length || 'NO'} TRANSFER${data.stops.length === 1 ? '' : 'S'}`}</Text>
      <Text size={3}>{data.stops.join(', ')}</Text>
    </div>
  )

  const content = (
    <div className={style.description}>
      {tab1}
      {tab2}
      {tab3}
    </div>
  )

  return content
}

export default Description
