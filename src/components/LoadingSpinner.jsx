import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <span className={`ml-4 dark:text-gray-300 text-gray-700`}>
        Loading tickets...
      </span>
    </div>
  );
};

export default LoadingSpinner;