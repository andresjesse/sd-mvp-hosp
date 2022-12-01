import ShiftComponent from '../ShiftComponent'
import styles from './styles.module.css'
import React, { useState } from 'react'
import { Button, List, message, Modal, Select, Switch } from 'antd'
import { DefaultOptionType } from 'antd/lib/select'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import axiosApi from '../../services/axiosApi'
import { useRouter } from 'next/router'
import { CompositeDoctor, CompositeShift } from '../../pages/schedule'

type ShiftListItem = {
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
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

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

  const getFormatedHour = (date: Date) => {
    const shiftHour = (date.getHours() < 10 ? '0' : '') + date.getHours()
    const shiftMinute = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()

    return shiftHour + ':' + shiftMinute
  }

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
      <div onClick={showModal}>
        <ul className={styles.events}>
          {shifts?.map((shift) => (
            <li key={shift.id}>
              <ShiftComponent shift={shift} />
            </li>
          ))}
        </ul>
      </div>
      <Modal
        title="Escala do dia"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="ok" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        <List
          itemLayout="horizontal"
          dataSource={getShiftsList()}
          renderItem={(shift) => (
            <List.Item>
              <List.Item.Meta title={shift.sector} />
              <List.Item.Meta title={shift.shiftTime + ': '} />
              <Select
                defaultValue={shift.doctorName}
                style={{ width: 200, marginRight: 20 }}
                options={getDoctorsList()}
                onChange={(value) => handleSelectDoctor(shift, parseInt(value))}
                allowClear
              />
              <Switch
                style={{ marginRight: 10 }}
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                checked={shift.isFixed}
                onChange={() => handleToggleIsFixed(shift)}
              />
              <List.Item.Meta title="É fixo?" />
            </List.Item>
          )}
        />
      </Modal>
    </>
  )
}
