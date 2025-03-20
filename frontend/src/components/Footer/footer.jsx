import React from "react";
const Footer = () => {
    return (
      <footer className="w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 gap-y-8 md:gap-8 py-10 max-w-sm mx-auto sm:max-w-3xl lg:max-w-full">
            {/* Logo Section */}
            <div className="col-span-full mb-10 lg:col-span-2 lg:mb-0">
            <a href="/" className="flex items-center space-x-3">
          <img src="/images/logo1.png" className="h-10" alt="myAster Logo" />
          
        </a>
              <p className="py-8 text-sm text-gray-500 lg:max-w-xs text-center lg:text-left">
                Trusted by 1000+ customers around the country?
              </p>
              <a
                href="javascript:;"
                className="py-2.5 px-5 h-9 block w-fit bg-blue-700 rounded-full shadow-sm text-xs text-white mx-auto transition-all duration-500 hover:bg-blue-800 lg:mx-0"
              >
                Contact us
              </a>
            </div>
            {/* Pagedone Section */}
            <div className="lg:mx-auto text-left">
              <h4 className="text-lg text-gray-900 font-medium mb-7">myAster</h4>
              <ul className="text-sm transition-all duration-500">
                <li className="mb-6">
                  <a href="javascript:;" className="text-gray-600 hover:text-gray-900">
                    Home
                  </a>
                </li>
                <li className="mb-6">
                  <a href="javascript:;" className="text-gray-600 hover:text-gray-900">
                    About
                  </a>
                </li>
                <li>
                  <a href="javascript:;" className="text-gray-600 hover:text-gray-900">
                    Products
                  </a>
                </li>
              </ul>
            </div>
            {/* Products Section */}
            <div className="lg:mx-auto text-left">
              <h4 className="text-lg text-gray-900 font-medium mb-7">Doctors</h4>
              <ul className="text-sm transition-all duration-500">
                <li className="mb-6">
                
                </li>
                <li className="mb-6">
                  <a href="javascript:;" className="text-gray-600 hover:text-gray-900">
                    Specialities
                  </a>
                </li>
                <li>
                  <a href="javascript:;" className="text-gray-600 hover:text-gray-900">
                    Consultation
                  </a>
                </li>
              </ul>
            </div>
            {/* Support Section */}
            <div className="lg:mx-auto text-left">
              <h4 className="text-lg text-gray-900 font-medium mb-7">Support</h4>
              <ul className="text-sm transition-all duration-500">
                <li className="mb-6">
                  <a href="javascript:;" className="text-gray-600 hover:text-gray-900">
                    Customer Support
                  </a>
                </li>
                <li className="mb-6">
                  <a href="javascript:;" className="text-gray-600 hover:text-gray-900">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="javascript:;" className="text-gray-600 hover:text-gray-900">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            {/* Subscribe Section */}
            <div className="lg:mx-auto text-left">
              <h4 className="text-lg text-gray-900 font-medium mb-7">Subscribe</h4>
              <p className="text-sm text-gray-500 leading-6 mb-7">
                Subscribe to get the latest news from us
              </p>
        
            </div>
          </div>
          {/* Footer Bottom Section */}
          <div className="py-7 border-t border-gray-200">
            <div className="flex items-center justify-center flex-col lg:justify-between lg:flex-row">
              <span className="text-sm text-gray-500">
                ©<a >myAster</a> 2025, All rights reserved.
              </span>
              
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  