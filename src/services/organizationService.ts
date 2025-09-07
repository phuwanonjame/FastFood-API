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

export const getOrganizationById = async (id: string) => {
  return await prisma.organizations.findUnique({
    where: { org_id: id },
    include: { type: true, plan: true },
  });
};

export const deleteOrganizationById = async (id: string) => {
  return await prisma.organizations.delete({
    where: { org_id: id },
  });
};