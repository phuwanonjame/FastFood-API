import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.organization_types.createMany({
    data: [
      { type_name: "Public", description: "Public organization" },
      { type_name: "Private", description: "Private organization" },
      { type_name: "Non-profit", description: "Non-profit organization" },
    ],
    skipDuplicates: true,
  });

  await prisma.organization_plans.createMany({
    data: [
      { plan_name: "Basic", description: "Basic subscription plan" },
      { plan_name: "Pro", description: "Pro subscription plan" },
      { plan_name: "Enterprise", description: "Enterprise plan" },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
