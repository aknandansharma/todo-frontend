import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/NavBar/Navbar';
import { toast } from 'react-toastify';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError("Please Enter a Valid email address.");
            return;
        }
        if (!password) {
            setError("Please Enter the Password.");
            return;
        }
        setError("");

        // Login API
        try {
            const response = await axiosInstance.post("/api/v1/auth/login", {
                email: email,
                password: password,
            });

            if(response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                toast.success("Login Successful!");
                navigate("/dashboard")
            }
        } catch (error) {
            toast.error("Error in login");
            if(error.error && error.response.data && error.response.data.message) {
                setError("An unexpected error occurred. Please try again.")
            }
        }


    };

    return (
        <>
        <Navbar />
        <div className='flex item-center justify-center mt-28'>
            <div className='w-96 border rounded bg-white px-7 py-10'>
                <form onSubmit={handleLogin}>
                    <h4 className='text-2xl mb-7'>Login Here</h4>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type='text'
                        placeholder='Enter your Registered Email'
                        className='input-box'
                    />
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={showPassword ? "text" : "password"}
                        placeholder='Enter Correct Password'
                        className='input-box'
                    />
                    {/* {showPassword ? (
                        <FaRegEyeSlash
                            size={22}
                            className='text-primary cursor-pointer'
                            onClick={() => toggleShowPassword()}
                        />
                    ) : (
                        <FaRegEye
                            size={22}
                            className='text-slate-400 cursor-pointer'
                            onClick={() => toggleShowPassword()}
                        />
                    )} */}
                    {error && (
                        <p className='text-red-500 text-xs pb-1'>{error}</p>
                    )}
                    <button type='submit' className='btn-primary'>
                        Login
                    </button>

                    <p className='text-sm text-center mt-4'>
                        Not Register yet?{" "}
                        <Link
                            to='/register'
                            className='font-medium text-primary underline'>
                            register Now.
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    </>
    );
};

export default Login;
