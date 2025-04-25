// StatusBadge.js
import React from 'react';

const StatusBadge = ({ status }) => {
  let bgColor = '';
  let textColor = '';
  
  switch (status) {
    case 'Open':
      bgColor = 'bg-blue-100 dark:bg-blue-900';
      textColor = 'text-blue-800 dark:text-blue-300';
      break;
    case 'InProgress':
      bgColor = 'bg-yellow-100 dark:bg-yellow-900';
      textColor = 'text-yellow-800 dark:text-yellow-300';
      break;
    case 'Resolved':
      bgColor = 'bg-green-100 dark:bg-green-900';
      textColor = 'text-green-800 dark:text-green-300';
      break;
    case 'Closed':
      bgColor = 'bg-gray-100 dark:bg-gray-700';
      textColor = 'text-gray-800 dark:text-gray-300';
      break;
    default:
      bgColor = 'bg-gray-100 dark:bg-gray-700';
      textColor = 'text-gray-800 dark:text-gray-300';
  }
  
  const displayStatus = status === 'InProgress' ? 'In Progress' : status;
  
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${bgColor} ${textColor}`}>
      {displayStatus}
    </span>
  );
};

export default StatusBadge;