import { PrismaClient } from '@prisma/client-vehicles';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  const data = JSON.parse(fs.readFileSync('./prisma/vehicles.json', 'utf-8'));

  for (const vehicle of data) {
    await prisma.vehicle.create({
      data: {
        make: vehicle.make,
        model: vehicle.model,
        year: vehicle.year,
        vin: vehicle.vin,
        color: vehicle.color,
        userId: vehicle.userId,
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
