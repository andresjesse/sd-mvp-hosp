import { Doctor, Shift } from '@prisma/client'
import ShiftComponent from '../ShiftComponent'
import styles from './styles.module.css'
import React, { useState } from 'react'
import { Button, List, Modal, Select, Switch } from 'antd'
import { DefaultOptionType } from 'antd/lib/select'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

interface CellProps {
  shifts: Array<Shift>
  doctors: Array<Doctor>
}

export default function ScheduleCell({ shifts, doctors }: CellProps) {
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
        value: doctor.userId,
        label: JSON.parse(JSON.stringify(doctor)).user.name,
      })
    })
    return doctorsList
  }

  const getShiftsList = () => {
    const doctorsList: Array<any> = []

    JSON.parse(JSON.stringify(shifts))?.map((shift: any) => {
      doctorsList.push({
        shiftTime: getFormatedHour(new Date(shift.startDate)),
        doctorName: !shift.doctor ? 'Selecionar' : shift.doctor?.user.name,
        isFixed: shift.isFixed,
      })
    })
    return doctorsList
  }

  const getFormatedHour = (date: Date) => {
    const shiftHour = (date.getHours() < 10 ? '0' : '') + date.getHours()
    const shiftMinute = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()

    return shiftHour + ':' + shiftMinute
  }

  return (
    <>
      <div onClick={showModal}>
        <ul className={styles.events}>
          {shifts?.map((shift) => (
            <li key={shift.id}>
              <ShiftComponent data={shift} />
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
              <List.Item.Meta title={shift.shiftTime} />
              <Select
                defaultValue={shift.doctorName}
                style={{ width: 200, marginRight: 20 }}
                allowClear
                options={getDoctorsList()}
              />
              <Switch
                style={{ marginRight: 10 }}
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                checked={shift.isFixed}
              />
              <List.Item.Meta title="É fixo?" />
            </List.Item>
          )}
        />
      </Modal>
    </>
  )
  /*<ul className={styles.events}>
          {JSON.parse(JSON.stringify(shifts))?.map((shift: any) => (
            <li key={shift.id}>
              <Space>
                <Badge
                  status={!shift.doctor ? 'warning' : 'processing'}
                  text={getFormatedHour(new Date(shift.startDate))}
                />
                <Select
                  defaultValue={shift.doctor?.name}
                  style={{ width: 120 }}
                  allowClear
                  options={getDoctorsList()}
                />
              </Space>
            </li>
          ))}
        </ul>*/
}
