import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { useContext, useEffect } from "react";
import "./Login.css";
import StaticNavBar from "../StaticNavBar/StaticNavBar";
import AppContext from "../utils/AppContext";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {

    let { loginUser } = useContext(AppContext);

    let navigate = useNavigate();
    const forgothandle = () => {
        navigate('/forgot')
    }

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
    <form id="inputform" onSubmit={loginUser}>
        <div className="inputbox">
        <input name="email" type="email" required="required" />
        <span>Email</span>
        </div>
        <div className="inputbox">
        <input name="password" type="password" required="required" />
        <span>Password</span>
        </div>
        <button id="submit_button_login" type="submit">
        {/* {authloader ? <span id="authloader"></span> : <>LOGIN</>} */}
        Login
        </button>
        <div className="forget_password" onClick={forgothandle}><span>Forget Password</span></div>

    </form>
    </div>
    </div>
        <Footer />
    </div>
);
};

export default LoginPage;


