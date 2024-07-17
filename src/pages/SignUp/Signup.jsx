import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { validateEmail } from "../../utils/helper";

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handlesignup = async (e) => {
        e.preventDefault();

        if (!name) {
            setError("Please Enter the Name.");
            return;
        }
        if (!validateEmail(email)) {
            setError("Please Enter a Valid email address.");
            return;
        }
        if (!password) {
            setError("Please Enter the Password.");
            return;
        }
      
        setError("");

        // register API


    };

    return (
        <div className='flex item-center justify-center mt-28'>
            <div className='w-96 border rounded bg-white px-7 py-10'>
                <form onSubmit={handlesignup}>
                    <h4 className='text-2xl mb-7'>Register Here</h4>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type='text'
                        placeholder='Enter Full Name'
                        className='input-box'
                    />
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type='text'
                        placeholder='Enter Your Email'
                        className='input-box'
                    />
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={showPassword ? "text" : "password"}
                        placeholder='Enter Password'
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
                        Register 
                    </button>

                    <p className='text-sm text-center mt-4'>
                        You are already register please?{" "}
                        <Link
                            to='/login'
                            className='font-medium text-primary underline'>
                            login Now.
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
