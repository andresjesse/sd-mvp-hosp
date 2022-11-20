import { Interest } from '@prisma/client'
import { Calendar, Modal } from 'antd'
import { GetStaticProps } from 'next'
import { useState } from 'react'
import { prisma } from '../../lib/prisma'

interface InterestProps {
  interest: Array<Interest>
}

export const getStaticProps: GetStaticProps = async () => {
  const interest = await prisma.interest.findMany({
    include: {
      doctor: {
        select: {
          crm: true,
          user: {
            select: {
              name: true,
            },
          },
        },
      },
      ShiftAux: {
        select: {
          description: true,
        },
      },
    },
  })
  return {
    props: {
      interest,
    },
    revalidate: 10,
  }
}

export default function App({ interest }: InterestProps) {
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [modalText, setModalText] = useState(
    'Tela de cadastro do interesse do médico aqui deverá carregar automaticamente o médico logado e o dia do interesse carregado automaticamente pelo componente que foi clicado a ideia é um rádio buttom para o turno'
  )

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

  const showModal = () => {
    setOpen(true)
  }

  return (
    <>
      <Calendar
        dateCellRender={(value) => {
          for (const key of interest) {
            if (
              new Date(value).getDate() == new Date(key.day).getDate() &&
              new Date(value).getMonth() == new Date(key.day).getMonth() &&
              new Date(value).getFullYear() == new Date(key.day).getFullYear()
            ) {
              return <h4>{key.doctor.user.name}</h4>
            }
          }
        }}
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
