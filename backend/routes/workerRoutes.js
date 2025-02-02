const express = require('express');
const router = express.Router();
const Worker = require('../models/Worker');
const auth = require('../middleware/auth').protect;
const upload = require('../middleware/upload');

// Create a new worker profile
router.post('/', auth, upload.single('profilePhoto'), async (req, res) => {
    try {
        const workerData = {
            ...req.body,
            userId: req.user._id,
            profilePhotoUrl: req.file.path // This will be handled by the upload middleware
        };

        const worker = new Worker(workerData);
        await worker.save();

        res.status(201).json({
            success: true,
            data: worker
        });
    } catch (error) {
        console.error('Error creating worker profile:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// Get all workers (with filters)
router.get('/', async (req, res) => {
    try {
        const { service, city, district } = req.query;
        const filter = {};

        if (service) filter.service = service;
        if (city) filter['address.city'] = new RegExp(city, 'i');
        if (district) filter['address.district'] = new RegExp(district, 'i');

        const workers = await Worker.find(filter)
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: workers
        });
    } catch (error) {
        console.error('Error fetching workers:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching workers'
        });
    }
});

// Get worker by ID
router.get('/:id', async (req, res) => {
    try {
        const worker = await Worker.findById(req.params.id);
        if (!worker) {
            return res.status(404).json({
                success: false,
                message: 'Worker not found'
            });
        }

        res.json({
            success: true,
            data: worker
        });
    } catch (error) {
        console.error('Error fetching worker:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching worker'
        });
    }
});

// Update worker profile
router.put('/:id', auth, upload.single('profilePhoto'), async (req, res) => {
    try {
        const worker = await Worker.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!worker) {
            return res.status(404).json({
                success: false,
                message: 'Worker not found or unauthorized'
            });
        }

        const updates = { ...req.body };
        if (req.file) {
            updates.profilePhotoUrl = req.file.path;
        }

        Object.assign(worker, updates);
        await worker.save();

        res.json({
            success: true,
            data: worker
        });
    } catch (error) {
        console.error('Error updating worker profile:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// Delete worker profile
router.delete('/:id', auth, async (req, res) => {
    try {
        const worker = await Worker.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!worker) {
            return res.status(404).json({
                success: false,
                message: 'Worker not found or unauthorized'
            });
        }

        res.json({
            success: true,
            message: 'Worker profile deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting worker profile:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting worker profile'
        });
    }
});

module.exports = router;
