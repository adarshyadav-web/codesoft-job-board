import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/About.css';

const AboutMe = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="text-center" style={{ marginTop: '20%' }}>
                <div
                    className="spinner-border"
                    role="status"
                    style={{ width: '2rem', height: '2rem' }}
                ></div>
                <p className="mt-3">Loading About Section...</p>
            </div>
        );
    }

    return (
        <>
            <section className="about-section">
                <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
                    <button
                        className="btn btn-outline-secondary shadow-sm btn2"
                        onClick={() => navigate('/')}
                        style={{
                            fontWeight: '500',
                            fontSize: '16px',
                            borderRadius: '8px',
                            color: "wheat"
                        }}
                    >
                        ⬅ Back to Home
                    </button>
                </div>

                <div className="about-container">
                    <div className="about-image">
                        <img src="/adarsh.jpg" alt="Adarsh Kumar Yadav" />
                    </div>

                    <div className="about-content text-center">
                        <h2>About Me</h2>
                        <h1>Adarsh Kumar Yadav</h1>
                        <p>
                            I’m a web developer with experience in frontend and backend
                            development, specializing in the MERN stack.
                        </p>

                        {/* Cards */}
                        <div className="about-card animate">
                            <i className="ri-server-line"></i>
                            <div>
                                <h4 style={{ fontWeight: '600', fontSize: '18px' }}>Backend Expertise</h4>
                                <p style={{ fontSize: '14px', color: '#ddd' }}>
                                    Node.js, Express.js, API Testing, CRUD Operations
                                </p>
                            </div>
                        </div>

                        <div className="about-card animate">
                            <i className="ri-code-s-slash-line"></i>
                            <div>
                                <h4 style={{ fontWeight: '600', fontSize: '18px' }}>Frontend Expertise</h4>
                                <p style={{ fontSize: '14px', color: '#ddd' }}>
                                    HTML, CSS, JavaScript, React.js, Redux, Redux Toolkit, Bootstrap, Tailwind
                                </p>
                            </div>
                        </div>

                        <div className="about-card animate">
                            <i className="ri-database-2-line"></i>
                            <div>
                                <h4 style={{ fontWeight: '600', fontSize: '18px' }}>Database</h4>
                                <p style={{ fontSize: '14px', color: '#ddd' }}>
                                    MongoDB, MySQL, SQL, Atlas
                                </p>
                            </div>
                        </div>

                        <div className="about-card animate">
                            <i className="ri-scissors-2-line"></i>
                            <div>
                                <h4 style={{ fontWeight: '600', fontSize: '18px' }}>Video Editing</h4>
                                <p style={{ fontSize: '14px', color: '#ddd' }}>
                                    Shorts, Reels, Podcast, Audio Editing, and more
                                </p>
                            </div>
                        </div>

                        <div className="about-card animate">
                            <i className="ri-briefcase-line"></i>
                            <div>
                                <h4 style={{ fontWeight: '600', fontSize: '18px' }}>Job Board Project</h4>
                                <p style={{ fontSize: '14px', color: '#ddd' }}>
                                    Building a robust platform for job seekers
                                </p>
                            </div>
                        </div>

                        {/* Download CV */}
                        <div className="mt-4">
                            <a href="/Adarsh_CV.pdf" download className="btn btn-primary btn2">
                                📄 Download CV
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
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
                        <div className="col-md-4 mb-4">
                            <h5>About JobBoard</h5>
                            <p>
                                JobBoard helps job seekers find verified opportunities and apply with ease.
                                Our mission is to connect talent with top companies across the world.
                            </p>
                        </div>

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

                        <div className="col-md-4 mb-4">
                            <h5>Contact</h5>
                            <p><i className="ri-map-pin-2-fill"></i> Varanasi, UP, India</p>
                            <p><i className="ri-phone-fill"></i> +91 8009087159</p>
                            <p><i className="ri-mail-fill"></i> support@jobboard.com</p>
                        </div>
                    </div>

                    <hr style={{ borderColor: '#444' }} />

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
};

export default AboutMe;
