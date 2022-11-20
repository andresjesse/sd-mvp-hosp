import type { BadgeProps } from 'antd'
import { Badge, Calendar, Modal } from 'antd'
import type { Moment } from 'moment'
import React, { useState } from 'react'

const getListData = (value: Moment) => {
  let listData
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
      ]
      break
    case 10:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
        { type: 'error', content: 'This is error event.' },
      ]
      break
    case 15:
      listData = [
        { type: 'warning', content: 'This is warning event' },
        { type: 'success', content: 'This is very long usual event。。....' },
        { type: 'error', content: 'This is error event 1.' },
        { type: 'error', content: 'This is error event 2.' },
        { type: 'error', content: 'This is error event 3.' },
        { type: 'error', content: 'This is error event 4.' },
      ]
      break
    default:
  }
  return listData || []
}

const getMonthData = (value: Moment) => {
  if (value.month() === 8) {
    return 1394
  }
}

const App: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [modalText, setModalText] = useState(
    'Tela de cadastro do interesse do médico aqui deverá carregar automaticamente o médico logado e o dia do interesse carregado automaticamente pelo componente que foi clicado a ideia é um rádio buttom para o turno'
  )
  const monthCellRender = (value: Moment) => {
    const num = getMonthData(value)
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null
  }

  const handleCancel = () => {
    console.log('Clicked cancel button')
    setOpen(false)
  }

  const handleOk = () => {
    setModalText('O interesse será salvo')
    setConfirmLoading(true)
    setTimeout(() => {
      setOpen(false)
      setConfirmLoading(false)
    }, 2000)
  }

  const dateCellRender = (value: Moment) => {
    const listData = getListData(value)
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge
              status={item.type as BadgeProps['status']}
              text={item.content}
            />
          </li>
        ))}
      </ul>
    )
  }

  const showModal = () => {
    setOpen(true)
  }

  return (
    <>
      <Calendar
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
        onSelect={showModal}
      />

      <Modal
        title="Cadastro de Interesse"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  )
}

export default App
