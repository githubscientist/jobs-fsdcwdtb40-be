const express = require('express');
const { getAllJobs, getJobById, createJob, updateJob, deleteJob, getRecruiterJobs, getJobApplications } = require('../controllers/jobController');
const { isAuthenticated, allowRoles } = require('../middlewares/auth');

const jobRouter = express.Router();

// public routes
jobRouter.get('/', getAllJobs);
jobRouter.get('/:id', getJobById);

// protected routes
jobRouter.post('/', isAuthenticated, allowRoles(['recruiter']), createJob);
jobRouter.put('/:id', isAuthenticated, allowRoles(['recruiter']), updateJob);
jobRouter.delete('/:id', isAuthenticated, allowRoles(['recruiter']), deleteJob);
jobRouter.get('/recruiter/jobs', isAuthenticated, allowRoles(['recruiter']), getRecruiterJobs);
jobRouter.get('/recruiter/jobs/:id/applications', isAuthenticated, allowRoles(['recruiter']), getJobApplications);

module.exports = jobRouter;