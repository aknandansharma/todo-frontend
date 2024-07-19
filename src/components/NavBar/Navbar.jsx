import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileInfo from "../cards/ProfileInfo";

const Navbar = ({ userInfo }) => {
    const navigate = useNavigate();

    const userLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow-lg'>
            <Link to='/' className='text-xl font-extrabold text-black py-2'>
                Task <span className='text-red-600 text-5xl transform rotate-45 '>M</span>
            </Link>

            {userInfo ? (
                <ProfileInfo userInfo={userInfo} userLogout={userLogout} />
            ) : (
                ""
            )}

            {!userInfo ? (
                <div className='flex flex-row items-end justify-between'>
                    <Link
                        to='/register'
                        className='px-4 py-2 border border-blue-500 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75'>
                        Sign Up
                    </Link>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default Navbar;
