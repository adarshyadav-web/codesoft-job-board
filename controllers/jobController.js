const mongoose = require('mongoose');
const jobModel = require('../models/jobModels');

const createJobController = async (req, res, next) => {
    const { company, position } = req.body;

    if (!company || !position) {
        return next(new Error('All fields are required'));
    }
    req.body.createdBy = req.user._id; // Attach the user ID from the authenticated user

    const jobs = await jobModel.create(req.body);
    res.status(201).json({
        success: true,
        message: 'Job created successfully',
        jobs
    });
}

// Exporting the controller function
const getAllJobsController = async (req, res, next) => {

    const { status, jobType, search, sort } = req.query;

    // condition for searching filtered jobs
    const queryObject = {
        createdBy: req.user._id // Filter jobs by the user who created them
    };
    if (status && status !== 'all') {
        queryObject.status = status; // Add status filter if provided
    }

    if (jobType && jobType !== 'all') {
        queryObject.jobType = { $regex: new RegExp(`^${jobType}$`, 'i') };
    }

    if (search) {
        queryObject.position = { $regex: search, $options: 'i' }; // Add search filter for position
    }

    let queryResult = jobModel.find(queryObject); // Create a query based on the conditions

    /// shorting the jobs
    if (sort === 'latest') {
        queryResult = queryResult.sort('-createdAt');
    } else if (sort === 'oldest') {
        queryResult = queryResult.sort('createdAt');
    } else if (sort === 'a-z') {
        queryResult = queryResult.sort('position');
    } else if (sort === 'z-a') {
        queryResult = queryResult.sort('-position');
    }

    // pagination
    const page = Number(req.query.page) || 1; // Get the current page number from query, default to 1
    const limit = Number(req.query.limit) || 10; // Get the limit of jobs per page from query, default to 10
    const skip = (page - 1) * limit; // Calculate the number of jobs to skip based on the current page and limit
    queryResult = queryResult.skip(skip).limit(limit); // Apply pagination to the query
    console.log("Page:", page, "Limit:", limit, "Skip:", skip);


    // jobcount
    // Pehle queryObject se count nikal
    const totalJobs = await jobModel.countDocuments(queryObject);
    // Count the total number of jobs matching the query
    const numOfPages = Math.ceil(totalJobs / limit); // Calculate the total number of pages based on the total jobs and limit
    const jobs = await queryResult; // Execute the query to get the jobs

    // const job = await jobModel.find({ createdBy: req.user.userId })

    res.status(200).json({
        success: true,
        message: 'Jobs fetched successfully',
        totalJobs: totalJobs,
        jobs,
        numOfPages,


    });
}

// update job controller

const updateJobController = async (req, res, next) => {
    const { id } = req.params;
    const { company, position } = req.body;

    // validate the request body
    if (!company || !position) {
        return next(new Error('please provide all fields'));
    }
    // find the job by id
    const job = await jobModel.findOne({ _id: id })
    // validate if the job exists
    if (!job) {
        return next(new Error('Job not found'));
    }
    if (req.user._id !== job.createdBy.toString()) {
        return next(new Error('You are not authorized to update this job'));
    }
    // update the job
    const updatedJob = await jobModel.findByIdAndUpdate({ _id: id }, req.body, {
        new: true, // return the updated document
        runValidators: true // run the validators on the updated document
    });
    res.status(200).json({
        success: true,
        message: 'Job updated successfully',
        job: updatedJob
    });
}

// delete job controller
const deleteJobController = async (req, res, next) => {
    const { id } = req.params;

    // find the job by id
    const job = await jobModel.findOne({ _id: id });
    // validate if the job exists
    if (!job) {
        return next(new Error('Job not found'));
    }
    if (req.user._id !== job.createdBy.toString()) {
        return next(new Error('You are not authorized to delete this job'));
    }
    // delete the job
    const deletedJob = await jobModel.findByIdAndDelete({ _id: id });
    res.status(200).json({
        success: true,
        message: 'Job deleted successfully',
        job: deletedJob
    });
}

// job state filter controller
const jobStateFilterController = async (req, res, next) => {

    const state = await jobModel.aggregate([
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.userId)
            }
        },
        {
            $group: {
                _id: '$status',
                count: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                status: '$_id',
                count: 1
            }
        }

    ]);
    const defaultState = {
        pending: state.pending || 0,
        rejected: state.rejected || 0,
        interview: state.interview || 0

    }

    res.status(200).json({
        success: true,
        message: 'Job state fetched successfully',
        totalJobs: state.length,
        defaultState
    });
}
// public job list 

const getAllPublicJobsController = async (req, res, next) => {
    try {
        const { jobType, search, sort, page = 1, limit = 4 } = req.query;

        const queryObject = {};

        if (jobType && jobType !== 'all') {
            queryObject.jobType = { $regex: new RegExp(`^${jobType}$`, 'i') };
        }

        if (search) {
            queryObject.position = { $regex: search, $options: 'i' };
        }

        let queryResult = jobModel
            .find(queryObject)
            .populate("createdBy", "name email");

        // Sort logic
        if (sort === 'latest') {
            queryResult = queryResult.sort('-createdAt');
        } else if (sort === 'oldest') {
            queryResult = queryResult.sort('createdAt');
        } else if (sort === 'a-z') {
            queryResult = queryResult.sort('position');
        } else if (sort === 'z-a') {
            queryResult = queryResult.sort('-position');
        }

        // Pagination logic
        const pageNumber = Number(page) || 1;
        const limitNumber = Number(limit) || 6;
        const skip = (pageNumber - 1) * limitNumber;

        queryResult = queryResult.skip(skip).limit(limitNumber);

        const totalJobs = await jobModel.countDocuments(queryObject);
        const numOfPages = Math.ceil(totalJobs / limitNumber);

        const jobs = await queryResult;

        res.status(200).json({
            success: true,
            jobs,
            totalJobs,
            numOfPages,
        });
    } catch (error) {
        next(error);
    }
};

// apply

const applyJobController = async (req, res) => {
    try {
        const { jobId } = req.params;
        const applicantId = req.user.userId;

        // check if already applied
        const alreadyApplied = await applicationModel.findOne({
            job: jobId,
            applicant: applicantId,
        });

        if (alreadyApplied) {
            return res.status(400).json({ success: false, message: 'Already applied to this job' });
        }

        // create application
        const application = new applicationModel({
            job: jobId,
            applicant: applicantId,
        });

        await application.save();

        res.status(201).json({
            success: true,
            message: 'Applied to job successfully',
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error applying to job' });
    }
};



module.exports = {
    createJobController,
    getAllJobsController,
    updateJobController,
    deleteJobController,
    jobStateFilterController,
    getAllPublicJobsController,
    applyJobController,
};


