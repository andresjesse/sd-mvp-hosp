import { Shift } from '@prisma/client'
import ShiftComponent from '../ShiftComponent'
import styles from './styles.module.css'
import React, { useState } from 'react'
import { Button, Modal } from 'antd'

interface CellProps {
  shifts: Array<Shift>
}

export default function ScheduleCell({ shifts }: CellProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(true)
    console.log(isModalOpen)
    setIsModalOpen(false)
    console.log(isModalOpen)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  return (
    <div onClick={showModal}>
      <ul className={styles.events}>
        {shifts?.map((shift) => (
          <li key={shift.id}>
            <ShiftComponent data={shift} />
          </li>
        ))}
      </ul>
      <Modal
        title="Ver turno"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  )
}
