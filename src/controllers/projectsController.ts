import { Request, Response } from 'express';
import * as ProjectService from '../services/projectsService';
import { createProjectSchema, updateProjectSchema } from '../validations/projectsValidation';

const validateYup = async (schema: any, data: any) => {
  try {
    return await schema.validate(data, { abortEarly: false, stripUnknown: true });
  } catch (err: any) {
    throw err;
  }
};

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await ProjectService.getAllProjects();
    res.json(projects);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};


export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await ProjectService.getProjectById(id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};


export const createProject = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const validated = await validateYup(createProjectSchema, req.body);
    const project = await ProjectService.createProject(validated);
    console.log("Validated body:", validated);
    res.status(201).json(project);
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ errors: err.errors });
    }
    res.status(500).json({ error: err.message });
  }
};


export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validated = await validateYup(updateProjectSchema, req.body);
    const project = await ProjectService.updateProject(id, validated);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ errors: err.errors });
    }
    res.status(500).json({ error: err.message });
  }
};


export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;        // project_id
    const { org_id } = req.body;      // รับ org_id จาก body

    if (!org_id) {
      return res.status(400).json({ error: "org_id is required in request body" });
    }

    const deletedProject = await ProjectService.deleteProject(id, org_id);

    res.json({
      message: 'Project deleted successfully',
      project: deletedProject
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
