import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Card = ({ person }) => {
  // Use the first photo as the main image
  const mainImage = person.photos && person.photos.length > 0 
    ? `http://localhost:3000/${person.photos[0]}` 
    : 'https://via.placeholder.com/300x200?text=No+Image';

  // Format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="card group h-full">
      <div className="relative overflow-hidden h-48">
        <img 
          src={mainImage} 
          alt={`${person.name}`} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-0 right-0 m-2">
          <span className={`px-2 py-1 text-xs rounded-full font-semibold 
            ${person.status === 'found' ? 'bg-success-500 text-white' : 
              person.status === 'critical' ? 'bg-red-500 text-white' : 
                'bg-alert-500 text-white'}
          `}>
            {person.status === 'found' ? 'Found' : 
              person.status === 'critical' ? 'Critical' : 'Missing'}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{person.name}</h3>
        <div className="flex items-center text-sm text-gray-600 mt-1">
          <FaCalendarAlt className="mr-1" />
          <span>{formatDate(person.dateReported)}</span>
        </div>
        {person.lastSeenLocation && (
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <FaMapMarkerAlt className="mr-1" />
            <span>{person.lastSeenLocation}</span>
          </div>
        )}
        <p className="mt-2 text-gray-600 line-clamp-2">{person.description}</p>
        <div className="mt-4">
          <Link 
            to={`/missing/${person.id}`}
            className="inline-block text-sm font-medium text-primary-800 hover:text-primary-900 transition-colors duration-200"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;