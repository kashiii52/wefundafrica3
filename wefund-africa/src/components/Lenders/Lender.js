import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import "./Lender.css";
import lender_background from "../../assets/image/lender_background.jpg";
import StaticNavBar from "../StaticNavBar/StaticNavBar";
import { BiSolidTimeFive } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { FaProjectDiagram } from "react-icons/fa";
import { MdOutlineAccountBalance } from "react-icons/md";
import { FaMoneyBill } from "react-icons/fa";
import { PiSirenFill } from "react-icons/pi";
import { MdAssessment } from "react-icons/md";
import { useEffect } from "react";



const Lender = () => {
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top when the component mounts
    }, []);
    return (
        <div className="Homepage_master_div">
        <div className="static-nav-bar">
            <StaticNavBar />
        </div>
        <div id="lender_background_picture">
            <img src={lender_background} />
            <span>Utilize Our Tech And Expertise For Optimal Results
            </span>
        </div>
        <div>
            <Navbar showApplyNowButton={true} isDashboard={false}  />
        </div>
        
        
        <div className="lender_master_div">
            <div className="card_master">
            <div className="lender_single_card">
                <BiSolidTimeFive className="lender_cards_icons" />
                <h3>Quantity Surveyor</h3>
                <span>A quantity surveyor is a construction industry 
                    professional with expert knowledge on construction costs and contracts.</span>
            </div>
            <div className="lender_single_card">
                <FaUsers className="lender_cards_icons" />
                <h3>Real Estate Agents</h3>
                <span>A real estate broker, real estate agent or realtor is a person who represents sellers or buyers of real estate or real property.</span>
            </div>
            <div className="lender_single_card">
                <FaProjectDiagram className="lender_cards_icons" />
                <h3>Project Manager</h3>
                <span>A project manager is a professional in the field of project management. Project managers have the responsibility of the planning, procurement and execution of a project.</span>
            </div>
            <div className="lender_single_card">
                <MdAssessment className="lender_cards_icons" />
                <h3>Valuer</h3>
                <span>Is someone whose job is to estimate the cost or value of something, for example a house, or objects that are going to be sold in an auction.</span>
            </div>
            <div className="lender_single_card">
                <MdOutlineAccountBalance className="lender_cards_icons" />
                <h3>Accountants</h3>
                <span>An accountant is a practitioner of accounting or accountancy.</span>
            </div>
            <div className="lender_single_card">
                <FaMoneyBill className="lender_cards_icons" />
                <h3>Finance Brokers</h3>
                <span>Is a firm or a person who does operations with financial assets and executes financial transactions.</span>
            </div>
            <div class="lender_single_card">
                <PiSirenFill className="lender_cards_icons" />
                <h3>Solicitors</h3>
                <span>A solicitor is a legal practitioner who traditionally deals with most of the legal matters in some jurisdictions.</span>
            </div>
            </div>
        </div>


        
        <Footer />
        </div>
    );
    };

export default Lender;
