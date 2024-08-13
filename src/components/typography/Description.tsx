import Text from './Text'
import style from './style/description.module.scss'

type DescriptionProps = {
  data: string
}

function Description({ data }: DescriptionProps) {
  const tab1 = (
    <div className={style.description_tab}>
      <Text faded>{`${data} - ${data}`}</Text>
      <Text size={3}>99:99 - 99:99</Text>
    </div>
  )
  const tab2 = (
    <div className={style.description_tab}>
      <Text faded>IN TRANSIT</Text>
      <Text size={3}>99h 99m</Text>
    </div>
  )
  const tab3 = (
    <div className={style.description_tab}>
      <Text faded>*num* TRANSFE*R/S*</Text>
      <Text size={3}>SEX, SEX</Text>
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
