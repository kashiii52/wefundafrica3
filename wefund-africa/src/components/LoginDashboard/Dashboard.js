// import Footer from "../Footer/Footer";
// import Navbar from "../Navbar/Navbar";
// import { useContext, useEffect, useState } from "react";
// import "./Dashboard.css";
// import DashboardNavbar from "../Dashboard_Navbar/Dashboard_Navbar";
// import { BiLogOut } from "react-icons/bi";
// import StaticNavBar from "../StaticNavBar/StaticNavBar";
// import AppContext from "../utils/AppContext";
// import FileUpload from "../FileUpload/FileUpload";
// import { useLocation, useNavigate } from "react-router-dom";


// const Dashboard = () => {

//     let { userDetail } = useContext(AppContext);
//     userDetail = JSON.parse(localStorage.getItem("userDetail"));
//     console.log(userDetail)


//     const [selectedFile, setSelectedFile] = useState(null);

//     const handleFileChange = (file) => {
//         setSelectedFile(file);
//     };
//     const navigate = useNavigate();
//     const handleprofileclick = () => {
//         navigate('/user/profile');
//     };
//     const location = useLocation();
//     const isDashboardPage = location.pathname === '/user/dashboard';

    

//     return (
//     <div className="Homepage_master_div">
//         <div>
//         <StaticNavBar />
//         </div>
//         <div>
//             <DashboardNavbar />
//         </div>
//         <div className="dashboard_master_div">
        
//         <FileUpload onFileChange={handleFileChange} />

//         </div>

//         <Footer />
//     </div>
// );
// };

// export default Dashboard;





import React, { useContext, useState, useEffect } from "react";
import "./Dashboard.css";
import DashboardNavbar from "../Dashboard_Navbar/Dashboard_Navbar";
import StaticNavBar from "../StaticNavBar/StaticNavBar";
import AppContext from "../utils/AppContext";
import FileUpload from "../FileUpload/FileUpload";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Dashboard = () => {
    let { userDetail } = useContext(AppContext);
    userDetail = JSON.parse(localStorage.getItem("userDetail"));
    console.log(userDetail);

    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Add loading state

    const handleFileChange = (file) => {
        setSelectedFile(file);
    };

    const navigate = useNavigate();
    const handleprofileclick = () => {
        navigate('/user/profile');
    };

    const location = useLocation();
    const isDashboardPage = location.pathname === '/user/dashboard';

    useEffect(() => {
        // Simulate data loading with a timeout
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000); // Adjust the timeout duration as needed
    }, []); // Run once on component mount

    return (
        <div className="Homepage_master_div">
            <div>
                <StaticNavBar />
            <div className="navbar-for-dashboard">
                <Navbar showApplyNowButton={false} isDashboard={true} />
                </div>
            </div>
            <div>
                <DashboardNavbar />
            </div>
            <div className="dashboard_master_div">
                {isLoading ? ( // Render loader when isLoading is true
                    <div className="loader"></div>
                ) : (
                    <FileUpload onFileChange={handleFileChange} />
                )}
            </div>
        </div>
    );
};

export default Dashboard;
