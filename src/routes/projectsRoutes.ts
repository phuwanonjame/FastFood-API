import { Router } from "express";
import * as ProjectsController from "../controllers/projectsController";
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: API for managing projects
 */

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: List of projects
 */
router.get("/", ProjectsController.getProjects);

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Get a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: projects_id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project object
 *       404:
 *         description: Project not found
 */
router.get("/:id", ProjectsController.getProjectById);


/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - org_id
 *               - projects_name
 *               - user_id
 *             properties:
 *               org_id:
 *                 type: string
 *                 description: Organization ID
 *                 example: "550e8400-e29b-41d4-a716-446655440000"
 *               user_id:
 *                 type: string
 *                 description: User ID from auth.users
 *                 example: "a1b2c3d4-e5f6-7890-abcd-1234567890ef"
 *               projects_name:
 *                 type: string
 *                 description: Project name
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
 *               pin:
 *                 type: string
 *                 description: PIN for login lock
 *                 example: "1234"
 *     responses:
 *       201:
 *         description: Project created successfully
 */
router.post("/", ProjectsController.createProject);

router.put("/:id", ProjectsController.updateProject);
/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Update a project
 *     tags: [Projects]
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
 *             required:
 *               - org_id
 *               - projects_name
 *               - user_id
 *             properties:
 *               org_id:
 *                 type: string
 *                 example: "550e8400-e29b-41d4-a716-446655440000"
 *               user_id:
 *                 type: string
 *                 example: "a1b2c3d4-e5f6-7890-abcd-1234567890ef"
 *               projects_name:
 *                 type: string
 *                 example: "Central Ladprao"
 *               location:
 *                 type: string
 *                 example: "Bangkok"
 *               phone:
 *                 type: string
 *                 example: "02-123-4567"
 *               email:
 *                 type: string
 *                 example: "example@email.com"
 *               address:
 *                 type: string
 *                 example: "123/45 Ladprao Rd, Bangkok"
 *               lat:
 *                 type: number
 *                 format: float
 *                 example: 13.7563
 *               lng:
 *                 type: number
 *                 format: float
 *                 example: 100.5018
 *               pin:
 *                 type: string
 *                 example: "1234"
 *     responses:
 *       200:
 *         description: Project updated successfully
 */

/**
 * DELETE /projects/{id}
 * Delete project (must provide org_id and user_id)
 */
router.delete("/:id", ProjectsController.deleteProject);
/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Delete a project (must provide org_id and user_id in body)
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID to delete
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - org_id
 *               - user_id
 *             properties:
 *               org_id:
 *                 type: string
 *                 example: "550e8400-e29b-41d4-a716-446655440000"
 *               user_id:
 *                 type: string
 *                 example: "a1b2c3d4-e5f6-7890-abcd-1234567890ef"
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       400:
 *         description: org_id or user_id is missing or invalid
 *       404:
 *         description: Project not found
 */

export default router;
