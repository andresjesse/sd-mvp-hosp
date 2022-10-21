import { prisma } from '../lib/prisma'
import AdminSeedFunction from './seeds/admin'
import { sectors } from './seeds/sectors'

async function main() {
  const adminSeedData = await AdminSeedFunction()

  // const [sectorsResult, adminResult] = await prisma.$transaction([
  await prisma.$transaction([
    prisma.sector.createMany({
      data: sectors,
      skipDuplicates: true,
    }),
    prisma.user.create({
      data: adminSeedData,
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
