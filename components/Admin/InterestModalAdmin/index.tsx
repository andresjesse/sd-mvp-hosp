import { CheckOutlined } from '@ant-design/icons'
import { Doctor, Interest, Sector, User } from '@prisma/client'
import { Form, message, Modal, Switch } from 'antd'
import { Moment } from 'moment'
import { useRouter } from 'next/router'
import SHIFTS from '../../../constants/Shifts'
import { sectors } from '../../../prisma/seeds/sectors'
import axiosApi from '../../../services/axiosApi'
import createDateUTC from '../../../utils/datetime/createDateUTC'
import isSameDay from '../../../utils/datetime/isSameDay'
import isSameShiftUTC from '../../../utils/datetime/isSameShiftUTC'

interface InterestModalAdminProps {
  selectedDate: Moment | null
  sectors: Array<Sector>
  doctors: Array<Doctor>
  interests: Array<Interest>
  users: Array<User>
  onCloseModal: () => void
}

export default function InterestsModal({
  selectedDate,
  interests,
  sectors,
  doctors,
  users,
  onCloseModal,
}: InterestModalAdminProps) {
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
    if (selectedDate) {
      const startDate = createDateUTC(selectedDate.toDate(), startUTC)
      const endDate = createDateUTC(selectedDate.toDate(), endUTC)

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
        labelCol={{ span: 12 }}
        labelAlign="left"
        wrapperCol={{ span: 16 }}
      >
        {interests.map((i) =>
          SHIFTS.map((shift, index) => {
            // Convert fixed shift to localtime (for UI only)
            const startHourLocalTime = shift.START_UTC - 3
            const endHourLocalTime = (shift.END_UTC - 3) % 24

            //let checked = false

            const interestStartDate = new Date(i.startDate)
            const interestEndDate = new Date(i.endDate)

            if (
              selectedDate &&
              isSameDay(interestStartDate, selectedDate.toDate()) &&
              isSameShiftUTC(interestStartDate, interestEndDate, shift)
            ) {
              const sector = sectors.find((s) => s.id == i.idSector)
              const doctor = doctors.find((d) => i.idDoctor == d.id)
              const user = users.find((u) => doctor?.userId == u.id)
              //checked = true
              return (
                <Form.Item
                  key={index}
                  label={`${user?.name}: ${startHourLocalTime} às ${endHourLocalTime} - em ${sector?.abbreviation}`}
                ></Form.Item>
              )
            }
          })
        )}
      </Form>
    </Modal>
  )
}
