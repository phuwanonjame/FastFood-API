const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    const result = await prisma.$queryRaw`SELECT NOW()`;
    console.log('Connected!', result);
  } catch (e) {
    console.error('Error connecting:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
