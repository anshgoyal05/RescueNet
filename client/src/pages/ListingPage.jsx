import { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaSortAmountDown, FaMapMarkerAlt } from 'react-icons/fa';
import Card from '../components/ui/Card';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { getMissingPersons } from '../services/api';

const ListingPage = ({ missingPersons = [] }) => {
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('dateReported');
  const [sortDirection, setSortDirection] = useState('desc');
  const [loading, setLoading] = useState(false);
  
  // Filter and sort persons based on search term, status, and sort criteria
  useEffect(() => {
    setLoading(true);
    
    let results = [...missingPersons];
    
    // Filter by search term
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      results = results.filter(person => 
        person.name.toLowerCase().includes(term) ||
        person.lastSeenLocation?.toLowerCase().includes(term) ||
        person.description?.toLowerCase().includes(term)
      );
    }
    
    // Filter by status
    if (selectedStatus !== 'all') {
      results = results.filter(person => person.status === selectedStatus);
    }
    
    // Sort results
    results.sort((a, b) => {
      // Handle cases where the sort field might be undefined
      const aValue = a[sortBy] || '';
      const bValue = b[sortBy] || '';
      
      // Compare based on sort direction
      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
    
    // Small delay for UI feedback
    setTimeout(() => {
      setFilteredPersons(results);
      setLoading(false);
    }, 300);
  }, [missingPersons, searchTerm, selectedStatus, sortBy, sortDirection]);
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };
  
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };
  
  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="section-title text-3xl">Missing Persons</h1>
        <p className="text-gray-600 mb-6">
          Browse through reports of missing individuals. Filter and search to find specific cases.
        </p>
        
        {/* Filters and search */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name, location, or description..."
                className="pl-10 input-field"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center">
                <div className="mr-2 text-gray-600 flex items-center">
                  <FaFilter className="mr-1" /> Status:
                </div>
                <select 
                  className="input-field min-w-[120px]"
                  value={selectedStatus}
                  onChange={handleStatusChange}
                >
                  <option value="all">All</option>
                  <option value="missing">Missing</option>
                  <option value="critical">Critical</option>
                  <option value="found">Found</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <div className="mr-2 text-gray-600 flex items-center">
                  <FaSortAmountDown className="mr-1" /> Sort:
                </div>
                <select 
                  className="input-field min-w-[150px]"
                  value={sortBy}
                  onChange={handleSortChange}
                >
                  <option value="dateReported">Date Reported</option>
                  <option value="name">Name</option>
                  <option value="lastSeenDate">Last Seen</option>
                </select>
                <button 
                  onClick={toggleSortDirection}
                  className="ml-2 p-2 text-gray-600 hover:text-blue-800"
                  aria-label={`Sort ${sortDirection === 'asc' ? 'ascending' : 'descending'}`}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    style={{ transform: sortDirection === 'asc' ? 'rotate(0deg)' : 'rotate(180deg)' }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Results count */}
        <div className="mb-4 text-gray-600">
          {loading ? (
            <span className="loading-pulse">Searching...</span>
          ) : (
            <>Showing {filteredPersons.length} {filteredPersons.length === 1 ? 'result' : 'results'}</>
          )}
        </div>
      </div>
      
      {/* Results grid */}
      {loading ? (
        <div className="flex justify-center my-12">
          <LoadingSpinner size="large" />
        </div>
      ) : filteredPersons.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPersons.map(person => (
            <Card key={person.id} person={person} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <FaMapMarkerAlt className="mx-auto text-gray-400 text-4xl mb-4" />
          <h3 className="text-xl font-medium text-gray-700 mb-2">No Results Found</h3>
          <p className="text-gray-600">
            No missing persons reports match your search criteria.
            Try adjusting your filters or search terms.
          </p>
        </div>
      )}
    </div>
  );
};

export default ListingPage;