import { Doctor, User } from '@prisma/client'
import { Card, notification, Switch, Table, Button, Input, Space } from 'antd'
import { ColumnsType, ColumnType } from 'antd/es/table'
import React, { useRef, useState } from 'react'
import axiosApi from '../../../services/axiosApi'
import { SearchOutlined } from '@ant-design/icons'
import type { InputRef } from 'antd'
import type { FilterConfirmProps } from 'antd/es/table/interface'

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
  crm: string
  email: string
  uf: string
  active: boolean
}

// Table Helper
const getDataTable = (
  doctorData: Array<Doctor & { user: User }>
): Array<DataType> => {
  return doctorData.map((item) => {
    return {
      key: item.id,
      name: item.user.name,
      crm: item.crm,
      email: item.user.email,
      uf: item.crmUf,
      active: item.isActive,
    }
  })
}

// Main Component & Props
interface DoctorActivationCardProps {
  doctors: Array<Doctor & { user: User }>
}

type DataIndex = keyof DataType

export default function DoctorActivationCard({
  doctors,
}: DoctorActivationCardProps) {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef<InputRef>(null)

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters: () => void) => {
    clearFilters()
    setSearchText('')
  }

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Buscar ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Buscar
          </Button>
          <Button
            onClick={() => {
              clearFilters && handleReset(clearFilters)
              confirm({ closeDropdown: false })
            }}
            size="small"
            style={{ width: 90 }}
          >
            Limpar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },
    render: (text) => text,
  })

  // Table Helper
  const columns: ColumnsType<DataType> = [
    {
      title: 'Nome',
      dataIndex: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'CRM',
      dataIndex: 'crm',
      ...getColumnSearchProps('crm'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
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

  return (
    <Card title="Ativação de cadastro">
      <Table columns={columns} dataSource={getDataTable(doctors)} />
    </Card>
  )
}
