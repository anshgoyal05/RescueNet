import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCalendarAlt, FaMapMarkerAlt, FaUser, FaPhone, FaClock, FaWeight, FaRuler, FaNotesMedical } from 'react-icons/fa';
import { getMissingPersonById, updateMissingPersonStatus } from '../services/api';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { toast } from 'react-toastify';

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getMissingPersonById(id);
        setPerson(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching person details:', err);
        setError('Failed to load details. The person may not exist or has been removed.');
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);
  
  const handleStatusUpdate = async (newStatus) => {
    try {
      setSubmitting(true);
      await updateMissingPersonStatus(id, newStatus);
      setPerson(prev => ({ ...prev, status: newStatus }));
      toast.success(`Status updated to ${newStatus}`);
    } catch (error) {
      toast.error('Failed to update status');
      console.error('Error updating status:', error);
    } finally {
      setSubmitting(false);
    }
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="large" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">Error</h2>
        <p>{error}</p>
        <div className="mt-4">
          <Link to="/missing" className="text-red-700 hover:text-red-800 font-medium flex items-center">
            <FaArrowLeft className="mr-2" /> Back to Missing Persons
          </Link>
        </div>
      </div>
    );
  }
  
  if (!person) {
    return (
      <div className="bg-amber-50 border-l-4 border-amber-500 text-amber-700 p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">Person Not Found</h2>
        <p>The requested missing person report does not exist or has been removed.</p>
        <div className="mt-4">
          <Link to="/missing" className="text-amber-700 hover:text-amber-800 font-medium flex items-center">
            <FaArrowLeft className="mr-2" /> Back to Missing Persons
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-10">
      {/* Navigation */}
      <div className="mb-6">
        <Link to="/missing" className="text-blue-800 hover:text-blue-900 font-medium flex items-center">
          <FaArrowLeft className="mr-2" /> Back to Missing Persons
        </Link>
      </div>
      
      {/* Status Banner */}
      <div className={`mb-8 py-3 px-6 rounded-lg flex justify-between items-center ${
        person.status === 'found' ? 'bg-success-100 text-success-800' : 
        person.status === 'critical' ? 'bg-red-100 text-red-800' : 
        'bg-alert-100 text-alert-800'
      }`}>
        <div className="flex items-center">
          <span className="font-semibold mr-2">Status:</span>
          <span className="capitalize">{person.status}</span>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => handleStatusUpdate('missing')}
            disabled={person.status === 'missing' || submitting}
            className={`px-3 py-1 text-sm rounded-full font-medium ${
              person.status === 'missing' ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-alert-600 text-white hover:bg-alert-700'
            }`}
          >
            Missing
          </button>
          <button 
            onClick={() => handleStatusUpdate('critical')}
            disabled={person.status === 'critical' || submitting}
            className={`px-3 py-1 text-sm rounded-full font-medium ${
              person.status === 'critical' ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            Critical
          </button>
          <button 
            onClick={() => handleStatusUpdate('found')}
            disabled={person.status === 'found' || submitting}
            className={`px-3 py-1 text-sm rounded-full font-medium ${
              person.status === 'found' ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-success-600 text-white hover:bg-success-700'
            }`}
          >
            Found
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Photos Section */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {person.photos && person.photos.length > 0 ? (
              <>
                <div className="h-80 overflow-hidden">
                  <img 
                    src={`http://localhost:3000/${person.photos[activeImage]}`} 
                    alt={person.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {person.photos.length > 1 && (
                  <div className="p-2 flex gap-2 overflow-x-auto">
                    {person.photos.map((photo, index) => (
                      <button 
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={`w-16 h-16 flex-shrink-0 rounded overflow-hidden border-2 ${
                          activeImage === index ? 'border-blue-500' : 'border-transparent'
                        }`}
                      >
                        <img 
                          src={`http://localhost:3000/${photo}`} 
                          alt={`${person.name} - photo ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="h-80 bg-gray-100 flex items-center justify-center">
                <p className="text-gray-500">No photos available</p>
              </div>
            )}
          </div>
          
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <FaUser className="text-gray-500 mt-1 mr-3" />
                <div>
                  <div className="text-sm text-gray-600">Contact Person</div>
                  <div>{person.contactPerson}</div>
                </div>
              </div>
              <div className="flex items-start">
                <FaPhone className="text-gray-500 mt-1 mr-3" />
                <div>
                  <div className="text-sm text-gray-600">Phone Number</div>
                  <div>{person.contactPhone}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Details Section */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">{person.name}</h1>
            
            <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-gray-600 mt-2 mb-6">
              {person.age && (
                <div>{person.age} years old</div>
              )}
              {person.gender && (
                <div className="capitalize">{person.gender}</div>
              )}
              <div className="flex items-center">
                <FaCalendarAlt className="mr-1" />
                <span>Reported: {formatDate(person.dateReported || new Date())}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-gray-700 font-medium mb-2 flex items-center">
                  <FaClock className="mr-2 text-blue-800" /> Last Seen
                </h3>
                <div className="text-gray-800">
                  {person.lastSeenDate && formatDate(person.lastSeenDate)}
                </div>
              </div>
              
              <div>
                <h3 className="text-gray-700 font-medium mb-2 flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-blue-800" /> Last Location
                </h3>
                <div className="text-gray-800">
                  {person.lastSeenLocation}
                </div>
              </div>
              
              {person.height && (
                <div>
                  <h3 className="text-gray-700 font-medium mb-2 flex items-center">
                    <FaRuler className="mr-2 text-blue-800" /> Height
                  </h3>
                  <div className="text-gray-800">
                    {person.height} cm
                  </div>
                </div>
              )}
              
              {person.weight && (
                <div>
                  <h3 className="text-gray-700 font-medium mb-2 flex items-center">
                    <FaWeight className="mr-2 text-blue-800" /> Weight
                  </h3>
                  <div className="text-gray-800">
                    {person.weight} kg
                  </div>
                </div>
              )}
            </div>
            
            <h3 className="text-gray-700 font-medium mb-2">Description</h3>
            <p className="text-gray-800 mb-6 whitespace-pre-line">
              {person.description}
            </p>
            
            {person.identifyingFeatures && (
              <div className="mb-6">
                <h3 className="text-gray-700 font-medium mb-2">Identifying Features</h3>
                <p className="text-gray-800 whitespace-pre-line">
                  {person.identifyingFeatures}
                </p>
              </div>
            )}
            
            {person.medicalConditions && (
              <div>
                <h3 className="text-gray-700 font-medium mb-2 flex items-center">
                  <FaNotesMedical className="mr-2 text-blue-800" /> Medical Conditions
                </h3>
                <p className="text-gray-800 whitespace-pre-line">
                  {person.medicalConditions}
                </p>
              </div>
            )}
          </div>
          
          {/* Share Section */}
          <div className="bg-blue-50 rounded-lg p-6 mt-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">Help Spread the Word</h3>
            <p className="text-blue-700 mb-4">
              Sharing this information can significantly increase the chances of finding {person.name}.
            </p>
            <div className="flex flex-wrap gap-2">
              <button className="btn-primary">
                Share on Facebook
              </button>
              <button className="btn-primary">
                Share on Twitter
              </button>
              <button className="btn-secondary">
                Copy Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;