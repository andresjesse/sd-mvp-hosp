import { prisma } from '../lib/prisma'
import RolesEnum from '../utils/auth/RolesEnum'
import AdminSeedFunction from './seeds/admin'
import { roles } from './seeds/roles'
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
        update: {
          ...sector,
        },
      })
    ),
    ...roles.map((role) =>
      prisma.role.upsert({
        where: {
          title: role,
        },
        create: {
          title: role,
        },
        update: {},
      })
    ),
    prisma.user.upsert({
      where: {
        email: process.env.ADMIN_EMAIL,
      },
      create: {
        roles: {
          connect: {
            title: RolesEnum.ADMIN,
          },
        },
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
