const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Company name is required']
    },
    position: {
        type: String,
        required: [true, 'Job position is required']
    },
    status: {
        type: String,
        enum: ['pending', 'rejected', 'interview',],
        default: 'pending'
    },
    jobType: {
        type: String,
        enum: ['full-time', 'part-time', 'remote', 'internship', 'contract'],
        default: 'full-time'
    },
    jobLocation: {
        type: String,
        default: 'uttar pradesh',
        required: [true, 'Job location is required']
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },

}, { timestamps: true } // Automatically manage createdAt and updatedAt fields

);
module.exports = mongoose.model('Job', jobSchema);