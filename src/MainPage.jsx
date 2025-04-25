import { useState, useEffect, useMemo } from "react";
import {
  Plus,
  Search,
  Bell,
  Filter,
  Clock,
  CloudUpload
} from "lucide-react";
import Sidebar from './components/Sidebar'
import fetchData from "./utils/fetchData";
import fetchAllData from "./utils/fetchAllData";
import formatTicketDate from './utils/formatTicketDate'

// Main Layout Component
export default function TicketingSystem() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(true)
  const [viewAllTickets, setViewAllTickets] = useState(false)

  useEffect(() => {
    fetchAllData('https://myemirateshome.com/vortex/ticketing-system-backend/?endpoint=tickets&limit=50&page=', {}, setLoading, setError).then((data) => {
      setTickets(data);
    });
  }, []);
  

  const sortedTickets = useMemo(() => {
    if (!Array.isArray(tickets)) return [];
    return [...tickets].sort(
      (a, b) => new Date(b.createdTime) - new Date(a.createdTime)
    );
  }, [tickets]);
  

  const visibleTickets = useMemo(() => {
    return viewAllTickets ? sortedTickets : sortedTickets.slice(0, 4);
  }, [sortedTickets, viewAllTickets]);

  const statusCards = [
    {
      title: 'Open',
      count: 12,
      bgColor: 'bg-blue-100 dark:bg-blue-900',
      textColor: 'text-blue-600 dark:text-blue-300',
    },
    {
      title: 'InProgress',
      count: 5,
      bgColor: 'bg-yellow-100 dark:bg-yellow-900',
      textColor: 'text-yellow-600 dark:text-yellow-300',
    },
    {
      title: 'Pending',
      count: 3,
      bgColor: 'bg-purple-100 dark:bg-purple-900',
      textColor: 'text-purple-600 dark:text-purple-300',
    },
    {
      title: 'Resolved',
      count: 27,
      bgColor: 'bg-green-100 dark:bg-green-900',
      textColor: 'text-green-600 dark:text-green-300',
    },
  ];
  

  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "text-blue-600 bg-blue-100";
      case "In Progress":
        return "text-yellow-600 bg-yellow-100";
      case "Pending":
        return "text-purple-600 bg-purple-100";
      case "Closed":
        return "text-gray-600 bg-gray-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };



  return (
    <div className={` h-screen flex flex-col`}>
      <div className="flex flex-1 overflow-hidden dark:bg-gray-900">
        {/* Sidebar */}
       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          {/* Header */}
          <header className="bg-white dark:bg-gray-800 shadow-sm p-4 flex items-center justify-between">
            <div className="flex items-center w-1/2">
              <div className="relative w-full max-w-md">
                <input
                  type="text"
                  placeholder="Search tickets..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search
                  size={18}
                  className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 relative">
                <Bell size={20} />
                <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button> */}
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-medium">
                  JD
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="p-6">
            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Dashboard
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Track and manage your support tickets
                </p>
              </div>
              <button
                onClick={() => setShowNewTicketModal(true)}
                className="mt-4 md:mt-0 flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors"
              >
                <Plus size={18} className="mr-1" />
                Create New Ticket
              </button>
            </div>

            {/* Ticket Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {statusCards.map((card, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg shadow-sm ${card.bgColor} dark:shadow dark:border dark:border-gray-700 dark:bg-opacity-20`}
                >
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                    {card.title}
                  </h3>
                  <p
                    className={`text-3xl font-bold ${card.textColor} dark:text-white`}
                  >
                    {[...tickets].filter((ticket)=>ticket.status.toLowerCase() == card.title.toLowerCase()).length}
                  </p>
                </div>
              ))}
            </div>

           
            {/* Recent Tickets */}
            {
                !loading ?

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Recent Tickets
                </h2>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <Filter size={18} />
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <tr>
                      <th className="px-4 py-3 text-left">ID</th>
                      <th className="px-4 py-3 text-left">Title</th>
                      <th className="px-4 py-3 text-left">Status</th>
                      <th className="px-4 py-3 text-left">Priority</th>
                      <th className="px-4 py-3 text-left">Category</th>
                      <th className="px-4 py-3 text-left">Created</th>
                      <th className="px-4 py-3 text-left">Last Updated</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {visibleTickets.map((ticket) => (
                        <tr
                        key={ticket.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/30"
                      >
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                          TKTV{ticket.id}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                          {ticket.title}
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={ticket.status} />
                        </td>
                        <td className="px-4 py-3 dark:text-gray-50 text-gray-700">
                          <StatusBadge status={ticket.category} />
                        </td>
                        <td className="px-4 py-3">
                          <PriorityBadge priority={ticket.priority} />
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 flex items-center">
                          <Clock size={14} className="mr-1" /> {formatTicketDate(ticket.createdTime)}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                          {formatTicketDate(ticket.updatedTime)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-sm text-center">
              <button
          className="text-blue-600 dark:text-blue-400 hover:underline"
          onClick={() => setViewAllTickets((prev) => !prev)}
        >
          {viewAllTickets ? 'Show less' : 'View all tickets'}
        </button>
              </div>
            </div>
     
            : 
           
                <div className="text-4xl text-center py-8 text-gray-400">
                    Loading...
                </div>
            
                }

          </div>
        </main>
      </div>

      {/* New Ticket Modal */}
      {showNewTicketModal && (
        <NewTicketModal onClose={() => setShowNewTicketModal(false)} setTickets={setTickets} setLoading={setLoading} setError={setError} />
      )}
    </div>
  );
}

// Status Card Component
// function StatusCard({ title, count, bgColor, textColor }) {
//   return (
//     <div className={`${bgColor} rounded-lg p-4 shadow-sm`}>
//       <h3 className={`${textColor} font-medium`}>{title}</h3>
//       <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
//         {count}
//       </p>
//       <div className="mt-2 flex items-center">
//         <span className="text-xs text-gray-500 dark:text-gray-400">
//           View all 
//         </span>
//         <svg
//           className="w-4 h-4 ml-1 text-gray-500 dark:text-gray-400"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M9 5l7 7-7 7"
//           />
//         </svg>
//       </div>
//     </div>
//   );
// }

// Status Badge Component
function StatusBadge({ status }) {
  const badgeStyles = {
    Open: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400",
    InProgress:
      "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400",
    Resolved:
      "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400",
    Closed: "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-400",
  };

  return (
    <span
      className={`${badgeStyles[status]} text-xs font-medium px-2.5 py-0.5 rounded-full`}
    >
      {status}
    </span>
  );
}

// Priority Badge Component
function PriorityBadge({ priority }) {
  const priorityStyles = {
    High: "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400",
    Medium:
      "bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-400",
    Low: "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400",
  };

  return (
    <span
      className={`${priorityStyles[priority]} text-xs font-medium px-2.5 py-0.5 rounded-full`}
    >
      {priority}
    </span>
  );
}

// New Ticket Modal Component
function NewTicketModal({ onClose, setTickets, setLoading, setError }) {

    const [formData, setFormData] = useState({
        title: "",
        status: "Open",
        priority: "Low",
        category: "Technical Support",
        description: "",
        attachments: []
      });
      
    //   const [tickets, setTickets] = useState([]);
      const [submitMessage, setSubmitMessage] = useState("");
      const [showSubmitMessage, setShowSubmitMessage] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
      
      const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const validFiles = files.filter(file => {
          // Check file type
          const validTypes = [
            'image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/webp',
            'video/mp4', 'video/webm', 'video/ogg',
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // docx
          ];
          
          // Check file size (10MB max)
          const maxSize = 10 * 1024 * 1024; // 10MB in bytes
          
          const isValidType = validTypes.includes(file.type);
          const isValidSize = file.size <= maxSize;
          
          if (!isValidType) {
            alert(`File type not supported: ${file.name}`);
          }
          if (!isValidSize) {
            alert(`File exceeds 10MB limit: ${file.name}`);
          }
          
          return isValidType && isValidSize;
        });
        
        // Convert files to base64 for storage
        validFiles.forEach(file => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setFormData(prevData => ({
              ...prevData,
              attachments: [...prevData.attachments, {
                name: file.name,
                type: file.type,
                size: file.size,
                data: reader.result
              }]
            }));
          };
          reader.readAsDataURL(file);
        });
      };
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
          const response = await fetch(import.meta.env.VITE_CREATE_TICKET, {
            method: "POST",
            body: JSON.stringify(formData)
          });
          
          const data = await response.json();
          
          if (data) {
            console.log(data);
            fetchAllData("https://myemirateshome.com/vortex/ticketing-system-backend/?endpoint=tickets&limit=50&page=",{}, setLoading, setError)
            .then ((data)=> {
                console.log(data)
                setTickets(data)
            }
      )
            setSubmitMessage("Ticket submitted successfully!");
            setShowSubmitMessage(true);
            
            // Reset form
            setFormData({
              title: "",
              priority: "Low",
              category: "Technical Support",
              description: "",
              attachments: []
            });
            
            // Refresh ticket list
            // fetchTickets();
            
            // Hide success message after 3 seconds
            setTimeout(() => {
              setShowSubmitMessage(false);
            }, 3000);
          }
        } catch (error) {
          console.error("Error submitting ticket:", error);
          setSubmitMessage("Error submitting ticket. Please try again.");
          setShowSubmitMessage(true);
        }
      };
      
      const removeAttachment = (index) => {
        setFormData(prevData => ({
          ...prevData,
          attachments: prevData.attachments.filter((_, i) => i !== index)
        }));
      };

  return (
    <div className="fixed inset-0 z-50 overflow-auto shadow-2xl bg-opacity-50 flex items-center justify-center p-6 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-full overflow-auto">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Create New Ticket
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl"
          >
            ✘
          </button>
        </div>

        <div className="p-4">

          {/* <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Subject
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Brief description of the issue"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Priority
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Technical Support</option>
                <option>Billing</option>
                <option>Feature Request</option>
                <option>Account Access</option>
                <option>Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                placeholder="Please provide details about your issue..."
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Attachments
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md p-4 text-center">
                <div className="flex flex-col items-center">
                  <CloudUpload 
                    className="w-8 h-8 text-gray-400"
                  />
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Drag and drop files here, or{" "}
                    <span className="text-blue-500 hover:text-blue-600 cursor-pointer">
                      browse
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                    Max file size: 10MB
                  </p>
                </div>
                <input type="file" className="hidden" />
              </div>
            </div>
          </form> */}

          

{showSubmitMessage && (
        <div className={`p-3 mb-4 rounded ${submitMessage.includes("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
          {submitMessage}
        </div>
      )}
      
      <form id="createTicket" onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Brief description of the issue"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Priority
          </label>
          <select 
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category
          </label>
          <select 
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Technical Support</option>
            <option>Billing</option>
            <option>Feature Request</option>
            <option>Account Access</option>
            <option>Other</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Please provide details about your issue..."
            required
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Attachments
          </label>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md p-4 text-center">
            <div className="flex flex-col items-center">
              <CloudUpload className="w-8 h-8 text-gray-400" />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Drag and drop files here, or{" "}
                <label className="text-blue-500 hover:text-blue-600 cursor-pointer">
                  browse
                  <input 
                    type="file" 
                    className="hidden" 
                    multiple
                    accept=".jpg,.jpeg,.png,.gif,.svg,.webp,.mp4,.webm,.ogg,.pdf,.docx"
                    onChange={handleFileChange}
                  />
                </label>
              </p>
              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                Max file size: 10MB. Allowed formats: Images, Videos, PDF, DOCX
              </p>
            </div>
          </div>
          
          {/* Display attached files */}
          {formData.attachments.length > 0 && (
            <div className="mt-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Attached files:</p>
              <ul className="mt-2 space-y-2">
                {formData.attachments.map((file, index) => (
                  <li key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">{file.name}</span>
                      <span className="ml-2 text-xs text-gray-400">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => removeAttachment(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {/* <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit Ticket
          </button>
        </div> */}
      </form>

        </div>

        <div className="flex justify-end p-4 border-t border-gray-200 dark:border-gray-700 space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button form="createTicket" type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm">
            Submit Ticket
          </button>
        </div>
      </div>
    </div>
  );
}
