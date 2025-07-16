import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout/Layout';
import Spinner from '../components/shared/Spinner';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState('latest');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [jobType, setJobType] = useState('all');
  const [search, setSearch] = useState('');

  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `/api/v1/job/get-job?sort=${sort}&page=${page}&limit=4&jobType=${jobType}&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (res.data.success) {
        setJobs(res.data.jobs);
        setTotalPages(res.data.numOfPages);
      } else {
        alert('Failed to fetch jobs');
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert('Failed to fetch jobs: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDelete = async (jobId) => {
    const confirmDelete = window.confirm('Do you want to remove this job?');
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`/api/v1/job/delete-job/${jobId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (res.data.success) {
        alert('Job deleted successfully');
        fetchJobs();
      } else {
        alert('Unable to delete job');
      }
    } catch (error) {
      alert('Server error while deleting job');
    }
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line
  }, [sort, page, jobType]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchJobs();
  };

  return (
    <Layout>
      <div className="container mt-4 job-card">
        <h2 className="mb-4 text-center" style={{ color: '#2e2323' }}>
          Your Job Listings
        </h2>

        {/* Filters */}
        <form onSubmit={handleSearchSubmit} className="row g-3 mb-3 align-items-center">
          <div className="col-md-4 d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Search position"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="btn btn-dark">
              Search
            </button>
          </div>

          <div className="col-md-4">
            <select
              value={jobType}
              onChange={(e) => {
                setPage(1);
                setJobType(e.target.value);
              }}
              className="form-select"
            >
              <option value="all">All Job Types</option>
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
              <option value="internship">Internship</option>
              <option value="contract">Contract</option>
            </select>
          </div>

          <div className="col-md-4 d-flex">
            <select
              value={sort}
              onChange={(e) => {
                setPage(1);
                setSort(e.target.value);
              }}
              className="form-select w-auto"
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="a-z">Position A-Z</option>
              <option value="z-a">Position Z-A</option>
            </select>
          </div>
        </form>

        {/* Job List */}
        {loading ? (
          <Spinner />
        ) : jobs.length === 0 ? (
          <p className="text-center text-muted">No jobs found.</p>
        ) : (
          <>
            <div className="row">
              {jobs.map((job, index) => (
                <div key={index} className="col-md-6 mb-4">
                  <div
                    className="card shadow-sm"
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '12px',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.1)';
                    }}
                  >
                    <div className="card-body">
                      <h5 className="card-title fw-bold" style={{ color: '#2e2323' }}>
                        {job.position}
                      </h5>
                      <h6 className="card-subtitle mb-2 text-muted">{job.company}</h6>
                      <p className="card-text mb-1"><strong>Type:</strong> {job.jobType}</p>
                      <p className="card-text mb-1"><strong>Status:</strong> {job.status}</p>
                      <p className="card-text mb-1"><strong>Location:</strong> {job.jobLocation}</p>
                      <p className="card-text"><strong>Posted:</strong> {new Date(job.createdAt).toLocaleDateString()}</p>

                      <div className="d-flex gap-2 mt-3">
                        <button
                          className="btn btn-sm"
                          style={{
                            backgroundColor: '#dc3545',
                            color: 'white',
                            fontWeight: '500',
                            borderRadius: '6px',
                            transition: 'background-color 0.3s ease',
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#c82333'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#dc3545'}
                          onClick={() => handleDelete(job._id)}
                        >
                          Delete
                        </button>

                        <button
                          className="btn btn-sm"
                          style={{
                            backgroundColor: '#f0ad4e',
                            color: 'white',
                            fontWeight: '500',
                            borderRadius: '6px',
                            transition: 'background-color 0.3s ease',
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ec9c2d'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f0ad4e'}
                          onClick={() => navigate(`/update-job/${job._id}`)}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="d-flex justify-content-center mt-4">
              <nav>
                <ul className="pagination">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <li
                      key={i}
                      className={`page-item ${page === i + 1 ? 'active' : ''}`}
                      style={{ cursor: 'pointer' }}
                    >
                      <button className="page-link" onClick={() => setPage(i + 1)}>
                        {i + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </>
        )}
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

      <footer
        style={{
          backgroundColor: '#1f1f1f',
          color: 'white',
          padding: '40px 20px',
          width: '100%',
          marginTop: 'auto'
        }}
      >

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

      </footer>
    </Layout>
  );
};

export default Jobs;
