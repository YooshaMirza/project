import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col">
            <Link to="/" className="flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#1E40AF" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="mr-2"
              >
                <path d="m4 6 8-4 8 4"/>
                <path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2"/>
                <path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4"/>
                <path d="M18 5v17"/>
                <path d="M6 5v17"/>
                <circle cx="12" cy="9" r="2"/>
              </svg>
              <span className="text-xl font-bold text-primary-600">
                AlumniConnect
              </span>
            </Link>
            
            <p className="mt-4 text-sm text-gray-600">
              Connecting alumni across generations, fostering lifelong relationships and professional growth.
            </p>
            
            <div className="mt-6 flex space-x-4">
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-primary-600"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-primary-600"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-primary-600"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-primary-600"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-primary-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-sm text-gray-600 hover:text-primary-600">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/directory" className="text-sm text-gray-600 hover:text-primary-600">
                  Alumni Directory
                </Link>
              </li>
              <li>
                <Link to="/feed" className="text-sm text-gray-600 hover:text-primary-600">
                  Community Feed
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-sm text-gray-600 hover:text-primary-600">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Resources
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/faq" className="text-sm text-gray-600 hover:text-primary-600">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-sm text-gray-600 hover:text-primary-600">
                  Support
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-primary-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-primary-600">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-sm text-gray-600 hover:text-primary-600">
                  Donate
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <MapPin size={16} className="mr-2 mt-0.5 text-gray-400" />
                <span className="text-sm text-gray-600">
                  123 University Avenue, Academic City, ST 12345
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2 text-gray-400" />
                <span className="text-sm text-gray-600">+1 (123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2 text-gray-400" />
                <a href="mailto:contact@alumniconnect.com" className="text-sm text-gray-600 hover:text-primary-600">
                  contact@alumniconnect.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-gray-500">
            © {year} AlumniConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}