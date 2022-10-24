import { prisma } from '../lib/prisma'
import AdminSeedFunction from './seeds/admin'
import { sectors } from './seeds/sectors'

async function main() {
  const adminSeedData = await AdminSeedFunction()

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
    prisma.user.upsert({
      where: {
        email: process.env.ADMIN_EMAIL,
      },
      create: {
        ...adminSeedData,
      },
      update: {},
    }),
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
