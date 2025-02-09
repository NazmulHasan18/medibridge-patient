import React from "react";

const Footer = () => {
   return (
      <footer className="bg-gray-900 text-white">
         <div className="container p-10 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {/* Hospital Info */}
               <div className="md:col-span-2 lg:col-span-1">
                  <h3 className="text-xl font-semibold mb-4">About Us</h3>
                  <p className="text-sm">
                     We are a healthcare provider dedicated to offering affordable and accessible medical
                     services to those in need. Our mission is to provide compassionate care that improves the
                     health and well-being of our community.
                  </p>
               </div>

               {/* Quick Links */}
               <div>
                  <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                  <ul className="space-y-2 text-sm">
                     <li>
                        <a href="#" className="hover:text-pink-400">
                           Home
                        </a>
                     </li>
                     <li>
                        <a href="#about" className="hover:text-pink-400">
                           About
                        </a>
                     </li>
                     <li>
                        <a href="#services" className="hover:text-pink-400">
                           Services
                        </a>
                     </li>
                     <li>
                        <a href="#contact" className="hover:text-pink-400">
                           Contact Us
                        </a>
                     </li>
                     <li>
                        <a href="#careers" className="hover:text-pink-400">
                           Careers
                        </a>
                     </li>
                  </ul>
               </div>

               {/* Contact Info */}
               <div>
                  <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                  <ul className="text-sm space-y-2">
                     <li>
                        <i className="fas fa-map-marker-alt"></i> 123 Main Street, City, Country
                     </li>
                     <li>
                        <i className="fas fa-phone"></i> +123 456 7890
                     </li>
                     <li>
                        <i className="fas fa-envelope"></i> support@hospital.com
                     </li>
                  </ul>
               </div>
            </div>

            {/* Bottom Footer */}
            <div className="text-center mt-8">
               <p className="text-sm">&copy; 2025 Medibridge. All rights reserved.</p>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
