import { MdClass } from "react-icons/md";
import "./Dashboard_Navbar.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../utils/AppContext";

const DashboardNavbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    let { logoutUser, userDetail } = useContext(AppContext);

    return (
        <div className="dashboard_navbar_master_div">
            <div className="dashboard_navbar_components">
                <button  className={`dashboard_button ${
                        location.pathname === "/user/dashboard" ? "active" : ""
                    }`} onClick={() => navigate("/user/dashboard")}>Dashboard</button>
                <button className={`profile_button ${
                        location.pathname === "/user/profile" ? "active" : ""
                    }`} onClick={() => navigate("/user/profile")}>Profile</button>
            </div>

            <div className="welcome_user">Welcome, {userDetail.username}</div>

            <div className="logout_button_div">
                    <button className="logout_button"
                    onClick={logoutUser}>Log Out</button>
                </div>
            
        </div>
    );
};

export default DashboardNavbar;