import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ReportPage from './pages/ReportPage';
import ListingPage from './pages/ListingPage';
import DetailPage from './pages/DetailPage';
import NotFoundPage from './pages/NotFoundPage';
import { getMissingPersons } from './services/api';
import LoadingSpinner from './components/ui/LoadingSpinner';

function App() {
  const [missingPersons, setMissingPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMissingPersons();
        setMissingPersons(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching missing persons:', err);
        setError('Failed to load missing persons data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6 fade-in">
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
            <p>{error}</p>
          </div>
        )}
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage missingPersonsCount={missingPersons.length} />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/missing" element={<ListingPage missingPersons={missingPersons} />} />
            <Route path="/missing/:id" element={<DetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;