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
exports.deleteProject = exports.updateProject = exports.createProject = exports.getProjectById = exports.getProjects = void 0;
const ProjectService = __importStar(require("../services/projectsService"));
const projectsValidation_1 = require("../validations/projectsValidation");
const validateYup = async (schema, data) => {
    try {
        return await schema.validate(data, { abortEarly: false, stripUnknown: true });
    }
    catch (err) {
        throw err;
    }
};
const getProjects = async (req, res) => {
    try {
        const projects = await ProjectService.getAllProjects();
        res.json(projects);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getProjects = getProjects;
const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await ProjectService.getProjectById(id);
        if (!project)
            return res.status(404).json({ message: 'Project not found' });
        res.json(project);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getProjectById = getProjectById;
const createProject = async (req, res) => {
    try {
        console.log(req.body);
        const validated = await validateYup(projectsValidation_1.createProjectSchema, req.body);
        const project = await ProjectService.createProject(validated);
        console.log("Validated body:", validated);
        res.status(201).json(project);
    }
    catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ errors: err.errors });
        }
        res.status(500).json({ error: err.message });
    }
};
exports.createProject = createProject;
const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const validated = await validateYup(projectsValidation_1.updateProjectSchema, req.body);
        const project = await ProjectService.updateProject(id, validated);
        if (!project)
            return res.status(404).json({ message: 'Project not found' });
        res.json(project);
    }
    catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ errors: err.errors });
        }
        res.status(500).json({ error: err.message });
    }
};
exports.updateProject = updateProject;
const deleteProject = async (req, res) => {
    try {
        const { id } = req.params; // project_id
        const { org_id } = req.body; // รับ org_id จาก body
        if (!org_id) {
            return res.status(400).json({ error: "org_id is required in request body" });
        }
        const deletedProject = await ProjectService.deleteProject(id, org_id);
        res.json({
            message: 'Project deleted successfully',
            project: deletedProject
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.deleteProject = deleteProject;
