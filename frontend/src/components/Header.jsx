import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Menu, X } from 'lucide-react';
import { useExperience } from '../context/ExperienceContext';

const Header = () => {
  const navigate = useNavigate();
  const { searchQuery, dispatch, fetchExperiences } = useExperience();
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_SEARCH_QUERY', payload: localSearchQuery });
    fetchExperiences(localSearchQuery);
    navigate('/');
  };

  const handleLogoClick = () => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: '' });
    setLocalSearchQuery('');
    fetchExperiences();
    navigate('/');
  };

  return (
    <header className="bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={handleLogoClick}
          >
            <div className="bg-white p-2 rounded-full group-hover:bg-primary-400 transition-colors duration-200">
              <MapPin className="h-6 w-6 text-gray-800 group-hover:text-white transition-colors duration-200" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold group-hover:text-primary-400 transition-colors duration-200">hd</span>
              <span className="text-xs text-gray-300">highway delite</span>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="flex w-full">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search experiences..."
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pr-10 text-gray-900 bg-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-sm"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-primary-400 hover:bg-primary-500 text-white font-medium rounded-r-lg transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Search
              </button>
            </form>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Search Bar */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <form onSubmit={handleSearch} className="flex">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search experiences..."
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pr-10 text-gray-900 bg-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-primary-400 hover:bg-primary-500 text-white font-medium rounded-r-lg transition-colors duration-200"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
