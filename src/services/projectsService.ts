import { PrismaClient } from "@prisma/client";
import { ProjectDTO } from "../models/profiles"; // ✅ ใช้ ProjectDTO ใหม่

const prisma = new PrismaClient();

export const createProject = async (data: ProjectDTO) => {
  // ตรวจสอบ org_id
  const org = await prisma.organizations.findUnique({
    where: { org_id: data.org_id },
  });
  if (!org) throw new Error("Organization not found");

  // สร้าง project
  return await prisma.projects.create({ data });
};

export const getAllProjects = async () => {
  return await prisma.projects.findMany({
    orderBy: { created_at: "desc" },
  });
};

export const getProjectById = async (projects_id: string) => {
  const project = await prisma.projects.findUnique({
    where: { projects_id },
  });
  if (!project) throw new Error("Project not found");
  return project;
};

export const updateProject = async (projects_id: string, data: Partial<ProjectDTO>) => {
  const project = await prisma.projects.findUnique({ where: { projects_id } });
  if (!project) throw new Error("Project not found");

  return await prisma.projects.update({
    where: { projects_id },
    data,
  });
};

export const deleteProject = async (projects_id: string, org_id: string) => {
  // หา project ที่ตรงกับ projects_id และ org_id
  const project = await prisma.projects.findFirst({
    where: {
      projects_id,
      org_id,
    },
  });

  if (!project) throw new Error("Project not found or does not belong to the organization");

  // ตรวจสอบ user_id (แค่ log)
  if (project.user_id) {
    console.log(`Project has a user assigned: ${project.user_id}`);
  }

  // ลบ project
  await prisma.projects.delete({
    where: { projects_id },
  });

  return project;
};
