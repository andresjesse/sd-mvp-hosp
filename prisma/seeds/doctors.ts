import hasher from '../../utils/hasher/BcryptjsHasher'

interface IDoctor {
  name: string
  email: string
  passwordHash: string
  doctor: {
    create: {
      crmUf: string
      crm: string
    }
  }
}

export async function getDoctors(length: number) {
  const doctors: Array<IDoctor> = []
  const passwordHash = await hasher.hashAsync('123456')

  for (let i = 1; i <= length; i++) {
    doctors.push({
      name: 'Doctor Example',
      email: `doctor${i}@example.com`,
      passwordHash,
      doctor: {
        create: {
          crm: `123123${i}`,
          crmUf: 'PR',
        },
      },
    })
  }

  return doctors
}
