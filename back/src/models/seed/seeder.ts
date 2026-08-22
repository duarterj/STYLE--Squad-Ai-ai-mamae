import { prisma } from "../../config/prisma";
import { productSeeder } from "./ProductSeeder";

const productsPerCategory = 8;

async function main() {
  await prisma.$connect();

  console.log("Populando o banco de dados...");
  await productSeeder(prisma, productsPerCategory);
  console.log("Banco de dados populado!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
