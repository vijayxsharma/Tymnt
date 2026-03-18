import React from "react";
import { Container } from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
  FaWhatsapp,
  FaMailBulk,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SiGmail } from "react-icons/si";
import { Link } from "react-router-dom";

const TymntFooter = () => {
  return (
    <footer className="tymnt-footer text-white text-center py-4 mt-5">
      <Container style={{ maxWidth: "900px" }}>
        
        <h2 className="fw-bold mb-3">Tymnt<span style={{color:"yellow"}}>.</span> </h2>

        <p className="lead mb-4">
          Turn Your Time Into Opportunity.
        </p>

        <p className="small opacity-75 mb-4">
          Tymnt is a human-powered marketplace where people buy, sell, and
          trade time-based services — creating income, support, and
          opportunity for everyone.
        </p>

        <div className="d-flex justify-content-center flex-wrap gap-4 mb-4 small">
          <Link to="/" className="footer-link">Home</Link>
          <Link to="/services" className="footer-link">Services</Link>
          <Link to="/about" className="footer-link">About</Link>
          <Link to="/contact" className="footer-link">Contact</Link>
          <Link to="/privacy" className="footer-link">Privacy</Link>
        </div>

        <div className="d-flex justify-content-center gap-4 mb-4 fs-5">
          <Link to="https://www.linkedin.com/in/vijayxsharma/" className="social-icon"><FaLinkedinIn /></Link>
          <Link to="https://github.com/vijayxsharma" className="social-icon"><FaGithub /></Link>
          <Link to="mailto:vijaykumar8700sharma@gmail.com" className="social-icon"><SiGmail /></Link>
          <Link to="https://wa.me/918700255488" className="social-icon"><FaWhatsapp /></Link>
        </div>

        <hr className="border-light opacity-25" />

        <p className="small opacity-75 mt-3">
          © {new Date().getFullYear()} Tymnt. All Rights Reserved.
        </p>

      </Container>

      {/* CSS */}
      <style>{`
        .tymnt-footer {
          background: rgb(27, 104, 213);
        }

        .footer-link {
          color: #ffffff;
          text-decoration: none;
          transition: 0.3s ease;
        }

        .footer-link:hover {
          color: #ffd700;
          transform: translateY(-2px);
        }

        .social-icon {
          color: #ffffff;
          transition: 0.3s ease;
        }

        .social-icon:hover {
          color: #ffd700;
          transform: scale(1.2);
        }
      `}</style>
    </footer>
  );
};

export default TymntFooter;
