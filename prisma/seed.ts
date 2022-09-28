import { sectors } from "./seeds/sectors";
import { prisma } from "../lib/prisma";

async function main() {
  await prisma.sector.createMany({
    data: sectors,
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
