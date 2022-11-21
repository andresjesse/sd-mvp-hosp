import { prisma } from '../lib/prisma'
import generateAdminSeed from './seeds/admin'
import generateDoctorsSeed from './seeds/doctors'
import { roles } from './seeds/roles'
import { sectors } from './seeds/sectors'

async function main() {
  const adminSeedData = await generateAdminSeed()
  const doctors = generateDoctorsSeed(5)

  await prisma.$transaction([
    ...sectors.map((sector) =>
      prisma.sector.upsert({
        where: {
          abbreviation: sector.abbreviation,
        },
        create: {
          ...sector,
        },
        update: {},
      })
    ),
    ...roles.map((role) =>
      prisma.role.upsert({
        where: {
          id: role.id,
        },
        create: {
          ...role,
        },
        update: {},
      })
    ),
    prisma.user.upsert({
      where: {
        email: process.env.ADMIN_EMAIL,
      },
      create: {
        ...adminSeedData,
      },
      update: {},
    }),
    ...(
      await doctors
    ).map((doctor) =>
      prisma.user.upsert({
        where: {
          email: doctor.email,
        },
        create: {
          ...doctor,
        },
        update: {},
      })
    ),
  ])
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
