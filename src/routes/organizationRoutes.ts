import { Router } from "express";
import {
  createOrganizationController,
  getOrganizationsController,
  getOrganizationByIdController,
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
 * /organizations/{id}:
 *   get:
 *     summary: Get organization by ID
 *     tags: [Organizations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Organization ID
 *     responses:
 *       200:
 *         description: Organization data
 *       404:
 *         description: Organization not found
 */
router.get("/:id", getOrganizationByIdController);

/**
 * @swagger
 * /organizations/{id}:
 *   delete:
 *     summary: Delete organization by ID
 *     tags: [Organizations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Organization ID
 *     responses:
 *       200:
 *         description: Organization deleted successfully
 *       404:
 *         description: Organization not found
 */
router.delete("/:id", delOrganizationByIdController);

export default router;
