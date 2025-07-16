import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import Spinner from '../components/shared/Spinner';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// import '../../styles/UpdateProfile.css'






const UpdateProfile = () => {


    const [user, setUser] = useState({ name: '', lastName: '', email: '', location: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const getUserProfile = async () => {
        try {
            setLoading(true);
            const res = await axios.post('/api/v1/user/getUser', {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setLoading(false);
            if (res.data.success) {
                setUser(res.data.data);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        getUserProfile();
    }, []);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put('/api/v1/user/update-user', user, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (res.data.success) {
                toast.success("Profile updated successfully!");
                navigate('/dashboard');
            }
        } catch (error) {
            console.log(error);
            toast.error("Error updating profile");
        }
    };

    return (
        <Layout>
            {loading ? (
                <Spinner />
            ) : (
                <div className="container mt-4">
                    <h2 className="mb-4 text-center " style={{ color: "wheat" }}>Update Profile</h2>
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
                        <div className="form-group mb-3">
                            <label style={{ fontWeight: "600", color: "#1e293b" }}>Name</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                value={user.name}
                                onChange={handleChange}
                                required
                                style={{
                                    borderRadius: "8px",
                                    padding: "10px",
                                    border: "1px solid #ccc",
                                }}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label style={{ fontWeight: "600", color: "#1e293b" }}>Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                className="form-control"
                                value={user.lastName}
                                onChange={handleChange}
                                style={{
                                    borderRadius: "8px",
                                    padding: "10px",
                                    border: "1px solid #ccc",
                                }}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label style={{ fontWeight: "600", color: "#1e293b" }}>Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                value={user.email}
                                onChange={handleChange}
                                required
                                style={{
                                    borderRadius: "8px",
                                    padding: "10px",
                                    border: "1px solid #ccc",
                                }}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label style={{ fontWeight: "600", color: "#1e293b" }}>Location</label>
                            <input
                                type="text"
                                name="location"
                                className="form-control"
                                value={user.location}
                                onChange={handleChange}
                                required
                                style={{
                                    borderRadius: "8px",
                                    padding: "10px",
                                    border: "1px solid #ccc",
                                }}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn"
                            style={{
                                backgroundColor: "#1e293b",
                                color: "white",
                                padding: "10px 20px",
                                borderRadius: "8px",
                                border: "none",
                                fontWeight: "500",
                                transition: "background-color 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#2e2323";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "#1e293b";
                            }}
                        >
                            Update
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
            )}
        </Layout>
    );
};

export default UpdateProfile;
