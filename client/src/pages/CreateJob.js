import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateJob = () => {
    const navigate = useNavigate();
    const [jobData, setJobData] = useState({
        company: '',
        position: '',
        jobLocation: '',
        jobType: 'full-time',
        status: 'pending',
    });

    const handleChange = (e) => {
        setJobData({ ...jobData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/job/create-job', jobData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log(localStorage.getItem('token'));


            if (res.data.success) {
                toast.success('Job created successfully!');
                navigate('/jobs');
            } else {
                toast.error(res.data.message || 'Something went wrong');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error creating job');
        }
    };

    return (
        <Layout>
            <div className="container mt-4">
                <h2 className="mb-4 text-center" style={{ color: "wheat" }}>Create New Job</h2>
                <form
                    onSubmit={handleSubmit}
                    className="w-50 mx-auto shadow-lg p-4 rounded"
                    style={{
                        background: "white",
                        borderRadius: "12px",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-5px)";
                        e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.1)";
                    }}
                >
                    <div className="mb-3">
                        <label style={{ fontWeight: "600", color: "#1e293b" }}>Company</label>
                        <input
                            type="text"
                            className="form-control"
                            name="company"
                            value={jobData.company}
                            onChange={handleChange}
                            required
                            style={{ borderRadius: "8px", padding: "10px", border: "1px solid #ccc" }}
                        />
                    </div>

                    <div className="mb-3">
                        <label style={{ fontWeight: "600", color: "#1e293b" }}>Position</label>
                        <input
                            type="text"
                            className="form-control"
                            name="position"
                            value={jobData.position}
                            onChange={handleChange}
                            required
                            style={{ borderRadius: "8px", padding: "10px", border: "1px solid #ccc" }}
                        />
                    </div>

                    <div className="mb-3">
                        <label style={{ fontWeight: "600", color: "#1e293b" }}>Location</label>
                        <input
                            type="text"
                            className="form-control"
                            name="jobLocation"
                            value={jobData.jobLocation}
                            onChange={handleChange}
                            required
                            style={{ borderRadius: "8px", padding: "10px", border: "1px solid #ccc" }}
                        />
                    </div>

                    <div className="mb-3">
                        <label style={{ fontWeight: "600", color: "#1e293b" }}>Job Type</label>
                        <select
                            className="form-select"
                            name="jobType"
                            value={jobData.jobType}
                            onChange={handleChange}
                            style={{ borderRadius: "8px", padding: "10px" }}
                        >
                            <option value="full-time">Full Time</option>
                            <option value="part-time">Part Time</option>
                            <option value="remote">Remote</option>
                            <option value="internship">Internship</option>
                            <option value="contract">Contract</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label style={{ fontWeight: "600", color: "#1e293b" }}>Status</label>
                        <select
                            className="form-select"
                            name="status"
                            value={jobData.status}
                            onChange={handleChange}
                            style={{ borderRadius: "8px", padding: "10px" }}
                        >
                            <option value="pending">Pending</option>
                            <option value="interview">Interview</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="btn w-100"
                        style={{
                            backgroundColor: "#1e293b",
                            color: "white",
                            padding: "10px",
                            fontWeight: "500",
                            borderRadius: "8px",
                            border: "none",
                            transition: "background-color 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#2e2323";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "#1e293b";
                        }}
                    >
                        Create Job
                    </button>
                </form>

            </div>
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




        </Layout>
    );
};

export default CreateJob;
