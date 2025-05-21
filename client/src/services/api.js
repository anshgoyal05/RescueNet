import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Set up axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all missing persons
export const getMissingPersons = async () => {
  try {
    const response = await api.get('/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching missing persons:', error);
    throw error;
  }
};

// Get a specific missing person by ID
export const getMissingPersonById = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching missing person with ID ${id}:`, error);
    throw error;
  }
};

// Report a new missing person
export const reportMissingPerson = async (formData) => {
  try {
    // Using FormData to handle file uploads
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const response = await api.post('/add', formData, config);
    return response.data;
  } catch (error) {
    console.error('Error reporting missing person:', error);
    throw error;
  }
};

// Update a missing person's status
export const updateMissingPersonStatus = async (id, status) => {
  try {
    const response = await api.patch(`/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.error(`Error updating status for person with ID ${id}:`, error);
    throw error;
  }
};

export default api;