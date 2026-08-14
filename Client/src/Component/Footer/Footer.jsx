import React from 'react'
import "./Footer.css"
import {logo,Instagram_icon,Facebook_icon,Twitter_icon,Linkedin_icon} from "../../assets/assets"
function Footer() {
  return (
    <div className="footer" id="footer">
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={logo} alt="Logo" />
                <p>Foodie Haven is your go-to destination for delicious meals delivered right to your doorstep. We offer a wide variety of cuisines, from local favorites to international delights, all prepared with the freshest ingredients. Whether you're craving a quick snack or a full-course meal, Foodie Haven has got you covered. Experience the convenience of online ordering and enjoy your favorite dishes without leaving the comfort of your home.</p>
                 <div className="footer-social-icons">
                    <img src={Instagram_icon} alt="Instagram" /> 
                    <img src={Twitter_icon} alt="Twitter" /> 
                    <img src={Facebook_icon} alt="Facebook" /> 
                    <img src={Linkedin_icon} alt="Linkedin" /> 
                 </div>
            </div>
            <div className="footer-content-center">
              <h2>COMPANY</h2>
              <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div className="footer-content-right">
              <h2>GET IN TOUCH</h2>
              <ul>
                <li>+91 845492####</li>
                <li>contact@hungryhop.com</li>
              </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright © 2026 HungryHop. All rights reserved.</p>
    </div>
  )
}

export default Footer