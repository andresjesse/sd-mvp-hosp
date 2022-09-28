import { prisma } from "../lib/prisma";
import AdminSeedFunction from "./seeds/admin";

async function main() {
  const adminSeedData = await AdminSeedFunction();
  await prisma.user.create({
    data: adminSeedData,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
