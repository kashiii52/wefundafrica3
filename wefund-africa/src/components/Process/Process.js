import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import "./Process.css";
import lender_assessment from "../../assets/image/lender_assessment.svg";
import fill_application from "../../assets/image/fill_application.svg";
import contract from "../../assets/image/contract.svg";
import accept_offer from "../../assets/image/accept_offer.svg";
import agreement from "../../assets/image/agreement.svg";
import StaticNavBar from "../StaticNavBar/StaticNavBar";
import process_background from "../../assets/image/process_background.jpg";
import { FaHandPointDown } from "react-icons/fa";
import process_assessment from  "../../assets/image/process_assessment.jpg";
import process_view_offers from "../../assets/image/process_view_offers.jpg";
import { useEffect } from "react";


const Process = () => {

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the component mounts
}, []);
  return (
    <div className="Homepage_master_div">
      <div className="static-nav-bar">
        <StaticNavBar />
      </div>
      <div id="process_background_picture">
        <img src={process_background} />
        {/* <span>Find Your Dream Funding Plan Today</span> */}
      </div>
      <div className="process_image_heading_master">
            <div className="process_image_heading">
                Our Process

                <div className="hand_icon">
                <FaHandPointDown  />
                </div>
            </div>
        </div>
      <div>
        <Navbar showApplyNowButton={true} isDashboard={false}  />
      </div>
      
      <div className="process_master_div">
      <div className="application_process">
        <div className="fill_application_external">
          <div className="fill_application_text">
            <h2>Fill out one simple application
            </h2>
            <span>Begin by completing an easy-to-use application form to initiate the welfare process.</span>
          </div>
          <div className="fill_application_image">
            <img src={fill_application} />
          </div>
        </div>

        <div className="view_offer_external">
        <div className="view_application_image">
            <img className="view_offers" src={process_view_offers} />
          </div>
          <div className="view_application_text">
            <h2>View Your Offers
            </h2>
            <span>Access and review welfare assistance options available to you based on your application.</span>
          </div>
        </div>

        <div className="fill_application_external">
          <div className="fill_application_text">
            <h2>Lender Selection and Evaluation
            </h2>
            <span>Involves choosing a preferred lender, whether one or more, and assessing their suitability for your needs within the borrowing process.</span>
          </div>
          <div className="fill_application_image">
            <img className="lender" src={lender_assessment} />
          </div>
        </div>

        <div className="view_offer_external">
        <div className="view_application_image">
            <img className="process_assessment" src={process_assessment} />
          </div>
          <div className="view_application_text">
            <h2>WeFund assessment
            </h2>
            <span>An evaluation phase where your application undergoes financial scrutiny and verification.</span>
          </div>
        </div>

        <div className="fill_application_external">
        
          <div className="fill_application_text">
            <h2>Contract review
            </h2>
            <span>Carefully review the terms and conditions of the welfare agreement.</span>
          </div>
          <div className="fill_application_image">
            <img src={contract} />
          </div>
        </div>


        <div className="view_offer_external">
        <div className="view_application_image">
            <img className="accept_offer" src={accept_offer} />
          </div>
          <div className="view_application_text">
            <h2>Finalize your application and accept offer
            </h2>
            <span>Complete any remaining steps to secure your welfare assistance.</span>
          </div>
          
        </div>

        <div className="fill_application_external">
        
          <div className="fill_application_text">
            <h2>Agreement signing
            </h2>
            <span>Officially sign the welfare agreement to start receiving assistance.</span>
          </div>
          <div className="fill_application_image">
            <img className="agreement_img" src={agreement} />
          </div>
        </div>
      </div>
      </div>


      
      <Footer />
    </div>
  );
};

export default Process;
