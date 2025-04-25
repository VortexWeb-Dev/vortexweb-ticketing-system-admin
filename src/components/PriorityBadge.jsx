// PriorityBadge.js
import React from 'react';

const PriorityBadge = ({ priority }) => {
  let bgColor = '';
  let textColor = '';
  
  switch (priority) {
    case 'High':
      bgColor = 'bg-red-100 dark:bg-red-900';
      textColor = 'text-red-800 dark:text-red-300';
      break;
    case 'Medium':
      bgColor = 'bg-orange-100 dark:bg-orange-900';
      textColor = 'text-orange-800 dark:text-orange-300';
      break;
    case 'Low':
      bgColor = 'bg-green-100 dark:bg-green-900';
      textColor = 'text-green-800 dark:text-green-300';
      break;
    default:
      bgColor = 'bg-gray-100 dark:bg-gray-700';
      textColor = 'text-gray-800 dark:text-gray-300';
  }
  
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${bgColor} ${textColor}`}>
      {priority}
    </span>
  );
};

export default PriorityBadge;