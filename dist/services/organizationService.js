"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrganizationById = exports.getOrganizationsByUserId = exports.getOrganizations = exports.createOrganization = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createOrganization = async (data) => {
    return await prisma.organizations.create({
        data,
        include: { type: true, plan: true },
    });
};
exports.createOrganization = createOrganization;
const getOrganizations = async () => {
    return await prisma.organizations.findMany({
        include: { type: true, plan: true },
    });
};
exports.getOrganizations = getOrganizations;
const getOrganizationsByUserId = async (userId) => {
    // ดึง organizations ของ user
    const organizations = await prisma.organizations.findMany({
        where: { user_id: userId },
        include: { type: true, plan: true },
    });
    // map organizations เพื่อเพิ่ม project info
    const organizationsWithProjectCount = await Promise.all(organizations.map(async (org) => {
        // ดึง project ของ org
        const projects = await prisma.projects.findMany({
            where: { org_id: org.org_id },
            select: {
                projects_id: true,
                projects_name: true,
            },
        });
        return {
            ...org,
            project_count: projects.length,
            projects: projects, // list ของ project
        };
    }));
    return {
        org_count: organizations.length, // จำนวนองค์กร
        organizations: organizationsWithProjectCount, // รายละเอียดองค์กร + project info
    };
};
exports.getOrganizationsByUserId = getOrganizationsByUserId;
const deleteOrganizationById = async (orgId, userId) => {
    // ดึงข้อมูลก่อนลบ
    const org = await prisma.organizations.findFirst({
        where: { org_id: orgId, user_id: userId },
        select: { org_id: true, name: true, type_id: true, plan_id: true, created_at: true }
    });
    if (!org) {
        const error = new Error("Organization not found");
        error.code = "P2025";
        throw error;
    }
    // ลบ org
    await prisma.organizations.delete({
        where: { org_id: orgId }
    });
    return org; // คืนค่าแบบ OrganizationResponse
};
exports.deleteOrganizationById = deleteOrganizationById;
