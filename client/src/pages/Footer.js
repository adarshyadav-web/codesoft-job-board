import React from 'react';
import 'remixicon/fonts/remixicon.css'; // Important: ensure remixicon is loaded

const Footer = () => {
    return (
        <footer
            style={{
                backgroundColor: '#2e2323',
                color: 'white',
                padding: '40px 20px',
                width: '100%',
                marginTop: 'auto'
            }}
        >

            <div className="container text-center">
                <h5 className="mb-4">Follow Me</h5>

                <div className="d-flex justify-content-center gap-4 mb-3 fs-3">
                    <a href="www.linkedin.com/in/adarsh-kumar-yadav-518550345" className="text-white" target="www.linkedin.com/in/adarsh-kumar-yadav-518550345" rel="noreferrer">
                        <i className="ri-linkedin-box-fill"></i>
                    </a>
                    <a href="#" className="text-white" target="_blank" rel="noreferrer">
                        <i className="ri-github-fill"></i>
                    </a>
                    <a href="#" className="text-white" target="_blank" rel="noreferrer">
                        <i className="ri-instagram-fill"></i>
                    </a>
                    <a href="#" className="text-white" target="_blank" rel="noreferrer">
                        <i className="ri-whatsapp-fill"></i>
                    </a>
                </div>

                <p className="mb-0">&copy; {new Date().getFullYear()} Adarsh Kumar Yadav. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
