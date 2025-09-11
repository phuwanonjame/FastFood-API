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
 *                 example: Samart Group
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
 *         description: Created organization
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
 *                     id:
 *                       type: string
 *                       example: "org-456"
 *                     name:
 *                       type: string
 *                       example: Samart Group
 *                     type:
 *                       type: object
 *                     plan:
 *                       type: object
 *                     user_id:
 *                       type: string
 *                       example: "user-123"
 *       400:
 *         description: Missing user_id or invalid input
 *       500:
 *         description: Internal server error
 */
router.post("/", createOrganizationController);

/**
 * @swagger
 * /organizations/{userId}:
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
 *         description: List of organizations
 *       404:
 *         description: Organizations not found
 */
router.get("/:id", getOrganizationsByUserIdController);

/**
 * @swagger
 * /organizations/{id}:
 *   delete:
 *     summary: Delete organization by ID (only for the user)
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
 *     responses:
 *       200:
 *         description: Organization deleted successfully
 *       404:
 *         description: Organization not found
 *       400:
 *         description: org_id and user_id are required
 */
router.delete("/:id", delOrganizationByIdController);


export default router;
