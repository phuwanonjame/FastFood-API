"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.getProjectById = exports.getAllProjects = exports.createProject = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createProject = async (data) => {
    // ตรวจสอบ org_id
    const org = await prisma.organizations.findUnique({
        where: { org_id: data.org_id },
    });
    if (!org)
        throw new Error("Organization not found");
    // สร้าง project
    return await prisma.projects.create({ data });
};
exports.createProject = createProject;
const getAllProjects = async () => {
    return await prisma.projects.findMany({
        orderBy: { created_at: "desc" },
    });
};
exports.getAllProjects = getAllProjects;
const getProjectById = async (projects_id) => {
    const project = await prisma.projects.findUnique({
        where: { projects_id },
    });
    if (!project)
        throw new Error("Project not found");
    return project;
};
exports.getProjectById = getProjectById;
const updateProject = async (projects_id, data) => {
    const project = await prisma.projects.findUnique({ where: { projects_id } });
    if (!project)
        throw new Error("Project not found");
    return await prisma.projects.update({
        where: { projects_id },
        data,
    });
};
exports.updateProject = updateProject;
const deleteProject = async (projects_id, org_id) => {
    // หา project ที่ตรงกับ projects_id และ org_id
    const project = await prisma.projects.findFirst({
        where: {
            projects_id,
            org_id,
        },
    });
    if (!project)
        throw new Error("Project not found or does not belong to the organization");
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
exports.deleteProject = deleteProject;
