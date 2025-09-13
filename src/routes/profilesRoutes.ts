import { Router } from "express";
import * as ProfilesController from "../controllers/profilesController";
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Profiles
 *   description: API for managing profiles
 */

/**
 * @swagger
 * /profiles:
 *   get:
 *     summary: Get all profiles
 *     tags: [Profiles]
 *     responses:
 *       200:
 *         description: List of profiles
 */
router.get("/", ProfilesController.getProfiles);

/**
 * @swagger
 * /profiles/{id}:
 *   get:
 *     summary: Get a profile by ID
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Profile object
 *       404:
 *         description: Profile not found
 */
router.get("/:id", ProfilesController.getProfileById);

/**
 * @swagger
 * /profiles:
 *   post:
 *     summary: Create a new profile
 *     tags: [Profiles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - org_id
 *               - profile_name
 *             properties:
 *               org_id:
 *                 type: string
 *                 description: Organization ID
 *                 example: "550e8400-e29b-41d4-a716-446655440000"
 *               profile_name:
 *                 type: string
 *                 description: Profile name
 *                 example: "Central Ladprao"
 *               location:
 *                 type: string
 *                 description: Location
 *                 example: "Bangkok"
 *               phone:
 *                 type: string
 *                 description: Phone number
 *                 example: "02-123-4567"
 *               email:
 *                 type: string
 *                 description: Email
 *                 example: "example@email.com"
 *               address:
 *                 type: string
 *                 description: Full address
 *                 example: "123/45 Ladprao Rd, Bangkok"
 *               lat:
 *                 type: number
 *                 format: float
 *                 description: Latitude
 *                 example: 13.7563
 *               lng:
 *                 type: number
 *                 format: float
 *                 description: Longitude
 *                 example: 100.5018
 *     responses:
 *       201:
 *         description: Profile created successfully
 */
router.post("/", ProfilesController.createProfile);

/**
 * @swagger
 * /profiles/{id}:
 *   put:
 *     summary: Update a profile
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               org_id:
 *                 type: string
 *                 description: Organization ID
 *                 example: "550e8400-e29b-41d4-a716-446655440000"
 *               profile_name:
 *                 type: string
 *                 description: Profile name
 *                 example: "Central Ladprao"
 *               location:
 *                 type: string
 *                 description: Location
 *                 example: "Bangkok"
 *               phone:
 *                 type: string
 *                 description: Phone number
 *                 example: "02-123-4567"
 *               email:
 *                 type: string
 *                 description: Email
 *                 example: "example@email.com"
 *               address:
 *                 type: string
 *                 description: Full address
 *                 example: "123/45 Ladprao Rd, Bangkok"
 *               lat:
 *                 type: number
 *                 format: float
 *                 description: Latitude
 *                 example: 13.7563
 *               lng:
 *                 type: number
 *                 format: float
 *                 description: Longitude
 *                 example: 100.5018
 *     responses:
 *       200:
 *         description: Profile updated successfully
 */
router.put("/:id", ProfilesController.updateProfile);

/**
 * @swagger
 * /profiles/{id}:
 *   delete:
 *     summary: Delete a profile (must provide org_id in body)
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Profile ID to delete
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - org_id
 *             properties:
 *               org_id:
 *                 type: string
 *                 description: Organization ID of the profile
 *                 example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       200:
 *         description: Profile deleted successfully
 *       400:
 *         description: org_id is missing or invalid
 *       404:
 *         description: Profile not found
 */
router.delete("/:id", ProfilesController.deleteProfile);


export default router;
