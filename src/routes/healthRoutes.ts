import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * tags:
 *   name: Health
 *   description: Health check API
 */

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Check API & database status
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API and database are connected
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 database:
 *                   type: string
 *                   example: connected
 *                 timestamp:
 *                   type: string
 *                   example: 2025-09-06T08:00:00.000Z
 *       500:
 *         description: API or database error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 database:
 *                   type: string
 *                   example: disconnected
 *                 timestamp:
 *                   type: string
 *                   example: 2025-09-06T08:00:00.000Z
 *                 error:
 *                   type: string
 */
router.get("/", async (_req: Request, res: Response) => {
  try {
    // ตรวจสอบ database connection
    await prisma.$queryRaw`SELECT 1`;

    const timestampTH = new Date().toLocaleString("th-TH", {
      timeZone: "Asia/Bangkok",
      hour12: false,
    });

    res.json({
      status: "ok",
      database: "connected",
      timestamp: timestampTH,
    });
  } catch (err) {
    const timestampTH = new Date().toLocaleString("th-TH", {
      timeZone: "Asia/Bangkok",
      hour12: false,
    });

    res.status(500).json({
      status: "error",
      database: "disconnected",
      timestamp: timestampTH,
      error: err instanceof Error ? err.message : err,
    });
  }
});

export default router;
