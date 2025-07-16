
import React, { useState, } from 'react'
import '../../styles/Layout.css'
import { userMenu } from './Menus/UserMenu';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';


const Layout = ({ children }) => {
    const sidebarMenu = userMenu
    const location = useLocation();
    const Navigate = useNavigate();
    const [userName,] = useState('');
    // logout
    const logouthandelar = () => {
        localStorage.removeItem('token');
        toast.success("Logout Successful")
        Navigate('/');
    }
    return (
        <>
            <div className='row'>
                <div className='col-md-3 sidebar'>
                    <div className='logo'>
                        <h6 className='text-center'>Job Board</h6>
                    </div>
                    <hr></hr>
                    <p className='text-center text-warning'>Welcome : {userName}</p>
                    <hr></hr>
                    <div className='menu'>
                        {sidebarMenu.map(menu => {
                            const isActive = location.pathname === menu.path
                            return (
                                <div className={`menu-item ${isActive && "active"}`}>
                                    <i className={menu.icon}></i>
                                    <Link to={menu.path}>{menu.name}</Link>
                                </div>
                            )
                        })}
                        <div className={`menu-item`} onClick={logouthandelar}>
                            <i class="ri-logout-box-line"></i>
                            <Link to="/login">Logout</Link>
                        </div>
                    </div>
                </div>

                <div className='col-md-9' style={{ background: "linear-gradient(135deg, #2e2323, #1e293b" }}>{children}</div>
            </div>
        </>
    )
}

export default Layout
