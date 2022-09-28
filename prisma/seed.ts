import { prisma } from "../lib/prisma";
import AdminSeed from "./seeds/admin";

async function main() {
  await AdminSeed();
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
