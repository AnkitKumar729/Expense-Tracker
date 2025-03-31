import React, {useContext, useState} from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link,useNavigate } from 'react-router-dom'; 
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const { updateUser } = useContext(UserContext);

    //Handle Login Form
    const handleLogin = async (e) => {
        e.preventDefault();

        if(!validateEmail(email)){
            setError("Please enter a valid email address:");
            return;
        }

        if(!password){
            setError("Please enter a password");
            return;
        }

        setError("");

        //Login API Call
        try{
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
            email,
            password,
        });
        
        const { token, user } = response.data;

        if (token) {
            localStorage.setItem("token", token);
            //updateUser(user);
            navigate("/dashboard");
        }
    } catch (error) {  
        if (error.response && error.response.data.message) {
            setError(error.response.data.message);
        } else {
            setError("Something Went Wrong. Please Try Again");
        }
    } 
    
}
    return (
        <AuthLayout>
          <div className="lg:w-[70%] h-3/4 md:h-full flex-col justify-center">
                <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
                <p className="text-xs text-slate-700 mt-[5px] mb-6">
                    Please enter your details to log in
                </p>
                <form onSubmit={handleLogin}>
                    <Input
                        value={email}
                        onChange= {setEmail}
                        label="Email Address"
                        placeholder="ankit@example.com"
                        type="text"
                    />
                     <Input
                        value={password}
                        onChange={setPassword}
                        label="Password"
                        placeholder="Min 8 characters required"
                        type="password"
                    />

                    {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

                    <button type="submit" className="btn-primary">
                        LOGIN
                    </button>

                    <p className="text-[13px] text-slate-800 mt-3">
                        Don't have an account?{" "}
                        <Link className="font-medium text-primary underline" to="/signup">
                            Sign Up
                        </Link>  
                    </p>                
                </form>
          </div>
        </AuthLayout>

    )
}
export default Login;