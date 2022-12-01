import Roles from '../../utils/auth/Roles'
import hasher from '../../utils/hasher/BcryptjsHasher'

type TDoctorUser = {
  name: string
  email: string
  passwordHash: string
  doctor: {
    create: {
      crmUf: string
      crm: string
    }
  }
  roles: {
    connect: {
      id: number
    }
  }
}

export default async function generateDoctorsSeed(length: number) {
  const doctors: Array<TDoctorUser> = []
  const passwordHash = await hasher.hashAsync('123456')

  for (let i = 1; i <= length; i++) {
    doctors.push({
      name: 'Doctor ' + i,
      email: `doctor${i}@example.com`,
      passwordHash,
      doctor: {
        create: {
          crm: `123123${i}`,
          crmUf: 'PR',
        },
      },
      roles: {
        connect: {
          id: Roles.DOCTOR,
        },
      },
    })
  }

  return doctors
}
