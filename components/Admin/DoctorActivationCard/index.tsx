import { Doctor, User } from '@prisma/client'
import { Card, notification, Switch, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React from 'react'
import axiosApi from '../../../services/axiosApi'

// Activation Callback
const toggleDoctorActivation = async (active: boolean, id: React.Key) => {
  try {
    const response = await axiosApi.post('/api/doctor/activate', {
      id,
      active,
    })

    if (response.status === 200) {
      notification['success']({
        message: `O cadastro foi ${active ? 'ativado' : 'desativado'}!`,
      })
    } else {
      throw new Error(response.statusText)
    }
  } catch (error) {
    notification['error']({
      message: 'Algo deu errado!',
      description: `${error}`,
      duration: 0,
    })
  }
}

// Table Type Definition
type DataType = {
  key: React.Key
  name: string
  email: string
  crm: string
  uf: string
  active: boolean
}

// Table Helper
const columns: ColumnsType<DataType> = [
  {
    title: 'Nome',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'CRM',
    dataIndex: 'crm',
  },
  {
    title: 'UF',
    dataIndex: 'uf',
  },
  {
    title: 'Ativo',
    dataIndex: 'active',
    render: (_, record) => (
      <Switch
        defaultChecked={record.active}
        onClick={(checked) => {
          toggleDoctorActivation(checked, record.key)
        }}
      />
    ),
  },
]

// Table Helper
const getDataTable = (
  doctorData: Array<Doctor & { user: User }>
): Array<DataType> => {
  return doctorData.map((item) => {
    return {
      key: item.id,
      name: item.user.name,
      email: item.user.email,
      crm: item.crm,
      uf: item.crmUf,
      active: item.isActive,
    }
  })
}

// Main Component & Props
interface DoctorActivationCardProps {
  doctors: Array<Doctor & { user: User }>
}

export default function DoctorActivationCard({
  doctors,
}: DoctorActivationCardProps) {
  console.log(doctors)
  return (
    <Card title="Ativação de cadastro">
      <Table columns={columns} dataSource={getDataTable(doctors)} />
    </Card>
  )
}
