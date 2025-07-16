
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import Spinner from '../components/shared/Spinner';
import { toast } from 'react-toastify';

const Register = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Get the loading state from the Redux store
  const { loading } = useSelector((state) => state.alert);

  //hooks 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle form submission
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !lastName || !email || !password) {
        return toast.error("please provide all field");
      }
      dispatch(showLoading());
      const { data } = await axios.post('/api/v1/auth/register', {
        name,
        lastName,
        email,
        password
      });
      dispatch(hideLoading());
      if (data.success) {
        toast.success('Registration successful');
        navigate('/login');
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error('Error during login:', error);
      toast.error('Email already exists try another email');
    }


    // Here you can add the logic to handle the registration, like sending data to the server
    console.log('Form submitted:', { name, lastName, email, password });
    // Reset form fields after submission
    setName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };

  return (
    <>
      {loading ? (<Spinner />) : (
        <div className='form-container' style={{ background: "linear-gradient(135deg, #2e2323, #1e293b" }}>
          <form className='card p-2' onSubmit={handelSubmit}>
            <img src='/images/logo/logo2.png' alt='logo' height={100} width={350} />
            <div className="mb-1">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Enter your name'
              />
            </div>

            <div className="mb-1">
              <label htmlFor="name" className="form-label">Last Name</label>
              <input type="text" className="form-control"
                name="name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder='Enter your last name'
              />
            </div>

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
              <button type="submit" className="btn btn-primary aline-item-center">Register</button>

              <p>Already Register <Link to="/login">Login</Link></p>
            </div>

          </form>
        </div>
      )
      }
    </>
  )
}

export default Register
