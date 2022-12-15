import { Badge, Tag, Tooltip } from 'antd'
import { CompositeShift } from '../../pages/schedule'
import styles from './styles.module.css'

interface ShiftProps {
  shift: CompositeShift
}

const getBadgetColor = (shift: CompositeShift) => {
  if (shift.isFixed) return shift.doctor ? 'blue' : 'rgb(139, 214, 224)'
  return shift.doctor ? 'green' : 'lightgrey'
}

export default function ShiftComponent({ shift }: ShiftProps) {
  const doctorName = !shift.doctor ? 'Vago' : shift.doctor.user.name

  const getFormatedHour = (date: Date) => {
    return (date.getHours() < 10 ? '0' : '') + date.getHours()
  }

  const badgeColor = getBadgetColor(shift)

  const startDate = getFormatedHour(new Date(shift.startDate))

  const text = `${shift.sector.abbreviation} ${startDate} - ${doctorName}`

  return (
    <Tooltip title={text}>
      <Tag className={styles.tag} color={badgeColor}>
        {text}
      </Tag>
    </Tooltip>
  )
}
