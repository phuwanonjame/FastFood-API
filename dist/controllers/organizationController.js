"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.delOrganizationByIdController = exports.getOrganizationsByUserIdController = exports.getOrganizationsController = exports.createOrganizationController = void 0;
const organizationService = __importStar(require("../services/organizationService"));
const createOrganizationController = async (req, res) => {
    try {
        const ordered = {
            user_id: req.body.user_id,
            name: req.body.name,
            type_id: req.body.type_id,
            plan_id: req.body.plan_id,
        };
        console.log(JSON.stringify(ordered, null, 2));
        const data = req.body;
        if (!data.user_id) {
            return res.status(400).json({ success: false, message: "user_id is required" });
        }
        const org = await organizationService.createOrganization(data);
        res.status(201).json({ success: true, data: org });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Failed to create organization", details: error });
    }
};
exports.createOrganizationController = createOrganizationController;
const getOrganizationsController = async (_req, res) => {
    try {
        const orgs = await organizationService.getOrganizations();
        res.json(orgs);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch organizations", details: error });
    }
};
exports.getOrganizationsController = getOrganizationsController;
// Controller
const getOrganizationsByUserIdController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id)
            return res.status(400).json({ error: "userId is required" });
        const orgData = await organizationService.getOrganizationsByUserId(id);
        // ตรวจสอบข้อมูล
        if (!orgData || orgData.org_count === 0) {
            return res.status(404).json({ error: "No organizations found for this user" });
        }
        // คืนค่าเป็น object พร้อม org_count
        res.json(orgData);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch organizations", details: error });
    }
};
exports.getOrganizationsByUserIdController = getOrganizationsByUserIdController;
const delOrganizationByIdController = async (req, res) => {
    try {
        const { id } = req.params; // org_id
        const { userId } = req.body; // user_id จาก request body หรือ header
        console.log(userId);
        if (!id || !userId) {
            return res.status(400).json({ error: "org_id and user_id are required" });
        }
        const org = await organizationService.deleteOrganizationById(id, userId);
        const response = {
            message: "Organization deleted successfully",
            data: org,
        };
        res.json(response);
    }
    catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ error: "Organization not found" });
        }
        res.status(500).json({ error: "Failed to delete organization", details: error });
    }
};
exports.delOrganizationByIdController = delOrganizationByIdController;
