import { Button, List, Modal, Switch } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import React from 'react'
import { ShiftListItem } from '..'
import Select, { DefaultOptionType } from 'antd/lib/select'

interface AdminModalProps {
  shiftsList: Array<ShiftListItem>
  doctorsList: Array<DefaultOptionType>
  isModalOpen: boolean
  onCloseModal: () => void
  onToggleIsFixed: (shift: ShiftListItem) => void
  onSelectDoctor: (shift: ShiftListItem, idDoctor: number) => void
}

export default function AdminModal({
  shiftsList,
  doctorsList,
  isModalOpen,
  onCloseModal,
  onSelectDoctor,
  onToggleIsFixed,
}: AdminModalProps) {
  return (
    <Modal
      title="Escala do dia"
      open={isModalOpen}
      onOk={onCloseModal}
      onCancel={onCloseModal}
      footer={[
        <Button key="ok" type="primary" onClick={onCloseModal}>
          OK
        </Button>,
      ]}
    >
      <List
        itemLayout="horizontal"
        dataSource={shiftsList}
        renderItem={(shift) => (
          <List.Item>
            <List.Item.Meta title={shift.sector} />
            <List.Item.Meta title={shift.shiftTime + ': '} />
            <Select
              defaultValue={shift.doctorName}
              style={{ width: 200, marginRight: 20 }}
              options={doctorsList}
              onChange={(value) => onSelectDoctor(shift, parseInt(value))}
              allowClear
            />
            <Switch
              style={{ marginRight: 10 }}
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              checked={shift.isFixed}
              onChange={() => onToggleIsFixed(shift)}
            />
            <List.Item.Meta title="É fixo?" />
          </List.Item>
        )}
      />
    </Modal>
  )
}
