import { Button, Modal } from 'antd'
import { ShiftListItem } from '..'

interface DoctorModalProps {
  shiftsList: Array<ShiftListItem>
  isModalOpen: boolean
  onCloseModal: () => void
  idDoctor?: number
}

export default function DoctorModal({
  shiftsList,
  isModalOpen,
  onCloseModal,
  idDoctor,
}: DoctorModalProps) {
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
      {JSON.stringify(shiftsList)}
      DOCTOR: {idDoctor}
      Render condicional, só mostrar botão nos turnos onde doctorName = null
      {/* <List
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
      /> */}
    </Modal>
  )
}
