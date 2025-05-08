import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

const SearchBar = ({ onSearch, onStatusChange, onPriorityChange }) => {
  const [searchInput, setSearchInput] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    onSearch(value);
  };
  
  const handleStatusChange = (e) => {
    onStatusChange(e.target.value);
  };
  
  const handlePriorityChange = (e) => {
    onPriorityChange(e.target.value);
  };
  
  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className={`relative flex-grow mb-2 md:mb-0 dark:text-white text-gray-800 shadow-lg rounded-full`}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className={'dark:text-gray-400 text-gray-500'} />
          </div>
          <input
            type="text"
            placeholder="Search by client name, ticket ID or status..."
            className={`pl-10 pr-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 transition dark:bg-gray-800 dark:border-gray-700 dark:focus:ring-blue-600 dark:text-white dark:placeholder-gray-400
            bg-white border-gray-300 focus:ring-blue-500 text-gray-900 placeholder-gray-500'
            }`}
            value={searchInput}
            onChange={handleSearch}
          />
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center justify-center px-4 py-2 rounded-lg transition dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white bg-white hover:bg-gray-100 text-gray-800`}
        >
          <Filter size={18} className="mr-2" />
          Filters
        </button>
      </div>
      
      {showFilters && (
        <div className={`mt-3 p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4 dark:bg-gray-800 bg-white shadow`}>
          <div>
            <label className={`block mb-2 text-sm font-medium dark:text-gray-300 text-gray-700`}>
              Status
            </label>
            <select
              onChange={handleStatusChange}
              className={`w-full p-2 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 bg-gray-50 text-gray-900 border-gray-300`}
            >
              <option value="">All Statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
              <option value="Reopened">Reopened</option>
            </select>
          </div>
          
          <div>
            <label className={`block mb-2 text-sm font-medium dark:text-gray-300 text-gray-700`}>
              Priority
            </label>
            <select
              onChange={handlePriorityChange}
              className={`w-full p-2 rounded-md 
                  dark:bg-gray-700 dark:text-white dark:border-gray-600 bg-gray-50 text-gray-900 border-gray-300`}
            >
              <option value="">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;