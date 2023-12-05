import React, { useContext, useState } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import StaticNavBar from "../StaticNavBar/StaticNavBar";
import AppContext from "../utils/AppContext";
import { useNavigate } from "react-router-dom";

const ApplyNow = () => {

  const [authLoader, setAuthLoader] = useState(false);
  
  const backendRoot =
    "http://54.236.11.151:8000";

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!authLoader) {
      setAuthLoader(true);

      const formData = new FormData(e.target);

      try {
        let response = await fetch(`${backendRoot}/register/`, {
          method: "POST",
          body: formData,
        });
        let data = await response.json();
        console.log(data);
        console.log("before if condition");
        if (response.status === 201) {
            console.log("User successfully register")
            navigate("/login");
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
      </div>
      <div className="login_background_picture"></div>
      <div className="navbar_homepage">
        <Navbar />
      </div>

      <div className="login_page_master_div">
        <div className="login_page_child_div">
          <div className="register_div_heading">Register a new account</div>
          <form id="inputform" onSubmit={handleSubmit}>
          <div className="inputbox">
            <input name="username" type="text" required="required" />
            <span>Company Name</span>
            </div>
          <div className="inputbox">
            <input name="email" type="email" required="required" />
            <span>Email</span>
            </div>
        <div className="inputbox">
        <input name="password" type="password" required="required" />
        <span>Password</span>
        </div>
        <div className="inputbox">
        <input name="confirm_password" type="password" required="required" />
        <span>Confirm Password</span>
        </div>
        <div className="inputbox">
        <input name="first_name" type="text" required="required" />
        <span>First name</span>
        </div>
        <div className="inputbox">
        <input name="last_name" type="text" required="required" />
        <span>Last name</span>
        </div>
        <div className="inputbox">
        <input name="phone_number" type="tel" required="required" />
        <span>Phone number</span>
        </div>
        {/* <div className="inputbox">
            <span>Upload an image</span>
            <input className="choose_image" name="image" type="file" accept="image/*" required="required" />
        </div> */}



      <div className="inputbox">
            <input name="image" type="file" accept="image/*" required="required" />
            {/* <span>Upload an image</span> */}
          </div>

          {/* Add years_in_business input */}
          <div className="inputbox">
            <input name="years_in_business" type="number" required="required" />
            <span>Years in Business</span>
          </div>

          {/* Add monthly_revenue select */}
          <div className="inputbox">
            <select name="monthly_revenue" required="required">
              <option value="0">0 - 42,000</option>
              <option value="1">42,001 - 83,000</option>
              <option value="2">83,001 - 167,000</option>
              <option value="3">167,001 - 417,000</option>
              <option value="4">417,001 - 833,000</option>
              <option value="5">833,001 - 1,700,000</option>
            </select>
            <span>Monthly Revenue</span>
          </div>



            <button id="submit_button_login" type="submit">
              {authLoader ? <span id="authloader"></span> : "Register"}
            </button>
            <div className="forget_password">
              <span>Forget Password</span>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ApplyNow;
