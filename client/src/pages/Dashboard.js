import React from 'react';
import Layout from '../components/Layout/Layout';
import '../styles/DashboardUI.css'; // Make sure this path is correct

const Dashboard = () => {
    return (
        <Layout>
            <div className="dashboard-container">

                <h1 className="text-center mb-4">Welcome to Your JobBoard Dashboard</h1>
                <p className="text-center mb-5">
                    Track your job posts, applications, interviews, and manage everything from one place.
                </p>

                {/* Stats Section */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <i className="ri-briefcase-line"></i>
                        <div>Jobs Posted</div>
                        <div className="stat-number">124</div>
                    </div>
                    <div className="stat-card">
                        <i className="ri-checkbox-circle-line"></i>
                        <div>Applications</div>
                        <div className="stat-number">67</div>
                    </div>
                    <div className="stat-card">
                        <i className="ri-calendar-check-line"></i>
                        <div>Interviews Scheduled</div>
                        <div className="stat-number">12</div>
                    </div>
                </div>

                {/* Jobs Section */}
                <div className="jobs-grid">
                    <div className="job-card">
                        <div className="job-icon"><i className="ri-code-line"></i></div>
                        <div className="job-title">Frontend Developer</div>
                        <div className="job-company">Google • New York, NY</div>
                        <div className="job-description">Experience in React.js. Learn more...</div>
                        <div className="job-footer">
                            <span>2h ago</span>
                            <div className="arrow"><i className="ri-arrow-right-line"></i></div>
                        </div>
                    </div>

                    <div className="job-card">
                        <div className="job-icon"><i className="ri-server-line"></i></div>
                        <div className="job-title">Backend Developer</div>
                        <div className="job-company">Facebook • Remote</div>
                        <div className="job-description">API development using Node.js</div>
                        <div className="job-footer">
                            <span>6h ago</span>
                            <div className="arrow"><i className="ri-arrow-right-line"></i></div>
                        </div>
                    </div>

                    <div className="job-card">
                        <div className="job-icon"><i className="ri-database-2-line"></i></div>
                        <div className="job-title">Data Scientist</div>
                        <div className="job-company">Amazon • Seattle, WA</div>
                        <div className="job-description">Join our Machine Learning team</div>
                        <div className="job-footer">
                            <span>8h ago</span>
                            <div className="arrow"><i className="ri-arrow-right-line"></i></div>
                        </div>
                    </div>
                </div>

                {/* Contact Us Section */}
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

export default Dashboard;
