const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    service: {
        type: String,
        required: true,
        enum: ['Plumber', 'Electrician', 'Carpenter', 'Painter', 'House Cleaner', 'Gardener', 'AC Technician', 'Cook', 'Security Guard']
    },
    experience: {
        type: Number,
        required: true,
        min: 0
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other']
    },
    address: {
        street: {
            type: String,
            required: true,
            trim: true
        },
        city: {
            type: String,
            required: true,
            trim: true
        },
        district: {
            type: String,
            required: true,
            trim: true
        }
    },
    profilePhotoUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

// Add indexes for better search performance
workerSchema.index({ service: 1 });
workerSchema.index({ 'address.city': 1 });
workerSchema.index({ 'address.district': 1 });

const Worker = mongoose.model('Worker', workerSchema);

module.exports = Worker;
