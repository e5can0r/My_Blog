import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-between gap-8">
          {/* Logo and Copyright */}
          
          <div className="w-full md:w-1/3">
            <div className="mb-4">
              {/* <Logo width="120px" /> */}
              <Link to="/" className="flex items-center space-x-3">
                          {/* Icon */}
                          <svg className="w-[48px] h-[48px] text-gray-200 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                          <path fill-rule="evenodd" d="M15.514 3.293a1 1 0 0 0-1.415 0L12.151 5.24a.93.93 0 0 1 .056.052l6.5 6.5a.97.97 0 0 1 .052.056L20.707 9.9a1 1 0 0 0 0-1.415l-5.193-5.193ZM7.004 8.27l3.892-1.46 6.293 6.293-1.46 3.893a1 1 0 0 1-.603.591l-9.494 3.355a1 1 0 0 1-.98-.18l6.452-6.453a1 1 0 0 0-1.414-1.414l-6.453 6.452a1 1 0 0 1-.18-.98l3.355-9.494a1 1 0 0 1 .591-.603Z" clip-rule="evenodd"/>
                          </svg>
                          {/* Title + Tagline */}
                          <div className="flex flex-col leading-tight">
                          <span className="text-2xl font-bold text-gray-200 tracking-wide">MyBlog</span>
                          <span className="text-sm text-gray-200 -mt-1">Write. Share. Inspire.</span>
                          </div>
                          </Link>
            </div>
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} DevUI. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-10 w-full md:w-2/3 justify-end">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Company
              </h3>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-white">Features</Link></li>
                <li><Link to="/" className="hover:text-white">Pricing</Link></li>
                <li><Link to="/" className="hover:text-white">Affiliate Program</Link></li>
                <li><Link to="/" className="hover:text-white">Press Kit</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Support
              </h3>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-white">Account</Link></li>
                <li><Link to="/" className="hover:text-white">Help</Link></li>
                <li><Link to="/" className="hover:text-white">Contact Us</Link></li>
                <li><Link to="/" className="hover:text-white">Customer Support</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Legal
              </h3>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-white">Terms & Conditions</Link></li>
                <li><Link to="/" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/" className="hover:text-white">Licensing</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
