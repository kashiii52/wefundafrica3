import "./Navbar.css";
import { useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import tl_logo from "../../assets/image/seethrough.png";
import { useLocation, useNavigate } from "react-router-dom";
import { BsGearFill } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";

const Navbar = ({color, showApplyNowButton, isDashboard }) => {
  const [showProductsMenu, setShowProductsMenu] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const isHomepage = location.pathname === "/";

  const handleButtonClick = (path) => {
    if (!isHomepage) {
      navigate(path);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };


  return (
    // <div className={`navbar_master_div ${isScrolled ? "navbar_scrolled" : ""}`}>
    <div className={`navbar_master_div ${isScrolled ? "navbar_scrolled" : ""} ${isDashboard ? "navbar_dashboard" : ""}`}>
      <div className="navbar_component">
        <div className="navbar_log">
          <img src={tl_logo} alt="logo" />
        </div>

        {/* <div className="navbar_buttons"> */}
        <div className={`navbar_buttons ${isDashboard ? "black_background" : ""}`}>
          <button className="menu_button" onClick={toggleDropdown}>
            MENU <FiMenu className="menu_icon" />
          </button>

          <div className={`navbar_button ${color}`} onClick={() => handleButtonClick("/")}>
            <FaHome className="navbar_home_icon" />
            Home
          </div>
          <div className="navbar_button" onClick={() => navigate("/lenders")}>
            <FaHome className="navbar_home_icon" />
          Lenders</div>

          {isDropdownVisible && (
            <ul className="dropdown_menu">
              <li onClick={() => navigate("/")}>Home</li>
              <li onClick={() => navigate("/lenders")}>Lenders</li>
              <li onClick={() => navigate("/products")}>Products</li>
              <li onClick={() => navigate("/process")}>Process</li>
              <li onClick={() => navigate("/login")}>Log In</li>
              <li onClick={() => navigate("/register")}>Apply now</li>
            </ul>
          )}
          <div
            className="navbar_button"
            onClick={() => navigate("/products")}
          >
            <FaHome className="navbar_home_icon" />
            Products
          </div>
          <div className="navbar_button" onClick={() => navigate("/process")}>
            <BsGearFill className="navbar_process_icon" />
            <span>Process</span>
          </div>

          {showApplyNowButton && (
          <div className="navbar_button" onClick={() => navigate("/login")}>
            <BiLogIn className="navbar_home_icon" />
            Log in
          </div>
          )}
          <div>
            <BsSearch className="search_icon" />
          </div>
          {/* <div className="apply_button_container" onClick={() => navigate("/register")}>Apply now</div> */}

          {showApplyNowButton && (
            <div
              className="navbar_button apply_button_container"
              onClick={() => navigate("/register")}
            >
              Apply now
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
