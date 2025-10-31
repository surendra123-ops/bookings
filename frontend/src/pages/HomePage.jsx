import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, X } from 'lucide-react';
import { useExperience } from '../context/ExperienceContext';
import ExperienceCard from '../components/ExperienceCard';
import LoadingSpinner from '../components/LoadingSpinner';
import SkeletonLoader from '../components/SkeletonLoader';

const HomePage = () => {
  const navigate = useNavigate();
  const { experiences, loading, error, fetchExperiences } = useExperience();
  
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    priceRange: '',
    duration: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [filteredExperiences, setFilteredExperiences] = useState([]);

  const handleExperienceClick = (experienceId) => {
    navigate(`/experience/${experienceId}`);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const applyFilters = () => {
    let filtered = [...experiences];

    if (filters.search) {
      filtered = filtered.filter(exp => 
        exp.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        exp.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        exp.location.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.location) {
      filtered = filtered.filter(exp => 
        exp.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(exp => {
        if (max) {
          return exp.price >= min && exp.price <= max;
        }
        return exp.price >= min;
      });
    }

    if (filters.duration) {
      filtered = filtered.filter(exp => 
        exp.duration.toLowerCase().includes(filters.duration.toLowerCase())
      );
    }

    setFilteredExperiences(filtered);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      location: '',
      priceRange: '',
      duration: ''
    });
    setFilteredExperiences(experiences);
  };

  useEffect(() => {
    setFilteredExperiences(experiences);
  }, [experiences]);

  useEffect(() => {
    applyFilters();
  }, [filters, experiences]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <SkeletonLoader type="card" count={8} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="text-red-600 text-lg font-medium mb-4">
            Error loading experiences
          </div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Discover Amazing Experiences
        </h1>
        <p className="text-gray-600">
          Book curated travel experiences with certified guides and safety equipment included.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Filter Experiences</h2>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <Filter className="h-4 w-4 mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {showFilters && (
          <div className="bg-gray-100 rounded-lg p-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  placeholder="Search experiences..."
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <select
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="input-field"
                >
                  <option value="">All Locations</option>
                  <option value="Udupi">Udupi</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Coorg">Coorg</option>
                  <option value="Sunderban">Sunderban</option>
                  <option value="Manali">Manali</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  className="input-field"
                >
                  <option value="">All Prices</option>
                  <option value="0-500">Under ₹500</option>
                  <option value="500-1000">₹500 - ₹1000</option>
                  <option value="1000-1500">₹1000 - ₹1500</option>
                  <option value="1500-9999">Above ₹1500</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration
                </label>
                <select
                  value={filters.duration}
                  onChange={(e) => handleFilterChange('duration', e.target.value)}
                  className="input-field"
                >
                  <option value="">All Durations</option>
                  <option value="1-2">1-2 hours</option>
                  <option value="2-3">2-3 hours</option>
                  <option value="3-4">3-4 hours</option>
                  <option value="4-5">4-5 hours</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <button
                onClick={clearFilters}
                className="btn-secondary mr-2"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {filteredExperiences.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-4">
            No experiences found
          </div>
          <p className="text-gray-400 mb-4">
            Try adjusting your search criteria or browse all experiences.
          </p>
          <button
            onClick={clearFilters}
            className="btn-primary"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredExperiences.map((experience) => (
            <ExperienceCard
              key={experience._id}
              experience={experience}
              onClick={() => handleExperienceClick(experience._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
