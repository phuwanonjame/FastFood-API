import { Request, Response } from "express";
import * as organizationService from "../services/organizationService";
import { OrganizationDTO, DeleteOrganizationResponse } from "../models/organization";


export const createOrganizationController = async (req: Request, res: Response) => {
  try {
    const data: OrganizationDTO = req.body;

    if (!data.user_id) {
      return res.status(400).json({ success: false, message: "user_id is required" });
    }

    const org = await organizationService.createOrganization(data);
    res.status(201).json({ success: true, data: org });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create organization", details: error });
  }
};

export const getOrganizationsController = async (_req: Request, res: Response) => {
  try {
    const orgs = await organizationService.getOrganizations();
    res.json(orgs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch organizations", details: error });
  }
};

// Controller
export const getOrganizationsByUserIdController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params; 
    if (!userId) return res.status(400).json({ error: "userId is required" });

    const orgs = await organizationService.getOrganizationsByUserId(userId);

    if (!orgs || orgs.length === 0) {
      return res.status(404).json({ error: "No organizations found for this user" });
    }

    res.json(orgs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch organizations", details: error });
  }
};

export const delOrganizationByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const org = await organizationService.deleteOrganizationById(id);

    const response: DeleteOrganizationResponse = {
      message: "Organization deleted successfully",
      data: org,
    };

    res.json(response);
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Organization not found" });
    }
    res.status(500).json({ error: "Failed to delete organization", details: error });
  }
};
