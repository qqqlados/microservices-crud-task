import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  const data = JSON.parse(fs.readFileSync('./prisma/vehicles.json', 'utf-8'));

  for (const user of data) {
    await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: user.password,
      },
    });
  }

  console.log('✅ Vehicles successfully seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
