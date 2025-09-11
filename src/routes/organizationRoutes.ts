import { Router } from "express";
import {
  createOrganizationController,
  getOrganizationsController,
  getOrganizationsByUserIdController,
  delOrganizationByIdController,
} from "../controllers/organizationController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Organizations
 *   description: API for managing organizations
 */

/**
 * @swagger
 * /organizations:
 *   get:
 *     summary: Get all organizations
 *     tags: [Organizations]
 *     responses:
 *       200:
 *         description: List of organizations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   org_id:
 *                     type: string
 *                     example: "org-001"
 *                   name:
 *                     type: string
 *                     example: "Samart Group"
 *                   type_id:
 *                     type: integer
 *                     example: 1
 *                   plan_id:
 *                     type: integer
 *                     example: 1
 *                   user_id:
 *                     type: string
 *                     example: "user-123"
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-09-11T10:00:00Z"
 */
router.get("/", getOrganizationsController);

/**
 * @swagger
 * /organizations:
 *   post:
 *     summary: Create a new organization
 *     tags: [Organizations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Samart Group"
 *               type_id:
 *                 type: integer
 *                 example: 1
 *               plan_id:
 *                 type: integer
 *                 example: 1
 *               user_id:
 *                 type: string
 *                 example: "user-123"
 *             required:
 *               - name
 *               - type_id
 *               - plan_id
 *               - user_id
 *     responses:
 *       201:
 *         description: Organization created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     org_id:
 *                       type: string
 *                       example: "org-456"
 *                     name:
 *                       type: string
 *                       example: "Samart Group"
 *                     type_id:
 *                       type: integer
 *                       example: 1
 *                     plan_id:
 *                       type: integer
 *                       example: 1
 *                     user_id:
 *                       type: string
 *                       example: "user-123"
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-09-11T10:00:00Z"
 *       400:
 *         description: Missing required fields or invalid input
 *       500:
 *         description: Internal server error
 */
router.post("/", createOrganizationController);

/**
 * @swagger
 * /organizations/user/{userId}:
 *   get:
 *     summary: Get organizations by User ID
 *     tags: [Organizations]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of organizations for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   org_id:
 *                     type: string
 *                     example: "org-001"
 *                   name:
 *                     type: string
 *                     example: "Samart Group"
 *                   type_id:
 *                     type: integer
 *                     example: 1
 *                   plan_id:
 *                     type: integer
 *                     example: 1
 *                   user_id:
 *                     type: string
 *                     example: "user-123"
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-09-11T10:00:00Z"
 *       404:
 *         description: Organizations not found
 */
router.get("/user/:userId", getOrganizationsByUserIdController);

/**
 * @swagger
 * /organizations/{id}:
 *   delete:
 *     summary: Delete organization by ID (only by the owner)
 *     tags: [Organizations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Organization ID
 *     requestBody:
 *       description: User ID performing the deletion
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user deleting the organization
 *                 example: "user-123"
 *     responses:
 *       200:
 *         description: Organization deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Organization deleted successfully"
 *                 data:
 *                   $ref: '#/components/schemas/OrganizationResponse'
 *       400:
 *         description: org_id and user_id are required
 *       404:
 *         description: Organization not found
 */
router.delete("/:id", delOrganizationByIdController);

export default router;
