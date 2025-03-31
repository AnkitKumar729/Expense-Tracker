import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";

const SideMenu = ({ activeMenu }) => {
    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleClick = (route) => {
        if (route === "/logout") {
            handleLogout();
            return;
        }
        navigate(route);
    };

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/login");
    };

    return (
        <div className="w-64 h-screen bg-white shadow-lg fixed left-0 top-0 p-4">
            {/* Profile Section */}
            <div className="flex flex-col items-center mb-8">
                {user?.profileImageUrl ? (
                    <img 
                        src={user.profileImageUrl}
                        alt="Profile"
                        className="w-16 h-16 rounded-full mb-4"
                    />
                ) : (
                    <CharAvatar
                        fullName={user?.fullName}  // Fixed variable name and spacing
                        width="w-20"
                        height="h-20"
                        style="text-xl"  // Fixed closing quote
                    />
                )}
                <h5 className="text-lg font-semibold text-gray-800">
                    {user?.fullName || "Welcome User"}
                </h5>
            </div>

            {/* Menu Items */}
            <div className="flex flex-col gap-2">
                {SIDE_MENU_DATA.map((item, index) => (
                    <button
                        key={`menu_${index}`}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                            ${activeMenu === item.path 
                                ? "bg-purple-600 text-white"
                                : "text-gray-600 hover:bg-purple-100"}`}
                        onClick={() => handleClick(item.path)}
                    >
                        <item.icon className="text-xl" />
                        <span>{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SideMenu;