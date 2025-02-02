const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { protect } = require('../middleware/auth');

router
    .route('/')
    .get(jobController.getAllJobs)
    .post(protect, jobController.createJob);

router
    .route('/:id')
    .get(jobController.getJob)
    .patch(protect, jobController.updateJob)
    .delete(protect, jobController.deleteJob);

module.exports = router;
