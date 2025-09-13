import { PrismaClient } from "@prisma/client";
import { ProfileDTO } from "../models/profiles";

const prisma = new PrismaClient();

export const createProfile = async (data: ProfileDTO) => {
  // ตรวจสอบ org_id
  const org = await prisma.organizations.findUnique({
    where: { org_id: data.org_id },
  });
  if (!org) throw new Error("Organization not found");

  // สร้าง profile
  return await prisma.profiles.create({ data });
};

export const getAllProfiles = async () => {
  return await prisma.profiles.findMany({
    orderBy: { created_at: 'desc' },
  });
};

export const getProfileById = async (profile_id: string) => {
  return await prisma.profiles.findUnique({
    where: { profile_id },
  });
};

export const updateProfile = async (profile_id: string, data: Partial<ProfileDTO>) => {
  const profile = await prisma.profiles.findUnique({ where: { profile_id } });
  if (!profile) throw new Error("Profile not found");

  return await prisma.profiles.update({
    where: { profile_id },
    data,
  });
};

export const deleteProfile = async (profile_id: string, org_id: string) => {
  // หา profile ที่ตรงกับ profile_id และ org_id
  const profile = await prisma.profiles.findFirst({
    where: {
      profile_id,
      org_id,
    },
  });

  if (!profile) throw new Error("Profile not found or does not belong to the organization");

  // ลบ profile
  await prisma.profiles.delete({
    where: { profile_id },
  });

  return profile;
};
