// import Footer from "../Footer/Footer";
// import Navbar from "../Navbar/Navbar";
// import { useContext, useEffect } from "react";
// import "./Forgotpassword.css";
// import StaticNavBar from "../StaticNavBar/StaticNavBar";
// import AppContext from "../utils/AppContext";


// const Forgotpassword = () => {

//     // let { loginUser } = useContext(AppContext);
//     const PasswordResetEmail = ({ resetPasswordUrl }) => {

//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, []);


//     return (
//     <div className="Homepage_master_div">
//         <div>
//         <StaticNavBar />
//         </div>    
//     <div className="login_background_picture"></div>
//         <div className="navbar_homepage">
//             <Navbar showApplyNowButton={true} isDashboard={false}  />
//         </div>
//     <div className="login_page_master_div">
//     <div className="login_page_child_div">
//         <div className="child_div_heading">Forgot Password</div>
//     <form id="inputform" onSubmit={loginUser}>
//         <div className="inputbox">
//         <input name="email" type="email" required="required" />
//         <span>Email</span>
//         </div>
//         <button id="submit_button_login" type="submit">
//         Submit
//         </button>

//     </form>
//     </div>
//     </div>
//     <div>
//         <p>You have requested a password reset. Click the link below to reset your password:</p>
//         <a href={resetPasswordUrl}>Reset Password</a>
//     </div>
//         <Footer />
//     </div>
// );
// };

// export default Forgotpassword;







// import React, { useContext, useEffect, useState } from "react";
// import "./Forgotpassword.css";
// import AppContext from "../utils/AppContext";
// import Footer from "../Footer/Footer";
// import Navbar from "../Navbar/Navbar";
// import StaticNavBar from "../StaticNavBar/StaticNavBar";
// import { useNavigate } from "react-router-dom";

// const Forgotpassword = () => {
//     const navigate = useNavigate();
//     const { loginUser } = useContext(AppContext);
//     const [resetPasswordUrl, setResetPasswordUrl] = useState("");  // State to store reset password URL
//     const [emailNotFound, setEmailNotFound] = useState(false);
//     const [popupMessage, setPopupMessage] = useState("");
//     const [showPopup, setShowPopup] = useState(false);

//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, []);

//     const handleFormSubmit = async (event) => {
//         event.preventDefault();
    
//         let response = await fetch('http://127.0.0.1:8000/password_reset/', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ email: event.target.email.value }),
//         })
//         let data = await response.json();
//         if (response.status === 200) {
//             setResetPasswordUrl(data.resetPasswordUrl);
//             setEmailNotFound(false);
//             setPopupMessage("The link has been sent to your email. Please check your email.");
//             setShowPopup(true);
//             }
//         else {
//             setPopupMessage("This email doesn't exist. Enter a correct email.");
//             setShowPopup(true);
//             }
//     };
    

//     const closePopup = () => {
//         setShowPopup(false);
//     };

//     return (
//         <div className="Homepage_master_div">
//             <div>
//                 <StaticNavBar />
//             </div>
//             <div className="login_background_picture"></div>
//             <div className="navbar_homepage">
//                 <Navbar showApplyNowButton={true} isDashboard={false} />
//             </div>
//             <div className="login_page_master_div">
//                 <div className="login_page_child_div">
//                     <div className="child_div_heading">Forgot Password</div>
//                     <form id="inputform" onSubmit={handleFormSubmit}>
//                         <div className="inputbox">
//                             <input name="email" type="email" required="required" />
//                             <span>Email</span>
//                         </div>
//                         <button id="submit_button_login" type="submit">
//                             Submit
//                         </button>
//                     </form>
//                     {emailNotFound && <p>Email doesn't exist. Please check your email and try again.</p>}
//                 </div>
//             </div>
//             <Footer />

//             {showPopup && (
//                 <div className="popup-message">
//                     <p>{popupMessage}</p>
//                     <button onClick={closePopup}>Close</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Forgotpassword;








import React, { useContext, useEffect, useState } from "react";
import "./Forgotpassword.css";
import AppContext from "../utils/AppContext";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import StaticNavBar from "../StaticNavBar/StaticNavBar";
import { useNavigate } from "react-router-dom";

const Forgotpassword = () => {
    const navigate = useNavigate();
    const { loginUser } = useContext(AppContext);
    const [resetPasswordUrl, setResetPasswordUrl] = useState("");  // State to store reset password URL
    const [emailNotFound, setEmailNotFound] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [responseStatus, setResponseStatus] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        let response = await fetch('http://127.0.0.1:8000/password_reset/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: event.target.email.value }),
        });
        setResponseStatus(response.status);
        let data = await response.json();
        if (response.status === 200) {
            setResetPasswordUrl(data.resetPasswordUrl);
            setEmailNotFound(false);
            setPopupMessage("The link has been sent to your email. Please check your email.");
            setShowPopup(true);
        } else {
            setPopupMessage("This email doesn't exist. Enter a correct email.");
            setShowPopup(true);
        }
    };

    const closePopup = () => {
        setShowPopup(false);
        if (responseStatus === 200) {
            navigate('/login');
        } else {
            window.location.reload(); // Refresh the page
        }
    };

    return (
        <div className="Homepage_master_div">
            <div>
                <StaticNavBar />
            </div>
            <div className="login_background_picture"></div>
            <div className="navbar_homepage">
                <Navbar showApplyNowButton={true} isDashboard={false} />
            </div>
            <div className="login_page_master_div">
                <div className="login_page_child_div">
                    <div className="child_div_heading">Forgot Password</div>
                    <form id="inputform" onSubmit={handleFormSubmit}>
                        <div className="inputbox">
                            <input name="email" type="email" required="required" />
                            <span>Email</span>
                        </div>
                        <button id="submit_button_login" type="submit">
                            Submit
                        </button>
                    </form>
                    {emailNotFound && <p>Email doesn't exist. Please check your email and try again.</p>}
                </div>
            </div>
            <Footer />

            {showPopup && (
                <div className="popup-message">
                    <p>{popupMessage}</p>
                    <button onClick={closePopup}>Close</button>
                </div>
            )}
        </div>
    );
};

export default Forgotpassword;

