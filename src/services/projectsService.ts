import { PrismaClient } from "@prisma/client";
import { ProjectDTO } from "../models/profiles";   // ✅ เปลี่ยนชื่อ model/dto ด้วย

const prisma = new PrismaClient();

export const createProject = async (data: ProjectDTO) => {
  // ตรวจสอบ org_id
  const org = await prisma.organizations.findUnique({
    where: { org_id: data.org_id },
  });
  if (!org) throw new Error("Organization not found");

  // สร้าง project
  return await prisma.projects.create({ data });   // ✅ เปลี่ยน profiles → projects
};

export const getAllProjects = async () => {
  return await prisma.projects.findMany({
    orderBy: { created_at: "desc" },
  });
};

export const getProjectById = async (projects_id: string) => {
  return await prisma.projects.findUnique({
    where: { projects_id },   // ✅ profile_id → project_id
  });
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

  // ตรวจสอบ user_id ว่ามีไหม (แค่เช็ค ไม่แก้ค่า)
  if (project.user_id) {
    console.log(`Project has a user assigned: ${project.user_id}`);
    // ถ้าต้องการสามารถทำ logic อื่นต่อได้ เช่น ยกเลิกการลบ หรือส่ง warning
  }

  // ลบ project
  await prisma.projects.delete({
    where: { projects_id },
  });

  return project;
};
