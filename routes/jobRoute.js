const express = require('express');
const userAuth = require('../middelwares/authMiddelwares');
const { createJobController, getAllJobsController, updateJobController, deleteJobController, jobStateFilterController, getAllPublicJobsController, applyJobController } = require('../controllers/jobController');


const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       required:
 *         - company
 *         - position
 *         - jobLocation
 *         - createdBy
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the job
 *         company:
 *           type: string
 *           description: The company name offering the job
 *         position:
 *           type: string
 *           description: The job position title
 *         status:
 *           type: string
 *           enum: [pending, rejected, interview]
 *           default: pending
 *           description: The current status of the job application
 *         jobType:
 *           type: string
 *           enum: [full-time, part-time, remote, internship, contract]
 *           default: full-time
 *           description: Type of the job
 *         jobLocation:
 *           type: string
 *           description: The location of the job
 *         createdBy:
 *           type: string
 *           description: The user ID who created this job post
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the job was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the job was last updated
 *       example:
 *         id: 64a8d56fc5b3b84f5e05d4a2
 *         company: Microsoft
 *         position: Backend Developer
 *         status: pending
 *         jobType: full-time
 *         jobLocation: Noida, Uttar Pradesh
 *         createdBy: 64a8d56fc5b3b84f5e05d1a1
 *         createdAt: 2025-07-08T14:23:45.000Z
 *         updatedAt: 2025-07-08T15:10:12.000Z
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */


/**
 * @swagger
 * /api/v1/job/create-job:
 *   post:
 *     summary: Create a new job
 *     tags: [Job]
 *     security:
 *       - bearerAuth: []  # Token based authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       201:
 *         description: Job created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       400:
 *         description: Bad request - missing or invalid data
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       500:
 *         description: Internal server error
 */

// create job route
router.post('/create-job', userAuth, createJobController);
// get all jobs route

/**
 * @swagger
 * /api/v1/job/get-job:
 *   get:
 *     summary: Get all jobs for the authenticated user
 *     tags: [Job]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of jobs fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jobs:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Job'
 *                 totalJobs:
 *                   type: integer
 *                   example: 5
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       500:
 *         description: Internal server error
 */

router.get('/get-job', userAuth, getAllJobsController);

/**
 * @swagger
 * /api/v1/job/update-job/{id}:
 *   patch:
 *     summary: Update a job by ID
 *     tags: [Job]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The job ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       200:
 *         description: Job updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       400:
 *         description: Bad request - invalid input
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       404:
 *         description: Job not found
 *       500:
 *         description: Internal server error
 */

// get all job 
router.get('/public-jobs', getAllPublicJobsController)

// update job route
router.patch("/update-job/:id", userAuth, updateJobController)

/**
 * @swagger
 * /api/v1/job/delete-job/{id}:
 *   delete:
 *     summary: Delete a job by ID
 *     tags: [Job]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The job ID to delete
 *     responses:
 *       200:
 *         description: Job deleted successfully
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       404:
 *         description: Job not found
 *       500:
 *         description: Internal server error
 */


// delete job route
router.delete('/delete-job/:id', userAuth, deleteJobController)

/**
 * @swagger
 * /api/v1/job/job-state:
 *   get:
 *     summary: Get job statistics or filter jobs by state
 *     tags: [Job]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Job state statistics fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalJobs:
 *                   type: integer
 *                   example: 10
 *                 pending:
 *                   type: integer
 *                   example: 5
 *                 interview:
 *                   type: integer
 *                   example: 3
 *                 rejected:
 *                   type: integer
 *                   example: 2
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       500:
 *         description: Internal server error
 */


// job state filter route
router.get('/job-state', userAuth, jobStateFilterController)

// apply 
router.post('/apply/:jobId', userAuth, applyJobController)


module.exports = router;
