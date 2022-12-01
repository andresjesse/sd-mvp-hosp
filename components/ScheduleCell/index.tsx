import { message } from 'antd'
import { DefaultOptionType } from 'antd/lib/select'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { CompositeDoctor, CompositeShift } from '../../pages/schedule'
import axiosApi from '../../services/axiosApi'
import ShiftComponent from '../ShiftComponent'
import AdminModal from './AdminModal'
import styles from './styles.module.css'

export type ShiftListItem = {
  id: number
  shiftTime: string
  doctorName: string
  idDoctor?: number
  isFixed: boolean
  sector: string
}

interface CellProps {
  shifts: Array<CompositeShift>
  doctors: Array<CompositeDoctor>
}

export default function ScheduleCell({ shifts, doctors }: CellProps) {
  const router = useRouter()
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false)

  // helper
  const getDoctorsList = () => {
    const doctorsList: Array<DefaultOptionType> = []

    doctors.map((doctor) => {
      doctorsList.push({
        value: doctor.id,
        label: doctor.user.name,
      })
    })
    return doctorsList
  }

  // helper
  const getShiftsList = () => {
    const shiftsList: Array<ShiftListItem> = []

    shifts.map((shift: CompositeShift) => {
      shiftsList.push({
        id: shift.id,
        shiftTime: getFormatedHour(new Date(shift.startDate)),
        doctorName: !shift.doctor ? 'Selecionar' : shift.doctor?.user.name,
        idDoctor: shift.doctor?.id,
        isFixed: shift.isFixed,
        sector: shift.sector.abbreviation,
      })
    })
    return shiftsList
  }

  // helper
  const getFormatedHour = (date: Date) => {
    const shiftHour = (date.getHours() < 10 ? '0' : '') + date.getHours()
    const shiftMinute = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
    return shiftHour + ':' + shiftMinute
  }

  // API Call
  const handleSelectDoctor = async (shift: ShiftListItem, idDoctor: number) => {
    axiosApi
      .post('/api/shifts/selectDoctor', {
        shift,
        idDoctor,
      })
      .then((res) => {
        if (res.status == 200) {
          message.info('Salvo com sucesso!')
        } else {
          throw new Error(res.statusText)
        }
      })
      .catch((err) => {
        console.log(err)
        message.error('Erro ao salvar o médico! Tente mais tarde.')
      })
      .finally(() => {
        router.push(location.href)
      })
  }

  // API Call
  const handleToggleIsFixed = async (shift: ShiftListItem) => {
    axiosApi
      .post('/api/shifts/toggleIsFixed', {
        shift,
      })
      .then((res) => {
        if (res.status == 200) {
          message.info('Salvo com sucesso!')
        } else {
          throw new Error(res.statusText)
        }
      })
      .catch((err) => {
        console.log(err)
        message.error('Erro ao salvar o turno! Tente mais tarde.')
      })
      .finally(() => {
        router.push(location.href)
      })
  }

  return (
    <>
      <div onClick={() => setIsAdminModalOpen(true)}>
        <ul className={styles.events}>
          {shifts?.map((shift) => (
            <li key={shift.id}>
              <ShiftComponent shift={shift} />
            </li>
          ))}
        </ul>
      </div>

      <AdminModal
        isModalOpen={isAdminModalOpen}
        onCloseModal={() => setIsAdminModalOpen(false)}
        doctorsList={getDoctorsList()}
        shiftsList={getShiftsList()}
        onSelectDoctor={handleSelectDoctor}
        onToggleIsFixed={handleToggleIsFixed}
      />
    </>
  )
}
