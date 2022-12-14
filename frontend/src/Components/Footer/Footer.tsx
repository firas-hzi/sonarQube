import './Footer.css'
import logo from '../../Assets/ecommercelogos.png'
import { Link } from 'react-router-dom';
export const Footer:React.FC = () => {
        return (
          
            <footer className="footer">

<div className="footerAddress">
            <img className="footerLogo" src={logo} />
            </div>

            <div className="footerAddress">      
            <br/>            
              <h2>Contact Us</h2>
             
              <address>
              <p>Address: xyz Ave 45212, MI</p>
                <p>Email: support@ecommerce.com</p>
                <p>Phone: 313-585-5914</p>
                    
              </address>
            </div>

           
            
            <ul className="footerNav">
              <li className="navItem">
                <h2 className="navTitle">Pages</h2>
          
                <ul className="navUl">
                  <li>
                    <Link to="/shop">Shop</Link>
                  </li>
          
                  <li>
                      <Link to="/cart">Cart</Link>
                  </li>
                      
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                </ul>
              </li>
              
             
             

              
              <li className="navItem">
                <h2 className="navTitle">Legal</h2>
                
                <ul className="navUl">
                  <li>
                    <a>Privacy Policy</a>
                  </li>
                  
                  <li>
                    <a>Terms of Use</a>
                  </li>
                  
                  <li>
                    <a>Sitemap</a>
                  </li>
                </ul>
              </li>
            </ul>
            
            <div className="legal">
              <p>&copy; 2022 Ecommerce. All rights reserved.</p>
              
             
            </div>
          </footer>
      
        );
    }    
export default Footer