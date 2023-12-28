import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { useContext, useEffect, useState } from "react";
import "./UserProfile.css";
import { BiLogOut } from "react-icons/bi";
import StaticNavBar from "../StaticNavBar/StaticNavBar";
import AppContext from "../utils/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import DashboardNavbar from "../Dashboard_Navbar/Dashboard_Navbar";



const UserProfile = () => {

    let { userDetail, setUserDetail } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [updatedUserDetail, setUpdatedUserDetail] = useState({
        username: userDetail.username,
        email: userDetail.email,
        phone_number: userDetail.phone_number,
        first_name: userDetail.first_name,
        last_name: userDetail.last_name,
        image: userDetail.image,
        years_in_business: userDetail.years_in_business,
        monthly_revenue: userDetail.monthly_revenue || "0",
    });


    const [profileFieldsChanged, setProfileFieldsChanged] = useState(false);
    const [imageBase64, setImageBase64] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUserDetail({
            ...updatedUserDetail,
            [name]: value,
        });
        setProfileFieldsChanged(true);
    };

    const backendRoot =
    // "http://54.236.11.151";
    "http://127.0.0.1:8000";
    const handleUpdateProfile = async () => {
        if (!profileFieldsChanged) {
            console.log("No profile fields have been changed.");
            return;
        }
        const accessToken = JSON.parse(localStorage.getItem('authTokens')).access;
        console.log("updateuserdetail:", updatedUserDetail)

        try {
            const response = await axios.put(
                `${backendRoot}/update-profile/`,
                updatedUserDetail,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
    
            if (response.status === 200) {
                const responseData = response.data;
                console.log("User profile updated successfully!");
                console.log("Request Data:", updatedUserDetail);
                console.log("Response Data:", responseData);
                setProfileFieldsChanged(false);
                setUserDetail(updatedUserDetail);
            } else if (response.status === 401) {
                console.error("Unauthorized: Access token is not valid or lacks permissions.");
                navigate("/login");
            } else {
                console.error("Error updating user profile:", response.statusText);
                navigate("/login");
            }
            setIsLoading(false);

        } catch (error) {
            console.error("Error updating user profile:", error);
            navigate("/login");
        }
    };

    useEffect(() => {
        const accessToken = JSON.parse(localStorage.getItem('authTokens')).access;
        axios
        .get(`${backendRoot}/retrieve_image/${userDetail.username}/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        .then((response) => {
            const imageBase64Data = response.data.images;
            for (const imageName in imageBase64Data) {
                if (imageBase64Data.hasOwnProperty(imageName)) {
                    const imageBase64 = imageBase64Data[imageName];
                    setImageBase64(imageBase64);
                }
            }
            setIsLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching files:', error);
            localStorage.removeItem('authTokens');
            localStorage.removeItem('userDetail');
            navigate('/login');
        });
    }, []);


    const [authLoader, setAuthLoader] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!authLoader) {
            setAuthLoader(true);

            const formData = new FormData(e.target);
            const accessToken = JSON.parse(localStorage.getItem('authTokens')).access;

            try {
            let response = await fetch(`${backendRoot}/image-upload/`, {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            let data = await response.json();
            console.log(data);
            console.log("before if condition");
            if (response.status === 201) {
                console.log("User successfully register")
                // navigate("/login");
                window.location.reload();
            } else {
                const errorData = await response.json();
            }
            } catch (error) {
            console.error("An error occurred:", error);
            } 
        }
    };                                                                            

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
        {isLoading ? ( 
            // Conditionally render loader if isLoading is true
            // <div className="loader-container">
            <div className="loader" />
            // </div>
        ) : (
            <div className="user_profile_master_div">
            {userDetail && (
                <>
                <div className="user_profile_details">
                    <div className="profile_detail_div">
                    <h2>Profile Detail</h2>
                    
                    <div className="profile_image_div">
                        {/* <img className="profile_img" src={`${backendRoot}${userDetail.image}`} /> */}
                        <img className="profile_img" src={`data:image/png;base64,${imageBase64}`} alt="Profile" />
                    </div>



                    {/* <div className="update_profile_button_div">
                        <button className="update_picture_btn">Update Picture</button>
                    </div> */}


                    <form id="inputform" onSubmit={handleSubmit}>
                    
                        <div className="upload_profile_image">
                            <span className="profile_image_title">Upload Profile Image*</span>
                        </div> 
                        <div className="inputbox-image">
                                <input name="image" type="file" accept="image/*" required="required"></input>
                        </div>
                        <button id="upload_image_button" type="submit">
                            {authLoader ? <span id="authloader"></span> : "Upload"}
                        </button>
                    </form>
                    





                    <div className="profile_user_details">
                        <div className="single_line">Company Name: {updatedUserDetail.username}</div>
                        <div className="single_line">Email: {updatedUserDetail.email}</div>
                        <div className="single_line">Phone: {updatedUserDetail.phone_number}</div>
                    </div>
                    </div>


                    <div className="border_master_div">
                    <div className="user_profile_border_line"></div>
                    </div>


                    <div className="user_profile_edit_div">
                    <h2>Edit Details:</h2>
                            
                    <div className="text_input">
                        <span>Company Name</span>
                        <input
                        type="text"
                        name="username"
                        value={updatedUserDetail.username}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div className="text_input">
                        <span>First Name</span>
                        <input
                        type="text"
                        name="first_name"
                        value={updatedUserDetail.first_name}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div className="text_input">
                        <span>Last Name</span>
                        <input
                        type="text"
                        name="last_name"
                        value={updatedUserDetail.last_name}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div className="text_input">
                        <span>Email</span>
                        <input
                        type="text"
                        name="email"
                        value={updatedUserDetail.email}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div className="text_input">
                        <span>Phone Number</span>
                        <input
                        type="text"
                        name="phone_number"
                        value={updatedUserDetail.phone_number}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div className="text_input">
                        <span>How many years in Business</span>
                        <input
                        type="number"
                        name="years_in_business"
                        value={updatedUserDetail.years_in_business}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div className="text_input">
                        <span>Monthly Revenue</span>

                        <select
                        name="monthly_revenue"
                        value={updatedUserDetail.monthly_revenue}
                        onChange={handleInputChange}
                        >
                        <option value="0">0 - 42,000</option>
                        <option value="1">42,001 - 83,000</option>
                        <option value="2">83,001 - 167,000</option>
                        <option value="3">167,001 - 417,000</option>
                        <option value="4">417,001 - 833,000</option>
                        <option value="5">833,001 - 1,700,000</option>
                        </select>
                    </div>
                        
                    <div className="save_button_div">
                        <button className="save_changes_button" type="button" onClick={handleUpdateProfile}>
                        Save Changes
                        </button>
                    </div>
                    </div>
                </div>
                </>
            )}
            </div>
        )}
        </div>
        <Footer />
    </div>
    );

};

export default UserProfile;
