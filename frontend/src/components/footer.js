
import React from "react";
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5">
      <div className="container">
        <div className="row justify-content-center mb-4">
          <div className="col-md-6">
            <p className="text-center mb-3">
              Limeroad is offered in:{" "}
              <Link to="#" className="text-primary text-decoration-none">English</Link>
            </p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <ul className="list-unstyled mb-3 text-center">
              <li><Link to="#" className="text-white text-decoration-none hover-underline">About Us</Link></li>
              <li><Link to="#" className="text-white text-decoration-none hover-underline">Team</Link></li>
              <li><Link to="#" className="text-white text-decoration-none hover-underline">Careers</Link></li>
              <li><Link to="#" className="text-white text-decoration-none hover-underline">FAQ</Link></li>
              <li><Link to="#" className="text-white text-decoration-none hover-underline">Contact Us</Link></li>
              <li><Link to="#" className="text-white text-decoration-none hover-underline">Settings</Link></li>
            </ul>
          </div>
          <div className="col-md-6 col-lg-4">
            <ul className="list-unstyled mb-3 text-center">
              <li><Link to="#" className="text-white text-decoration-none hover-underline">Orders</Link></li>
              <li><Link to="#" className="text-white text-decoration-none hover-underline">Shopping Cart</Link></li>
              <li><Link to="#" className="text-white text-decoration-none hover-underline">Terms of Use</Link></li>
              <li><Link to="#" className="text-white text-decoration-none hover-underline">Privacy Policy</Link></li>
              <li><Link to="#" className="text-white text-decoration-none hover-underline">Return Policy</Link></li>
              <li><Link to="#" className="text-white text-decoration-none hover-underline">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-4">
          <p className="mb-0">&copy; 2025 limeroad.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
