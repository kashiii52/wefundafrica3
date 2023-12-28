import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { useContext, useEffect } from "react";
import "./Passwordreset.css";
import StaticNavBar from "../StaticNavBar/StaticNavBar";


const Passwordreset = () => {



    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
    <div className="Homepage_master_div">
        <div>
        <StaticNavBar />
        </div>    
    <div className="login_background_picture"></div>
        <div className="navbar_homepage">
            <Navbar showApplyNowButton={true} isDashboard={false}  />
        </div>

    <div className="login_page_master_div">
    <div className="login_page_child_div">
        <div className="child_div_heading">Password Reset</div>
    <form id="inputform" onSubmit={''}>
        <div className="inputbox">
        <input name="password" type="password" required="required" />
        <span>Password</span>
        </div>
        {/* <div className="inputbox">
        <input name="password" type="password" required="required" />
        <span>Re confirm password</span>
        </div> */}
        <button id="submit_button_login" type="submit">
        Submit
        </button>

    </form>
    </div>
    </div>
        <Footer />
    </div>
);
};

export default Passwordreset;


