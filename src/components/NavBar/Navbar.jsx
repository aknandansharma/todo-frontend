import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileInfo from "../cards/ProfileInfo";

const Navbar = ({ userInfo }) => {
    const navigate = useNavigate();

    const userLogout = () => {
        localStorage.clear();
        navigate("/login");
    }

    return (
        <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
            <h2 className="text-xl font-medium text-black py-2">Task</h2>


            {userInfo ? <ProfileInfo userInfo={userInfo} userLogout={userLogout} /> : ""}

            {/* <nav>
                <ul>
                    <li>
                        <Link to='/dashboard'>Home</Link>
                    </li>
                    <li>
                        <Link to='/login'>Login</Link>
                    </li>
                    <li>
                        <Link to='/register'>Sign Up</Link>
                    </li>
                </ul>
            </nav> */}
        </div>
    );
};

export default Navbar;
