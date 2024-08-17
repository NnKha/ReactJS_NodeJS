export default function Footer() {
     return (
          <>
               <footer className="container-fluid bg-dark ">
                    <div className="footer">
                         <div className="footer-content d-flex justify-content-between ">
                              <div className="footer-column">
                                   <h3>
                                        About Us
                                   </h3>
                                   <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed volutpat semper ultricies.
                                   </p>
                              </div>
                              <div className="footer-column">
                                   <h3>
                                        Quick Links
                                   </h3>
                                   <ul>
                                        <li>
                                             <a href="#">
                                                  Home
                                             </a>
                                        </li>
                                        <li>
                                             <a href="#">
                                                  Products
                                             </a>
                                        </li>
                                        <li>
                                             <a href="#">
                                                  About Us
                                             </a>
                                        </li>
                                        <li>
                                             <a href="#">
                                                  Contact Us
                                             </a>
                                        </li>
                                   </ul>
                              </div>
                              <div className="footer-column">
                                   <h3>
                                        Contact
                                   </h3>
                                   <p>
                                        123 Main Street, City, Country
                                   </p>
                                   <p>
                                        Email: info@example.com
                                   </p>
                                   <p>
                                        Phone: 123-456-7890
                                   </p>
                              </div>
                         </div>
                         <div className="footer-bottom">
                              <p>
                                   © All rights reserved.
                              </p>
                         </div>
                    </div>
               </footer>
          </>
     )
}