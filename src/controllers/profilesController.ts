import { Request, Response } from 'express';
import * as ProfileService from '../services/profilesService';
import { createProfileSchema, updateProfileSchema } from '../validations/profilesValidation';

const validateYup = async (schema: any, data: any) => {
  try {
    return await schema.validate(data, { abortEarly: false, stripUnknown: true });
  } catch (err: any) {
    throw err;
  }
};

export const getProfiles = async (req: Request, res: Response) => {
  try {
    const profiles = await ProfileService.getAllProfiles();
    res.json(profiles);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getProfileById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const profile = await ProfileService.getProfileById(id);
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createProfile = async (req: Request, res: Response) => {
  try {
    const validated = await validateYup(createProfileSchema, req.body);
    const profile = await ProfileService.createProfile(validated);
    res.status(201).json(profile);
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ errors: err.errors });
    }
    res.status(500).json({ error: err.message });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validated = await validateYup(updateProfileSchema, req.body);
    const profile = await ProfileService.updateProfile(id, validated);
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ errors: err.errors });
    }
    res.status(500).json({ error: err.message });
  }
};

export const deleteProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await ProfileService.deleteProfile(id);
    res.json({ message: 'Profile deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
