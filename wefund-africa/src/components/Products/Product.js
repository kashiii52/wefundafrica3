import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import "./Products.css";
import product_background from "../../assets/image/product_background.jpg";
import StaticNavBar from "../StaticNavBar/StaticNavBar";
import purchase_order from "../../assets/image/purchase_order.jpg";
import term_funding from "../../assets/image/term_funding.jpg";
import merchant_cash from "../../assets/image/merchant_cash.jpg";
import business_loan from "../../assets/image/business_loan.jpg";
import line_of_credit from "../../assets/image/line_of_credit.jpg";
import { useEffect } from "react";



const Products = () => {

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top when the component mounts
    }, []);
    return (
        <div className="Homepage_master_div">
        <div className="static-nav-bar">
            <StaticNavBar />
        </div>
        <div id="product_background_picture">
            <img src={product_background} />
        </div>
        <div className="product_image_heading_master">
            <div className="product_image_heading">
                Products
            </div>
        </div>
        <div>
            <Navbar showApplyNowButton={true} isDashboard={false}  />
        </div>

        <div className="product_service_background">
            <div className="product_service_offered">
                <span>products</span>
                <h2>See Latest Projects For our Client</h2>
            </div>  
        </div>
        
        <div className="products_master_div">
            <div className="products_first_row">
                <div class="image-container">
                    <img className="purchase_order_image" src={purchase_order} />
                    <div className="purchase_order_hover">
                        <button className="purchase_order_button">PO</button>
                        <div className="purchase_order_para">
                            <h2 className="purchase_order_heading">What is PO Funding?</h2>
                            <p>WeFund Africa: Empowering businesses by providing essential financial solutions, 
                                including Purchase Order Funding and Bridging Finance, to bridge short-term gaps 
                                and fulfill large orders, enabling growth and success.</p>
                            </div>
                    </div>
                </div>
                <div class="image-container">
                    <img className="term_funding_image" src={term_funding} />
                    <div className="term_funding_hover">
                        <button class="term_funding_button">Term Funding</button>
                        <div className="term_funding_para">
                            <p>Term Funding: Swift Capital for Small Businesses
                            Access capital based on recent sales, not credit score. 
                            Our quick approval process gets you funds within 24 hours. 
                            We'll establish daily payments that suit you, making financing stress-free 
                            for your business success.</p>
                            <h2 className="purchase_order_heading">How Does Term Funding Work?</h2>
                            <ul>
                            <li>Complete your application in under 5 minutes: Enter personal and business info online.</li>
                            <li>Submit your documents. We review and verify your application instantly.</li>
                            <li>Get fast approval and access your capital within 24 hours, deposited directly into your bank account for immediate use.</li>
                            </ul>

                            </div>
                    </div>
                </div>
            </div>
            <div className="products_second_row">
                <div class="image-container">
                    <img className="merchant_cash_image" src={merchant_cash} />
                    <div className="purchase_order_hover">
                    <button class="merchant_cash_button">Merchant Cash Advance</button>
                        <div className="merchant_cash_para">
                            <p>Access capital from future revenue, repaid as a percentage of daily sales. 
                                Our technology ensures quick and effective 
                                qualification based on your daily sales data.</p>
                            <h2>How Does Term Funding Work?</h2>
                            <p>Get cash effortlessly with Capital Advance - no paperwork required. Access the funds you need today.</p>
                        </div>
                    </div>
                </div>
                <div class="image-container">
                    <img className="business_loan_image" src={business_loan} />
                    <div className="purchase_order_hover">
                    <button class="business_loan_button">Business Loan</button>
                        <div className="merchant_cash_para">
                            <h2>WeFund Africa Business Loans:</h2>
                                <p>Access a lump sum for your business needs with our 
                                online business loan service. Whether you're looking to cover expenses or expand your 
                                enterprise, our flexible financing options bridge the gap for South African businesses 
                                facing cash flow challenges.</p>
                        </div>
                            </div>
                </div>
                <div class="image-container">
                    <img className="loc_image" src={line_of_credit} />
                    <div className="purchase_order_hover">
                    <button class="loc_button">Line of Credit</button>
                    <div className="merchant_cash_para">
                    <h2>Flexible Credit Access with WeFund Africa:</h2>
                        <p>Unlock continuous access to versatile working capital through WeFund Africa's 
                            revolving credit line program. Similar to a business credit card but without 
                            the physical card, our credit facility offers higher limits of up to R5 million, 
                            exclusively designed for cash withdrawals, sparing you from credit card fees.</p>
                            </div>
                            </div>
                </div>
            </div>
        </div>


        
        <Footer />
        </div>
    );
    };

export default Products;
