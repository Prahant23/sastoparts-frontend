import React from 'react';
import logo from "../assets/images/logo.png";
import img1 from "../assets/images/img1.png";
import img2 from "../assets/images/img2.png";
import img3 from "../assets/images/img3.png";
import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-logo'>
        <img src={logo} alt="logo" />
      </div>
      <div className='footer-description'>
        <p>Sasto parts is the best parts shop for your bike<br />
          accessories. What kind of parts do you need<br />
          you can get here soluta nobis</p>
      </div>
      <div className='footer-info'>
        <div className='footer-contact'>
          <h5>Baneshwor, Kathmandu</h5>
          <h5>sastoparts23@gmail.com</h5>
        </div>
        <div className='footer-social'>
          <img src={img1} alt="img1" />
          <img src={img2} alt="img2" />
          <img src={img3} alt="img3" />
        </div>
      </div>
    </footer>
  )
}

export default Footer;
