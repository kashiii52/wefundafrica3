import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./HomePage.css";
import { useState, useEffect } from "react";
import homepage_picture from "../../assets/image/Homepage Picture.jpg";
import business_expansion from "../../assets/image/business_expansion.svg";
import pay_supplier from "../../assets/image/pay_supplier.svg";
import inventory from "../../assets/image/inventory.svg";
import mogapi from "../../assets/image/mogapi.png";
import corporate from "../../assets/image/corporate.png";
import matoto from "../../assets/image/matoto.png";
import cyberdock from "../../assets/image/cyberdock.png";
import StaticNavBar from "../StaticNavBar/StaticNavBar";
import { IoIosArrowRoundForward } from "react-icons/io";

const scrollToHeight = () => {
  window.scrollTo({
      top: 850,
      behavior: 'smooth',
  });
};

const HomePage = () => {
  const [serviceIconVisible, setServiceIconVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const serviceSection = document.querySelector(".service_offered");
      if (serviceSection) {
        const rect = serviceSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        setServiceIconVisible(isVisible);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  return (
    <div className="Homepage_master_div">
      <div className="static-nav-bar">
        <StaticNavBar />
      </div>
      <div className="homepage_background_picture">
        <img src={homepage_picture} />
        <span>Find Your Dream Funding Plan Today</span>
      </div>
      <div className="check_service_master">
        <div className="check_our_service_button" onClick={scrollToHeight}>
          Check Our Services

          {/* <div> */}
          {/* <button onClick={scrollToBottom}>Scroll Down</button> */}
            {/* Content of your page */}
          {/* </div> */}
          <IoIosArrowRoundForward className="forward_icon" />
        </div>
      </div>
      <div className="navbar_homepage">
        <Navbar showApplyNowButton={true} isDashboard={false}  />
      </div>

      <div className="service_background">
        <div className="service_offered">
          <span>services</span>
          <h2>Check some of the services we offer at Wefund Africa</h2>
        </div>

        <div className="cards_div">
          <div className="single_card">
            <div className="card_image">
              <img src={business_expansion} />
            </div>
            <div className="card_text">Business expansion</div>
          </div>
          <div className="single_card">
            <div className="card_image">
              <img src={pay_supplier} />
            </div>
            <div className="card_text">Pay Supplier</div>
          </div>
          <div className="single_card">
            <div className="card_image">
              <img src={inventory} />
            </div>
            <div className="card_text">Inventory</div>
          </div>
        </div>
      </div>
      <div className="brand_strategy_container">
        <div className="brand_strategy_img">
          <div className="brand_strategy_span">
            <div className="brand_strategy_title">
              Elevate Your Business with Strategic Vision and Impact
            </div>
            <div className="brand_strategy_paragrpah">
              Feel free to reach out to us if you find yourself in need of
              assistance with a loan scenario or if you wish to delve deeper
              into understanding the intricacies of Wefund. Our dedicated team
              is eager to engage in thoughtful discussions, helping you navigate
              through various loan scenarios and shedding light on the
              comprehensive services that Wefund offers.
              <br></br>
              <br></br>
            </div>
          </div>
        </div>
      </div>

      <div className="background">
        <div className="choose_us">
          <span>WHY CHOOSE US</span>
          <h2>Wefund: Revolutionizing African Finance</h2>
        </div>
        <div className="choose_us_paragraph">
          Wefund bridges Africa's development financing gap with cutting-edge
          technology, data-driven insights, and unparalleled expertise. Our
          transparent, competitive solutions set new market standards,
          redefining possibilities in Property & Development finance.
        </div>
      </div>

      <div className="trust_logo">
      <div className="trust_logo_grid_container">
        <img src={mogapi} />
        <img src={corporate} />
        <img src={matoto} />
        <img src={cyberdock} />
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
