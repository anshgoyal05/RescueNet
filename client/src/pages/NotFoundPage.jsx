import { Link } from 'react-router-dom';
import { FaHome, FaSearch } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="text-9xl font-bold text-blue-800 opacity-20">404</div>
      <h1 className="mt-4 text-3xl font-bold text-gray-800">Page Not Found</h1>
      <p className="mt-2 text-lg text-gray-600 text-center max-w-md">
        We couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Link to="/" className="btn-primary flex items-center justify-center">
          <FaHome className="mr-2" />
          Return Home
        </Link>
        <Link to="/missing" className="btn-secondary flex items-center justify-center">
          <FaSearch className="mr-2" />
          Browse Missing Persons
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;