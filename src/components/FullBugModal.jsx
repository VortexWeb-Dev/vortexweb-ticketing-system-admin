import { useState, useEffect } from 'react';
import { X, Paperclip, Calendar, User, Building, Mail, Link, Clock, Bug, AlertTriangle, CheckCircle, XCircle, Terminal, FileText } from 'lucide-react';

export default function FullBugModal({ isOpen, onClose, bug }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  const {
    id,
    title,
    description,
    priority,
    category,
    status,
    severity,
    attachments,
    comments,
    plannedHours,
    clientName,
    companyName,
    clientEmail,
    portalUrl,
    assignedTo,
    reportedBy,
    dateFound,
    environment,
    stepsToReproduce,
    expectedResult,
    actualResult,
    logs,
    createdTime,
    updatedTime
  } = bug || {};

  // Function to format description text with line breaks
  const formatDescription = (text) => {
    if (!text) return '';
    return text.split('\n').map((line, i) => (
      <span key={i}>
        {line}
        <br />
      </span>
    ));
  };

  const priorityColors = {
    Low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    High: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    Critical: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
  };

  const statusColors = {
    Open: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Closed: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    'In Progress': 'bg-indigo-400 text-indigo-800 dark:bg-blue-300 dark:text-indigo-800'
  };

  const severityColors = {
    Low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    High: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    Critical: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    '': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* Backdrop */}
      <div className="absolute inset-0 backdrop-blur-md backdrop-blur-md bg-opacity-50 dark:bg-opacity-70" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center space-x-2">
            <Bug className="text-red-500 dark:text-red-400" size={20} />
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">#{id}</span>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white truncate">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {/* Status, Priority and Severity */}
          <div className="flex flex-wrap gap-3 mb-6">
            {status && (
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}>
                {status}
              </span>
            )}
            {priority && (
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${priorityColors[priority] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}>
                {priority} Priority
              </span>
            )}
            {severity && (
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${severityColors[severity] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}>
                {severity || "No"} Severity
              </span>
            )}
            {category && (
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                {category}
              </span>
            )}
          </div>

          {/* Bug Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Left Column */}
            <div>
              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Description</h3>
                <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  {formatDescription(description)}
                </div>
              </div>
              
              {/* Steps to Reproduce */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white flex items-center">
                  <Terminal size={18} className="mr-2" />
                  Steps to Reproduce
                </h3>
                <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  {formatDescription(stepsToReproduce)}
                </div>
              </div>
            </div>
            
            {/* Right Column */}
            <div>
              {/* Expected vs Actual Results */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white flex items-center">
                  <CheckCircle size={18} className="mr-2 text-green-500" />
                  Expected Result
                </h3>
                <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line bg-gray-50 dark:bg-gray-900 p-4 rounded-lg mb-4">
                  {formatDescription(expectedResult)}
                </div>
                
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white flex items-center">
                  <XCircle size={18} className="mr-2 text-red-500" />
                  Actual Result
                </h3>
                <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  {formatDescription(actualResult)}
                </div>
              </div>
              
              {/* Environment */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Environment</h3>
                <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  {formatDescription(environment)}
                </div>
              </div>
            </div>
          </div>
          
          {/* Logs */}
          {logs && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white flex items-center">
                <FileText size={18} className="mr-2" />
                Logs
              </h3>
              <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line bg-gray-50 dark:bg-gray-900 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                {formatDescription(logs)}
              </div>
            </div>
          )}
          
          {/* Attachments */}
          {attachments && attachments.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white flex items-center">
                <Paperclip size={18} className="mr-2" />
                Attachments
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {attachments.map((attachment) => (
                  <a
                    key={attachment.id}
                    href={attachment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700"
                  >
                    <Paperclip size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
                    <span className="text-blue-600 dark:text-blue-400 truncate">Attachment #{attachment.id}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
          
          {/* Comments */}
          {comments && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Comments</h3>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-gray-700 dark:text-gray-300">
                {comments || "No comments"}
              </div>
            </div>
          )}
          
          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Client Info */}
            <div className="space-y-3 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Client Information</h3>
              
              <div className="flex items-start">
                <User size={16} className="mt-1 mr-2 text-gray-500 dark:text-gray-400" />
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">Client Name</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">{clientName || "N/A"}</div>
                </div>
              </div>
              
              {companyName && (
                <div className="flex items-start">
                  <Building size={16} className="mt-1 mr-2 text-gray-500 dark:text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Company</div>
                    <div className="text-sm text-gray-700 dark:text-gray-300">{companyName}</div>
                  </div>
                </div>
              )}
              
              {clientEmail && (
                <div className="flex items-start">
                  <Mail size={16} className="mt-1 mr-2 text-gray-500 dark:text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Email</div>
                    <div className="text-sm text-gray-700 dark:text-gray-300">{clientEmail}</div>
                  </div>
                </div>
              )}
              
              {portalUrl && (
                <div className="flex items-start">
                  <Link size={16} className="mt-1 mr-2 text-gray-500 dark:text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Portal</div>
                    <div className="text-sm text-blue-600 dark:text-blue-400">{portalUrl}</div>
                  </div>
                </div>
              )}
            </div>
            
            {/* BUG Info */}
            <div className="space-y-3 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Bug Details</h3>
              
              <div className="flex items-start">
                <User size={16} className="mt-1 mr-2 text-gray-500 dark:text-gray-400" />
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">Assigned To</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">{assignedTo || "Unassigned"}</div>
                </div>
              </div>

              {reportedBy !== undefined && (
                <div className="flex items-start">
                  <AlertTriangle size={16} className="mt-1 mr-2 text-gray-500 dark:text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Reported By</div>
                    <div className="text-sm text-gray-700 dark:text-gray-300">{reportedBy || "N/A"}</div>
                  </div>
                </div>
              )}
              
              {dateFound && (
                <div className="flex items-start">
                  <Calendar size={16} className="mt-1 mr-2 text-gray-500 dark:text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Date Found</div>
                    <div className="text-sm text-gray-700 dark:text-gray-300">{new Date(dateFound).toLocaleDateString()}</div>
                  </div>
                </div>
              )}
              
              {plannedHours && (
                <div className="flex items-start">
                  <Clock size={16} className="mt-1 mr-2 text-gray-500 dark:text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Planned Hours</div>
                    <div className="text-sm text-gray-700 dark:text-gray-300">{plannedHours}</div>
                  </div>
                </div>
              )}
              
              <div className="flex items-start">
                <Calendar size={16} className="mt-1 mr-2 text-gray-500 dark:text-gray-400" />
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">Created</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">{createdTime}</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock size={16} className="mt-1 mr-2 text-gray-500 dark:text-gray-400" />
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">Last Updated</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">{updatedTime}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="sticky bottom-0 z-10 flex justify-end p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}