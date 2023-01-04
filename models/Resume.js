const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    experience: [{
        company: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: Date,
        description: String
    }],
    education: [{
        school: {
            type: String,
            required: true
        },
        degree: {
            type: String,
            required: true
        },
        fieldOfStudy: {
            type: String,
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: Date
    }],
    skills: [{
        type: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Resume', resumeSchema);
