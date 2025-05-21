import { Link } from 'react-router-dom';
import { FaSearch, FaUserPlus, FaInfoCircle, FaHandHoldingHeart } from 'react-icons/fa';

const HomePage = ({ missingPersonsCount = 0 }) => {
  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="relative bg-blue-800 text-white rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-800 opacity-90"></div>
        <div className="relative z-10 py-16 px-8 md:py-24 md:px-12 max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Help Find Missing Loved Ones
          </h1>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed">
            Join our community effort to reunite families and locate missing individuals.
            Every report can make a difference.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/report" className="bg-white text-blue-800 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg shadow-md transition-colors duration-200 w-full sm:w-auto">
              Report Missing Person
            </Link>
            <Link to="/missing" className="bg-blue-700 hover:bg-blue-600 px-8 py-3 rounded-lg font-semibold text-lg shadow-md transition-colors duration-200 w-full sm:w-auto">
              View Missing Persons
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">Current Missing Persons</h2>
            <div className="flex justify-center mt-4">
              <div className="bg-blue-50 text-blue-800 text-4xl font-bold px-8 py-4 rounded-lg">
                {missingPersonsCount}
              </div>
            </div>
            <p className="mt-4 text-gray-600">
              These individuals need your help. Every share, every report matters.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <div className="text-blue-800 text-xl font-semibold">Report</div>
              <p className="mt-2 text-gray-600">
                Create a detailed report with photos and information
              </p>
            </div>
            <div className="bg-amber-50 p-6 rounded-lg text-center">
              <div className="text-amber-700 text-xl font-semibold">Share</div>
              <p className="mt-2 text-gray-600">
                Spread the word to help reach more people
              </p>
            </div>
            <div className="bg-emerald-50 p-6 rounded-lg text-center">
              <div className="text-emerald-700 text-xl font-semibold">Connect</div>
              <p className="mt-2 text-gray-600">
                Get notifications when there are updates
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUserPlus className="text-blue-800 text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 1</h3>
            <p className="text-gray-600">Create a detailed report with all available information</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaInfoCircle className="text-blue-800 text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 2</h3>
            <p className="text-gray-600">Provide clear photos and identifying details</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaSearch className="text-blue-800 text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 3</h3>
            <p className="text-gray-600">Our community and partners help look for matches</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaHandHoldingHeart className="text-blue-800 text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 4</h3>
            <p className="text-gray-600">Receive notifications when there are potential leads</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-8 rounded-xl">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Help?</h2>
          <p className="text-lg mb-6">
            Your contribution can make a significant difference in reuniting families.
            Start by reporting a missing person or checking the existing reports.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/report" className="bg-white text-amber-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
              Report Missing Person
            </Link>
            <Link to="/missing" className="bg-amber-700 hover:bg-amber-800 px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
              View Reports
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;