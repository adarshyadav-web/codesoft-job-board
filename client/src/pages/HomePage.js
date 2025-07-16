
import React from "react";
import '../styles/Homepage.css'; // Importing the CSS file for styling
import { Link } from "react-router-dom";
import 'remixicon/fonts/remixicon.css';

const HomePage = () => {
    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="logo">
                        <div className="logo-circle">JB</div>
                        <h5 className="logo-text">JobBoard</h5>
                    </div>
                    <div className="list">
                        <ul className="nav-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/explore-jobs">Explore Jobs</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><a href="#contact">Contact</a></li>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </ul>
                    </div>

                </div>
            </nav>
            <section className="hero-section">
                <div className="hero-left">
                    <h1>
                        Find Your <br />
                        <span>Dream Job</span> <br />
                        Today
                    </h1>
                    <p>
                        Explore thousands of job opportunities with all the information you need. <br />
                        It’s your time to shine!
                    </p>
                    <div className="hero-buttons">
                        <button className="btn-primary get"><Link to="/login">Get Started</Link></button>
                        <button className="btn-secondary">Learn More</button>
                    </div>
                    <div className="hero-features">
                        <div className="feature-card">
                            <img src="/thumb-icon.png" alt="Easy Apply" />
                            <h3>Easy Apply</h3>
                            <p>Apply to your dream job in just one click!
                                No lengthy forms or complex steps — just easy and quick applications.
                                Save time and get noticed faster by top employers.</p>
                        </div>
                        <div className="feature-card">
                            <img src="/shield-icon.png" alt="Verified Companies" />
                            <h3>Verified Companies</h3>
                            <p>We feature only verified and trusted companies.
                                Every job listed here is from a reliable employer.
                                Stay safe and confident while applying to genuine opportunities.</p>
                        </div>
                        <div className="feature-card">
                            <img src="/bell-icon.png" alt="Notifications" />
                            <h3>Real-time Notifications</h3>
                            <p>Stay updated with instant job alerts and application updates.
                                Get notified as soon as new jobs are posted.
                                Never miss an opportunity — all updates delivered in real-time!
                                Boost your chances by acting faster than others.</p>
                        </div>
                    </div>
                </div>

                <div className="hero-right">
                    <img src="/girl.png" alt="Hero Girl" className="hero-girl" />
                    <img src="/id-card.png" alt="ID Card" className="id-card" />
                </div>
            </section>

            <section className="trusted-section">
                <p>Trusted by</p>
                <div className="trusted-logos">
                    <img src="/company-logo1.png" alt="Company" />
                    company
                    <img src="/company-logo2.png" alt="Partner" />
                    Partner
                    <img src="/company-logo3.png" alt="Business" />
                    Business
                    <img src="/company-logo4.png" alt="Enterprise" />
                    Enterprise

                </div>
            </section>
            <section className="contact-section" id="contact">
                <div className="contact-container">
                    <h2>Get in Touch</h2>
                    <p>
                        Have questions, feedback, or ideas? We’d love to hear from you. <br />
                        Connect with us anytime and we’ll get back to you shortly.
                    </p>
                    <div className="contact-details">
                        <p><i className="ri-mail-fill"></i> support@jobboard.com</p>
                        <p><i className="ri-phone-fill"></i> +91 8009087159</p>
                        <p><i className="ri-map-pin-fill"></i> Varanasi, Uttar Pradesh, India</p>
                    </div>
                </div>
            </section>

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





        </>
    );
}
export default HomePage;