import { Link } from 'react-router-dom';
import { FaHeart, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">FindPerson</h3>
            <p className="text-gray-300 text-sm">
              Dedicated to helping families find their missing loved ones through community support and awareness.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors duration-200">Home</Link></li>
              <li><Link to="/missing" className="text-gray-300 hover:text-white transition-colors duration-200">Missing Persons</Link></li>
              <li><Link to="/report" className="text-gray-300 hover:text-white transition-colors duration-200">Report Missing</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Safety Tips</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Support Groups</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Law Enforcement</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <FaPhone className="text-gray-400" />
                <span className="text-gray-300">Emergency: 911</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaEnvelope className="text-gray-400" />
                <a href="mailto:help@findperson.org" className="text-gray-300 hover:text-white transition-colors duration-200">help@findperson.org</a>
              </li>
              <li className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-gray-400" />
                <span className="text-gray-300">City Center, USA</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            &copy; {currentYear} FindPerson. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 flex items-center">
            Made with <FaHeart className="text-red-500 mx-1" /> for families
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;