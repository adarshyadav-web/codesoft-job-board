import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/ExploreJobs.css';
import { Link } from "react-router-dom";


const ExploreJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState('');
    const [jobType, setJobType] = useState('all');
    const [sort, setSort] = useState('latest');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleApply = () => {
        toast.success('Applied Successfully!');
    };

    const getAllJobs = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`/api/v1/job/public-jobs`, {
                params: {
                    search,
                    jobType,
                    sort,
                    page,
                    limit: 6
                }
            });

            if (res.data.success) {
                setJobs(res.data.jobs);
                setTotalPages(res.data.numOfPages);
            }
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        getAllJobs();
    }, [search, jobType, sort, page]);

    return (
        <div
            className="container-fluid min-vh-100 d-flex flex-column"
            style={{
                background: 'linear-gradient(to bottom right, #2e2323, #1e293b)',
                color: 'white',
                paddingBottom: '40px'
            }}
        >
            <div className="container mt-4">
                <h2 className="mb-4 text-center">Explore All Jobs</h2>

                <div className="text-start mb-3">
                    <button
                        className="btn btn-outline-light shadow-sm"
                        onClick={() => navigate('/')}
                        style={{
                            fontWeight: '500',
                            fontSize: '16px',
                            borderRadius: '8px',
                        }}
                    >
                        ⬅ Back to Home
                    </button>
                </div>

                {/* Filters */}
                <div className="row mb-4">
                    <div className="col-md-4">
                        <input
                            type="text"
                            placeholder="Search by job name"
                            className="form-control"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <select
                            className="form-select"
                            value={jobType}
                            onChange={(e) => setJobType(e.target.value)}
                        >
                            <option value="all">All Types</option>
                            <option value="full-time">Full-Time</option>
                            <option value="part-time">Part-Time</option>
                            <option value="internship">Internship</option>
                            <option value="contract">Contract</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <select
                            className="form-select"
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                        >
                            <option value="latest">Latest</option>
                            <option value="oldest">Oldest</option>
                            <option value="a-z">A-Z</option>
                            <option value="z-a">Z-A</option>
                        </select>
                    </div>
                </div>

                {/* Loader */}
                {loading ? (
                    <div className="text-center">
                        <div className="spinner-border text-light" role="status" style={{ marginTop: '20%' }}></div>
                    </div>
                ) : jobs.length === 0 ? (
                    <p className="text-center">No jobs found.</p>
                ) : (
                    <div className="row">
                        {jobs.map((job) => (
                            <div className="col-md-4 mb-4" key={job._id}>
                                <div className="card job-card h-100 shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title">{job.position}</h5>
                                        <p className="card-text">
                                            <strong>Company:</strong> {job.company} <br />
                                            <strong>Location:</strong> {job.jobLocation} <br />
                                            <strong>Type:</strong> {job.jobType} <br />
                                            <strong>Posted by:</strong> {job.createdBy?.email || 'Unknown'}
                                        </p>
                                        <button className="btn btn-success" onClick={handleApply}>
                                            Apply
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {!loading && totalPages > 1 && (
                    <div className="d-flex flex-column align-items-center mt-4 mb-5">
                        <nav>
                            <ul className="pagination">
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <li
                                        key={index + 1}
                                        className={`page-item ${page === index + 1 ? 'active' : ''}`}
                                        onClick={() => setPage(index + 1)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <span className="page-link">{index + 1}</span>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        <div className="mt-2">
                            <button
                                className="btn btn-outline-light me-2"
                                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                disabled={page === 1}
                            >
                                ← Previous
                            </button>
                            <button
                                className="btn btn-outline-light"
                                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={page === totalPages}
                            >
                                Next →
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer
                style={{
                    backgroundColor: '#1f1f1f',
                    color: 'white',
                    padding: '40px 20px',
                    width: '100%',
                    marginTop: 'auto'
                }}
            >
                <div className="container">
                    <div className="row text-center text-md-start">
                        {/* About Section */}
                        <div className="col-md-4 mb-4">
                            <h5>About JobBoard</h5>
                            <p>
                                JobBoard helps job seekers find verified opportunities and apply with ease.
                                Our mission is to connect talent with top companies across the world.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div className="col-md-4 mb-4">
                            <h5>Quick Links</h5>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                <li><Link to="/" className="text-white text-decoration-none">Home</Link></li>
                                <li><Link to="/explore-jobs" className="text-white text-decoration-none">Explore Jobs</Link></li>
                                <li><Link to="/about" className="text-white text-decoration-none">About</Link></li>
                                <li><Link to="/login" className="text-white text-decoration-none">Login</Link></li>
                                <li><Link to="/register" className="text-white text-decoration-none">Register</Link></li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="col-md-4 mb-4">
                            <h5>Contact</h5>
                            <p><i className="ri-map-pin-2-fill"></i> Varanasi, UP, India</p>
                            <p><i className="ri-phone-fill"></i> +91 8009087159</p>
                            <p><i className="ri-mail-fill"></i> support@jobboard.com</p>
                        </div>
                    </div>

                    {/* Divider */}
                    <hr style={{ borderColor: '#444' }} />

                    {/* Social & Copyright */}
                    <div className="text-center">
                        <h6 className="mb-3">Follow Me</h6>
                        <div className="d-flex justify-content-center gap-4 fs-4 mb-3">
                            <a href="https://www.linkedin.com/in/adarsh-kumar-yadav-518550345" className="text-white" target="_blank" rel="noreferrer">
                                <i className="ri-linkedin-box-fill"></i>
                            </a>
                            <a href="#" className="text-white" target="_blank" rel="noreferrer">
                                <i className="ri-github-fill"></i>
                            </a>
                            <a href="https://www.instagram.com/code_with_chay?igsh=MXcyd3ViN3lwd3kweg==" className="text-white" target="_blank" rel="noreferrer">
                                <i className="ri-instagram-fill"></i>
                            </a>
                            <a href="#" className="text-white" target="_blank" rel="noreferrer">
                                <i className="ri-whatsapp-fill"></i>
                            </a>
                        </div>
                        <p className="mb-0">&copy; {new Date().getFullYear()} Adarsh Kumar Yadav. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ExploreJobs;
