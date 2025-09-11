import { PrismaClient } from "@prisma/client";
import { OrganizationDTO, } from "../models/organization";

const prisma = new PrismaClient();

export const createOrganization = async (data: OrganizationDTO) => {
  return await prisma.organizations.create({
    data,
    include: { type: true, plan: true },
  });
};

export const getOrganizations = async () => {
  return await prisma.organizations.findMany({
    include: { type: true, plan: true },
  });
};

export const getOrganizationsByUserId = async (userId: string) => {
  return await prisma.organizations.findMany({
    where: { user_id: userId }, // ใช้ user_id แทน org_id
    include: { type: true, plan: true },
  });
};


export const deleteOrganizationById = async (orgId: string, userId: string) => {
  // ดึงข้อมูลก่อนลบ
  const org = await prisma.organizations.findFirst({
    where: { org_id: orgId, user_id: userId },
    select: { org_id: true, name: true, type_id: true, plan_id: true, created_at: true }
  });

  if (!org) {
    const error: any = new Error("Organization not found");
    error.code = "P2025";
    throw error;
  }

  // ลบ org
  await prisma.organizations.delete({
    where: { org_id: orgId }
  });

  return org; // คืนค่าแบบ OrganizationResponse
};