const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide job title'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please provide job description']
    },
    company: {
        type: String,
        required: [true, 'Please provide company name']
    },
    location: {
        type: String,
        required: [true, 'Please provide job location']
    },
    salary: {
        type: String,
        required: [true, 'Please provide salary range']
    },
    jobType: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
        required: [true, 'Please specify job type']
    },
    experience: {
        type: String,
        required: [true, 'Please specify required experience']
    },
    skills: [{
        type: String,
        required: [true, 'Please specify required skills']
    }],
    employer: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Job must belong to an employer']
    },
    status: {
        type: String,
        enum: ['active', 'closed'],
        default: 'active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Job', jobSchema);
