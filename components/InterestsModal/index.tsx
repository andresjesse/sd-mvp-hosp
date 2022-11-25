import { CheckOutlined } from '@ant-design/icons'
import { Interest, Sector } from '@prisma/client'
import { Form, message, Modal, Switch } from 'antd'
import { Moment } from 'moment'
import { useRouter } from 'next/router'
import SHIFTS from '../../constants/Shifts'
import axiosApi from '../../services/axiosApi'
import createDateUTC from '../../utils/datetime/createDateUTC'
import isSameDay from '../../utils/datetime/isSameDay'
import isSameShiftUTC from '../../utils/datetime/isSameShiftUTC'

interface InterestsModalProps {
  selectedDate: Moment | null
  sectors: Array<Sector>
  interests: Array<Interest>
  onCloseModal: Function
}

export default function InterestsModal({
  selectedDate,
  sectors,
  interests,
  onCloseModal,
}: InterestsModalProps) {
  const router = useRouter()
  const [form] = Form.useForm()

  const handleCancel = () => {
    onCloseModal()
  }

  const handleToggleInterest = async (
    idSector: number,
    startUTC: number,
    endUTC: number
  ) => {
    const startDate = createDateUTC(selectedDate!.toDate(), startUTC)
    const endDate = createDateUTC(selectedDate!.toDate(), endUTC)

    axiosApi
      .post('/api/interest/toggle', {
        idSector,
        startDate,
        endDate,
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
        message.error('Erro ao salvar o interesse! Tente mais tarde.')
      })
      .finally(() => {
        router.push(location.href)
      })
  }

  return (
    <Modal
      title={`Cadastro de Interesse para o dia: ${selectedDate?.format(
        'DD/MM/YY'
      )}`}
      open={selectedDate != null}
      footer={null}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        labelCol={{ span: 6 }}
        labelAlign="left"
        wrapperCol={{ span: 16 }}
      >
        {sectors.map((sector) =>
          SHIFTS.map((shift, index) => {
            // Convert fixed shift to localtime (for UI only)
            const startHourLocalTime = shift.START_UTC - 3
            const endHourLocalTime = (shift.END_UTC - 3) % 24

            let checked = false

            interests.forEach((i) => {
              const interestStartDate = new Date(i.startDate)
              const interestEndDate = new Date(i.endDate)

              if (
                selectedDate &&
                isSameDay(interestStartDate, selectedDate.toDate()) &&
                isSameShiftUTC(interestStartDate, interestEndDate, shift) &&
                i.idSector === sector.id
              ) {
                checked = true
              }
            })

            return (
              <Form.Item
                key={sector.abbreviation + index}
                label={`${sector.abbreviation}: ${startHourLocalTime} às ${endHourLocalTime}`}
              >
                <Switch
                  checkedChildren={<CheckOutlined />}
                  checked={checked}
                  onChange={() =>
                    handleToggleInterest(
                      sector.id,
                      shift.START_UTC,
                      shift.END_UTC
                    )
                  }
                />
              </Form.Item>
            )
          })
        )}
      </Form>
    </Modal>
  )
}
