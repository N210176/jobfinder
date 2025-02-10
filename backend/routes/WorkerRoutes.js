// const express = require('express');
// const router = express.Router();
// const Worker = require('../models/Worker');
// const auth = require('../middleware/auth').protect;
// const upload = require('../middleware/upload');

// // Create a new worker profile
// router.post('/', auth, upload.single('profilePhoto'), async (req, res) => {
//     try {
//         // Check if file was uploaded successfully
//         if (!req.file) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Profile photo is required'
//             });
//         }

//         // Create worker data with the file path
//         const workerData = {
//             ...req.body,
//             userId: req.user._id,
//             profilePhotoUrl: req.file.filename // Store only the filename
//         };

//         const worker = new Worker(workerData);
//         await worker.save();

//         res.status(201).json({
//             success: true,
//             data: worker
//         });
//     } catch (error) {
//         // Remove uploaded file if worker creation fails
//         if (req.file) {
//             const fs = require('fs');
//             fs.unlink(req.file.path, (unlinkError) => {
//                 if (unlinkError) {
//                     console.error('Error removing uploaded file:', unlinkError);
//                 }
//             });
//         }

//         // If it's a validation error from Mongoose
//         if (error.name === 'ValidationError') {
//             return res.status(400).json({
//                 success: false,
//                 message: Object.values(error.errors).map(err => err.message).join(', ')
//             });
//         }
        
//         // For other errors
//         res.status(500).json({
//             success: false,
//             message: 'Server error while creating worker profile. Please try again.',
//             error: error.message
//         });
//     }
// });

// // Get all workers (with filters)
// router.get('/', async (req, res) => {
//     try {
//         const { service, city, district } = req.query;
//         const filter = {};

//         if (service) filter.service = service;
//         if (city) filter['address.city'] = new RegExp(city, 'i');
//         if (district) filter['address.district'] = new RegExp(district, 'i');

//         const workers = await Worker.find(filter)
//             .sort({ createdAt: -1 });

//         res.json({
//             success: true,
//             data: workers
//         });
//     } catch (error) {
//         console.error('Error fetching workers:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error fetching workers'
//         });
//     }
// });

// // Get worker by ID
// router.get('/:id', async (req, res) => {
//     try {
//         const worker = await Worker.findById(req.params.id);
//         if (!worker) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Worker not found'
//             });
//         }

//         res.json({
//             success: true,
//             data: worker
//         });
//     } catch (error) {
//         console.error('Error fetching worker:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error fetching worker'
//         });
//     }
// });

// // Update worker profile
// router.put('/:id', auth, upload.single('profilePhoto'), async (req, res) => {
//     try {
//         const worker = await Worker.findOne({
//             _id: req.params.id,
//             userId: req.user._id
//         });

//         if (!worker) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Worker not found or unauthorized'
//             });
//         }

//         const updates = { ...req.body };
//         if (req.file) {
//             updates.profilePhotoUrl = req.file.path;
//         }

//         Object.assign(worker, updates);
//         await worker.save();

//         res.json({
//             success: true,
//             data: worker
//         });
//     } catch (error) {
//         console.error('Error updating worker profile:', error);
//         // Remove uploaded file if worker update fails
//         if (req.file) {
//             const fs = require('fs');
//             fs.unlink(req.file.path, (unlinkError) => {
//                 if (unlinkError) console.error('Error removing uploaded file:', unlinkError);
//             });
//         }
        
//         // Send appropriate error response
//         res.status(500).json({
//             success: false,
//             message: 'Server error while updating worker profile. Please try again.'
//         });
//     }
// });

// // Delete worker profile
// router.delete('/:id', auth, async (req, res) => {
//     try {
//         const worker = await Worker.findOneAndDelete({
//             _id: req.params.id,
//             userId: req.user._id
//         });

//         if (!worker) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Worker not found or unauthorized'
//             });
//         }

//         res.json({
//             success: true,
//             message: 'Worker profile deleted successfully'
//         });
//     } catch (error) {
//         console.error('Error deleting worker profile:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error deleting worker profile'
//         });
//     }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const Worker = require('../models/Worker');
const auth = require('../middleware/auth').protect;
const cloudinary = require('../config/cloudinary'); // Import Cloudinary
const multer = require('multer'); // Only used to parse form-data
const upload = multer({ storage: multer.memoryStorage() }); // No file storage

// Create a new worker profile
router.post('/', auth, upload.single('profilePhoto'), async (req, res) => {
    try {
        // Check if file exists
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Profile photo is required'
            });
        }

        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(`data:image/png;base64,${req.file.buffer.toString('base64')}`, {
            folder: "worker_profiles",
            resource_type: "image"
        });
       //console.log("secure url",result.secure_url);
        // Create worker data with Cloudinary image URL
        const workerData = {
            ...req.body,
            userId: req.user._id,
            profilePhotoUrl: result.secure_url // Store Cloudinary URL
        };

        const worker = new Worker(workerData);
        await worker.save();

        res.status(201).json({
            success: true,
            data: worker
        });
    } catch (error) {
        console.error("Error uploading worker profile:", error);
        res.status(500).json({
            success: false,
            message: 'Server error while creating worker profile. Please try again.',
            error: error.message
        });
    }
});

// Update worker profile (Including Profile Photo)
router.put('/:id', auth, upload.single('profilePhoto'), async (req, res) => {
    try {
        const worker = await Worker.findOne({ _id: req.params.id, userId: req.user._id });

        if (!worker) {
            return res.status(404).json({
                success: false,
                message: 'Worker not found or unauthorized'
            });
        }

        const updates = { ...req.body };

        // If a new profile photo is uploaded
        if (req.file) {
            const result = await cloudinary.uploader.upload(`data:image/png;base64,${req.file.buffer.toString('base64')}`, {
                folder: "worker_profiles",
                resource_type: "image"
            });

            updates.profilePhotoUrl = result.secure_url;
        }

        Object.assign(worker, updates);
        await worker.save();

        res.json({
            success: true,
            data: worker
        });
    } catch (error) {
        console.error("Error updating worker profile:", error);
        res.status(500).json({
            success: false,
            message: 'Server error while updating worker profile. Please try again.'
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
          //console.log("workers",workers);
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
        // Remove uploaded file if worker update fails
        if (req.file) {
            const fs = require('fs');
            fs.unlink(req.file.path, (unlinkError) => {
                if (unlinkError) console.error('Error removing uploaded file:', unlinkError);
            });
        }
        
        // Send appropriate error response
        res.status(500).json({
            success: false,
            message: 'Server error while updating worker profile. Please try again.'
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
