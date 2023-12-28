import "./Footer.css";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { MdLocationPin } from "react-icons/md";
import tl_logo from "../../assets/image/seethrough_footer.png";
import { useLocation, useNavigate } from "react-router-dom";


const Footer = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const isHomepage = location.pathname === "/";
  const handleLogin = () => {
    navigate('/login')
  }

  const handleButtonClick = (path) => {
    if (!isHomepage) {
      navigate(path);
    }
  };


  return (
    <div className="footer_master_div">
      <div className="inside_master_div">
        <div className="logo_number_email_icon">
          <div className="footer_logo">
            <img src={tl_logo} />
          </div>
          <div className="company_vision">
            <p>WeFund Africa</p>
          </div>
          <div className="footer_number">
            <span>0860 767 067</span>
          </div>
          <div className="footer_email">
            <span>info@wefund.africa</span>
          </div>
          <div className="footer_icons">
            <BsFacebook />
            <BsInstagram />
            <BsTwitter />
            <BsLinkedin />
          </div>
        </div>
        <div className="footer_navigation">
          <div className="navigation_title">
            <h4>Navigation</h4>
          </div>
          <div className="footer_navigation_link">
            <a onClick={() => navigate('/')}>Home</a>
            <a onClick={() => navigate('/lenders')}>Lenders</a>
            <a onClick={() => navigate('/products')}>Products</a>
            <a onClick={() => navigate("/process")}>Process</a>
            <a  onClick={handleLogin}>Log In</a>
          </div>
        </div>

        <div className="footer_navigation">
          <div className="navigation_title">
            <h4>Services</h4>
          </div>
          <div className="footer_navigation_link">
            <a>Business expression</a>
            <a>Pay supplier</a>
            <a>Inventory</a>
            {/* <a>Process</a>
            <a>Log In</a> */}
          </div>
        </div>
      </div>

      <div className="footer_border_external"><div className="footer_border_line"></div></div>

      <div className="footer_copyright_social_icons">
        {/* <div className="footer_title">
          Copyright © 2021 Member of Matoto Group Of Companies | Powered by
          Matoto Technologies
        </div> */}
        <div className="footer_title">
        <a href="https://www.freshfarms.co.za/">Copyright © 2021 Member of Matoto Group Of Companies | 
          Powered by Matoto Technologies</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
