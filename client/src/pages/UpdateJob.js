import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateJob = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [jobData, setJobData] = useState({
        company: '',
        position: '',
        jobLocation: '',
        jobType: 'full-time',
        status: 'pending',
    });

    // Fetch job details
    const getJobDetails = useCallback(async () => {
        try {
            const res = await axios.get(`/api/v1/job/get-job`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            const job = res.data.jobs.find((j) => j._id === id);
            if (job) setJobData(job);
            else toast.error('Job not found');
        } catch (error) {
            toast.error('Failed to load job details');
        }
    }, [id]);

    useEffect(() => {
        getJobDetails();
    }, [getJobDetails]);

    // Handle form input changes
    const handleChange = (e) => {
        setJobData({ ...jobData, [e.target.name]: e.target.value });
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.patch(
                `/api/v1/job/update-job/${id}`,
                jobData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            if (res.data.success) {
                toast.success('Job updated successfully!');
                navigate('/jobs');
            } else {
                toast.error(res.data.message || 'Something went wrong');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error updating job');
        }
    };

    return (
        <Layout>
            <div className="container mt-4">
                <h2 className="mb-4 text-center">Update Job</h2>
                <form onSubmit={handleSubmit} className="w-50 mx-auto">
                    <div className="mb-3">
                        <label>Company</label>
                        <input
                            type="text"
                            className="form-control"
                            name="company"
                            value={jobData.company}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>Position</label>
                        <input
                            type="text"
                            className="form-control"
                            name="position"
                            value={jobData.position}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>Location</label>
                        <input
                            type="text"
                            className="form-control"
                            name="jobLocation"
                            value={jobData.jobLocation}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>Job Type</label>
                        <select
                            className="form-select"
                            name="jobType"
                            value={jobData.jobType}
                            onChange={handleChange}
                        >
                            <option value="full-time">Full Time</option>
                            <option value="part-time">Part Time</option>
                            <option value="remote">Remote</option>
                            <option value="internship">Internship</option>
                            <option value="contract">Contract</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label>Status</label>
                        <select
                            className="form-select"
                            name="status"
                            value={jobData.status}
                            onChange={handleChange}
                        >
                            <option value="pending">Pending</option>
                            <option value="interview">Interview</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Update Job
                    </button>
                </form>
                <div className="contact-section">
                    <h3>Contact Us</h3>
                    <div className="contact-item">
                        <i className="ri-map-pin-line"></i> 123 Varanasi, Uttar Pradesh, India
                    </div>
                    <div className="contact-item">
                        <i className="ri-mail-line"></i> info@jobboard.com
                    </div>
                    <div className="contact-item">
                        <i className="ri-phone-line"></i> +91 7237900456
                    </div>
                </div>

                {/* Additional Info */}
                <div className="contact-extra">
                    <div><i className="ri-map-pin-line"></i>123 Varanasi, Uttar Pradesh, India </div>
                    <div><i className="ri-mail-line"></i> info@jobboard.com</div>
                </div>
            </div>
        </Layout>
    );
};

export default UpdateJob;
