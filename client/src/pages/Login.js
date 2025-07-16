
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import Spinner from '../components/shared/Spinner';
import { toast } from 'react-toastify';
import '../styles/login.css';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // hoos 
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Get loading state from Redux store
    const { loading } = useSelector((state) => state.alert);


    // Function to handle form submission
    const handelSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(showLoading());
            const { data } = await axios.post('/api/v1/auth/login', { email, password });
            if (data.success) {
                dispatch(hideLoading());
                localStorage.setItem('token', data.token);
                toast.success('Login successful');
                console.log("TOKEN SET:", localStorage.getItem("token"));

                navigate('/dashboard'); // Redirect to home page after successful login
            }


            setEmail('');
            setPassword('');
        } catch (error) {
            dispatch(hideLoading());
            console.error('Error during login:', error);
            toast.error('Invalid email or password');
        }
    };

    return (
        <>
            {loading ? (<Spinner />) : (
                <div className='form-container' style={{ background: "linear-gradient(135deg, #2e2323, #1e293b" }}>
                    <form className='card p-2' onSubmit={handelSubmit}>
                        <img src='/images/logo/logo2.png' alt='logo' height={100} width={350} />

                        <div className="mb-1">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control"
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Enter your email address'
                            />

                        </div>
                        <div className="mb-1">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" name='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Enter your password'
                            />
                        </div>

                        <div className='register'>
                            <button type="submit" className="btn btn-primary aline-item-center">Login</button>

                            <p>Don't have any account<Link to="/register"> Register</Link></p>
                        </div>

                    </form>
                </div>
            )}
        </>
    )
}

export default Login
