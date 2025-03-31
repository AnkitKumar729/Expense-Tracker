import React, {useContext, useState} from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link,useNavigate } from 'react-router-dom'; 
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";
import uploadImage from "../../utils/uploadImage";

const SignUp = () => {
    
        const [profilePic, setProfilePic] = useState(null);
        const [fullName, setFullName] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [error, setError] = useState(null);
    
        const {updateUser} = useContext(UserContext)
        const navigate = useNavigate();

    
        const handleSignUp = async (e) => {
                e.preventDefault();
                setError(null);
        
                let profileImageUrl = "";
        
                if (!fullName) {
                    setError("Full name is required.");
                    return;
                }
                if (!validateEmail(email)) {
                    setError("Please enter a valid email address.");
                    return;
                }
                if (password.length < 8) {
                    setError("Password must be at least 8 characters long.");
                    return;
                }
                setError("");
                //SignUp API Call
                try{

                    //Upload Image
                    if (profilePic) {
                        const imgUploadRes = await uploadImage(profilePic);
                        profileImageUrl = imgUploadRes.image.url || "";
                    }
                    const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                        fullName,
                        email,
                        password,
                        profileImageUrl
                    });

                    const { token, user } = response.data;
                    
                    if (token) {
                        localStorage.setItem("token", token);
                        updateUser(user);
                        navigate("/dashboard");
                    }
                } catch (error){
                    if(error.response && error.response.data.message) {
                        setError(error.response.data.message);
                    }else {
                        setError("Something went wrong. Please try again..");
                    }
                }
};

        return (
            <AuthLayout>
                <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col items-center justify-center min-h-screen">
                    <h3 className="text-xl font-semibold text-black">Create an Account</h3>
                    <p className="text-xs text-slate-700 mt-[5px] mb-6">
                        Join us today by entering your details below.
                    </p>
                    
                    <form onSubmit={handleSignUp} className="w-full max-w-md">
                        
                    <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                value={fullName}
                                onChange={setFullName}
                                label="Full Name"
                                placeholder="Ankit"
                                type="text"
                            />
                            <Input
                                value={email}
                                onChange={setEmail}
                                label="Email Address"
                                placeholder="Ankit@example.com"
                                type="email"
                            />
                            <div className="col-span-2">
                                <Input
                                    value={password}
                                    onChange={setPassword}
                                    label="Password"
                                    placeholder="Min 8 characters"
                                    type="password"
                                />
                            </div>
                        </div>
    
                        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
                        
                             <button type="submit" className="btn-primary">
                                    SIGN UP
                            </button>
                        
                           <p className="text-[13px] text-slate-800 mt-3">
                                    Already have an account?{" "}
                             <Link className="font-medium text-primary underline" to="/login">
                                     Login
                             </Link>  
                            </p> 
                    </form>
                </div>
            </AuthLayout>
    )
};

export default SignUp;