import ReportForm from '../components/forms/ReportForm';
import { FaExclamationTriangle, FaShieldAlt, FaUserShield } from 'react-icons/fa';

const ReportPage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="section-title text-3xl mb-2">Report a Missing Person</h1>
      <p className="text-gray-600 mb-6">
        Please provide as much detailed information as possible to help in finding the missing person.
      </p>
      
      {/* Information Box */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 rounded-r-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <FaExclamationTriangle className="h-5 w-5 text-blue-500" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Important Information</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                This report will be publicly accessible to help locate the missing person. 
                For urgent cases, please contact your local law enforcement directly.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Form */}
      <ReportForm />
      
      {/* Privacy Notice */}
      <div className="mt-10 bg-gray-50 p-6 rounded-lg border border-gray-200">
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <FaUserShield className="h-6 w-6 text-gray-500" />
          </div>
          <div className="ml-3">
            <h3 className="text-base font-medium text-gray-800">Privacy Notice</h3>
            <p className="mt-2 text-sm text-gray-600">
              Information submitted through this form will be used only for the purpose of finding 
              the missing person. Contact information is protected and not displayed publicly.
            </p>
            <div className="mt-3 flex items-center">
              <FaShieldAlt className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-xs text-gray-500">
                Your privacy and the safety of the missing person are our top priorities.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;