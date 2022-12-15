import { Button, List, Modal } from 'antd'
import { ShiftListItem } from '..'

interface DoctorModalProps {
  shiftsList: Array<ShiftListItem>
  isModalOpen: boolean
  onCloseModal: () => void
  idDoctor: number
  onSelectDoctor: (shift: ShiftListItem, idDoctor: number) => void
}

export default function DoctorModal({
  shiftsList,
  isModalOpen,
  onCloseModal,
  idDoctor,
  onSelectDoctor,
}: DoctorModalProps) {
  const handleSelectDoctor = (shift: ShiftListItem) => {
    onSelectDoctor(shift, idDoctor)
  }

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
            {shift.doctorName ? (
              <List.Item.Meta title={shift.doctorName} />
            ) : (
              <Button
                key="assign-self"
                type="primary"
                onClick={() => handleSelectDoctor(shift)}
              >
                Associar-se ao turno
              </Button>
            )}
          </List.Item>
        )}
      />
    </Modal>
  )
}
