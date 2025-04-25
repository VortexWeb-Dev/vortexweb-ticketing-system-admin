// import React, { useState, useEffect } from "react";
// import {
//   ChevronUp,
//   ChevronDown,
//   Paperclip,
//   MoreVertical,
//   Trash,
//   Edit,
//   File,
// } from "lucide-react";
// import EditTicketModal from "./EditTicketModal";
// import { formatDate } from "../utils/dateUtils";
// import StatusBadge from "./StatusBadge";
// import PriorityBadge from "./PriorityBadge";
// import formatTicketDate from "../utils/formatTicketDate";
// import DeleteConfirmModal from "./DeleteConfirmModal";
// import CommentCell from "./CommentCell";

// const TicketTable = ({ tickets, sortConfig, onSort, onUpdate, onDelete }) => {
//   const [selectedTicket, setSelectedTicket] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [agents, setAgents] = useState([]);
//   const [activeDropdown, setActiveDropdown] = useState(null);

//   useEffect(() => {
//     const fetchAgents = async () => {
//       try {
//         const response = await fetch(import.meta.env.VITE_EMPLOYEES);
//         const data = await response.json();
//         console.log(data.employees);

//         setAgents(data.employees);
//       } catch (error) {
//         console.error("Error fetching agents:", error);
//       }
//     };

//     fetchAgents();

//     // Close dropdown when clicking outside
//     const handleClickOutside = (event) => {
//       if (!event.target.closest(".dropdown-container")) {
//         setActiveDropdown(null);
//       }
//     };

//     document.addEventListener("click", handleClickOutside);
//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, []);

//   const handleEditClick = (ticket) => {
//     setSelectedTicket(ticket);
//     setShowEditModal(true);
//     setActiveDropdown(null);
//   };

//   const handleDeleteClick = (ticket) => {
//     setSelectedTicket(ticket);
//     setShowDeleteModal(true);
//     setActiveDropdown(null);
//   };

//   const handleUpdateTicket = (updatedTicket) => {
//     if (selectedTicket) {
//       onUpdate(selectedTicket.id, updatedTicket);
//       setShowEditModal(false);
//     }
//   };

//   const handleConfirmDelete = () => {
//     if (selectedTicket) {
//       onDelete(selectedTicket.id);
//       setShowDeleteModal(false);
//     }
//   };

//   const toggleDropdown = (ticketId, event) => {
//     event.stopPropagation();
//     setActiveDropdown(activeDropdown === ticketId ? null : ticketId);
//   };

//   const getSortIcon = (key) => {
//     if (sortConfig.key !== key) {
//       return null;
//     }
//     return sortConfig.direction === "asc" ? (
//       <ChevronUp size={18} />
//     ) : (
//       <ChevronDown size={18} />
//     );
//   };

//   return (
//     <>
//       <div className="overflow-x-auto">
//         <table
//           className={`min-w-full dark:text-white text-gray-700 py-10 mb-25 relative overflow-auto`}
//         >
//           <thead className={"dark:bg-gray-800 bg-gray-100"}>
//             <tr>
//               <th
//                 onClick={() => onSort("clientName")}
//                 className="cursor-pointer py-3 px-4 text-left"
//               >
//                 <div className="flex items-center">
//                   Client
//                   {getSortIcon("clientName")}
//                 </div>
//               </th>
//               <th
//                 onClick={() => onSort("id")}
//                 className="cursor-pointer py-3 px-4 text-left"
//               >
//                 <div className="flex items-center">
//                   Ticket ID
//                   {getSortIcon("id")}
//                 </div>
//               </th>
//               <th className="py-3 px-4 text-left max-w-20">Description</th>
//               <th className="py-3 px-4 text-left">Comments</th>
//               <th
//                 onClick={() => onSort("priority")}
//                 className="cursor-pointer py-3 px-4 text-left"
//               >
//                 <div className="flex items-center">
//                   Priority
//                   {getSortIcon("priority")}
//                 </div>
//               </th>
//               <th
//                 onClick={() => onSort("status")}
//                 className="cursor-pointer py-3 px-4 text-left"
//               >
//                 <div className="flex items-center">
//                   Status
//                   {getSortIcon("status")}
//                 </div>
//               </th>
//               <th
//                 onClick={() => onSort("createdTime")}
//                 className="cursor-pointer py-3 px-4 text-left"
//               >
//                 <div className="flex items-center pr-2 mr-2">
//                   Created
//                   {getSortIcon("createdTime")}
//                 </div>
//               </th>
//               <th
//                 onClick={() => onSort("createdTime")}
//                 className="cursor-pointer py-3 px-4 text-left"
//               >
//                 <div className="flex items-center pr-2 mr-2">Last Updated</div>
//               </th>
//               <th className="py-3 px-4 text-left">Assigned To</th>
//               <th className="py-3 px-4 text-left">Attachments</th>
//               <th className="py-3 px-4 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody className={"dark:bg-gray-800 bg-white"}>
//             {tickets.length > 0 ? (
//               tickets.map((ticket) => (
//                 <tr
//                   key={Math.random().toFixed(4) * 10000}
//                   className={`border-t dark:border-gray-700 dark:hover:bg-gray-700 border-gray-200 hover:bg-gray-50 transition-colors`}
//                 >
//                   <td className="py-3 px-4 min-w-30">
//                     <div>
//                       <div className="font-medium">{ticket.clientName}</div>
//                       <div
//                         className={`text-sm dark:text-gray-400 text-gray-500`}
//                       >
//                         {ticket.accountNumber}
//                       </div>
//                     </div>
//                   </td>
//                   <td className="py-3 px-4">{ticket.id}</td>
//                   <td className="py-3 px-4 max-w-xs truncate max-w-20">
//                     {ticket.description}
//                   </td>
//                   <td className="px-1 py-3">
//                     <CommentCell
//                       prevData={ticket}
//                       comment={ticket.comments}
//                       onCommentUpdate={null}
//                     />
//                   </td>
//                   <td className="py-3 px-4">
//                     <PriorityBadge priority={ticket.priority} />
//                   </td>
//                   <td className="py-3 px-4">
//                     <StatusBadge status={ticket.status} />
//                   </td>
//                   <td className="py-3 px-4">
//                     {formatTicketDate(ticket.createdTime)}
//                   </td>
//                   <td className="py-3 px-4">
//                     {formatTicketDate(ticket.updatedTime)}
//                   </td>
//                   <td className="py-3 px-4">
//                     {(typeof (ticket.assignedTo )=== "number") ? (
//                       agents.find((agent) => agent.id === ticket.assignedTo)
//                         ?.fullname || (
//                         <span className={"dark:text-gray-400 text-gray-500"}>
//                           Unassigned
//                         </span>
//                       )
//                     ) : (
//                       <span className={"dark:text-gray-400 text-gray-500"}>
//                         {ticket.assignedTo}
//                       </span>
//                     )}
//                   </td>
//                   <td className="py-3 px-4">
//                     {ticket.attachments && ticket.attachments.length > 0 ? (
//                       <div className="flex items-center space-x-1">
//                         {ticket.attachments
//                           .slice(0, 3)
//                           .map((attachment, index) => (
//                             <div
//                               key={index}
//                               className="relative group cursor-pointer"
//                               title={`Attachment ${attachment.id}`}
//                             >
//                               <a
//                                 href={attachment.url}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="block"
//                               >
//                                 <File className="h-5 w-5 text-xs font-medium text-blue-600 dark:text-blue-400" />
//                               </a>
//                             </div>
//                           ))}
//                         {ticket.attachments.length > 3 && (
//                           <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-xs">
//                             +{ticket.attachments.length - 3}
//                           </div>
//                         )}
//                       </div>
//                     ) : (
//                       <span className="text-xs text-gray-500 dark:text-gray-400">
//                         None
//                       </span>
//                     )}
//                   </td>
//                   <td className="py-3 px-4 relative dropdown-container">
//                     <button
//                       onClick={(e) => toggleDropdown(ticket.id, e)}
//                       className={`p-2 rounded flex items-center justify-center 
//                           dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 dark:hover:text-gray-100
//                           bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800`}
//                       aria-label="Ticket actions"
//                     >
//                       <MoreVertical size={18} />
//                     </button>

//                     {/* Dropdown Menu */}
//                     {activeDropdown === ticket.id && (
//                       <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg z-10 dark:bg-gray-700 bg-white border dark:border-gray-600 border-gray-200 z-[999] overflow-auto">
//                         <div className="py-1">
//                           <button
//                             onClick={() => handleEditClick(ticket)}
//                             className="flex items-center w-full text-left px-4 py-2 dark:text-gray-200 text-gray-700 dark:hover:bg-gray-600 hover:bg-gray-100"
//                           >
//                             <Edit size={16} className="mr-2" />
//                             Update/Assign
//                           </button>
//                           <button
//                             onClick={() => handleDeleteClick(ticket)}
//                             className="flex items-center w-full text-left px-4 py-2 dark:text-red-400 text-red-600 dark:hover:bg-gray-600 hover:bg-gray-100"
//                           >
//                             <Trash size={16} className="mr-2" />
//                             Delete
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="10" className="py-6 text-center">
//                   <p className={"dark:text-gray-400 text-gray-500"}>
//                     No tickets found. Try adjusting your search or filters.
//                   </p>
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {showEditModal && selectedTicket && (
//         <EditTicketModal
//           ticket={selectedTicket}
//           agents={agents}
//           onUpdate={handleUpdateTicket}
//           onClose={() => setShowEditModal(false)}
//         />
//       )}

//       {showDeleteModal && selectedTicket && (
//         <DeleteConfirmModal
//           ticket={selectedTicket}
//           onConfirm={handleConfirmDelete}
//           onClose={() => setShowDeleteModal(false)}
//         />
//       )}
//     </>
//   );
// };

// export default TicketTable;


import React, { useState, useEffect } from "react";
import {
  ChevronUp,
  ChevronDown,
  Paperclip,
  MoreVertical,
  Trash,
  Edit,
  File,
  X,
} from "lucide-react";
import EditTicketModal from "./EditTicketModal";
import { formatDate } from "../utils/dateUtils";
import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";
import formatTicketDate from "../utils/formatTicketDate";
import DeleteConfirmModal from "./DeleteConfirmModal";
import CommentCell from "./CommentCell";

// New component for the description modal
const DescriptionModal = ({ description, onClose }) => {
  return (
    <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium dark:text-white text-gray-900">Ticket Description</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        <div className="dark:text-gray-300 text-gray-700 whitespace-pre-wrap break-words max-h-96 overflow-y-auto">
          {description}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const TicketTable = ({ tickets, sortConfig, onSort, onUpdate, onDelete }) => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState("");
  const [agents, setAgents] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_EMPLOYEES);
        const data = await response.json();
        console.log(data.employees);

        setAgents(data.employees);
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    };

    fetchAgents();

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleEditClick = (ticket) => {
    setSelectedTicket(ticket);
    setShowEditModal(true);
    setActiveDropdown(null);
  };

  const handleDeleteClick = (ticket) => {
    setSelectedTicket(ticket);
    setShowDeleteModal(true);
    setActiveDropdown(null);
  };

  const handleUpdateTicket = (updatedTicket) => {
    if (selectedTicket) {
      onUpdate(selectedTicket.id, updatedTicket);
      setShowEditModal(false);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedTicket) {
      onDelete(selectedTicket.id);
      setShowDeleteModal(false);
    }
  };

  const toggleDropdown = (ticketId, event) => {
    event.stopPropagation();
    setActiveDropdown(activeDropdown === ticketId ? null : ticketId);
  };

  const handleDescriptionClick = (description) => {
    setSelectedDescription(description);
    setShowDescriptionModal(true);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return null;
    }
    return sortConfig.direction === "asc" ? (
      <ChevronUp size={18} />
    ) : (
      <ChevronDown size={18} />
    );
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table
          className={`min-w-full dark:text-white text-gray-700 py-10 mb-25 relative overflow-auto`}
        >
          <thead className={"dark:bg-gray-800 bg-gray-100"}>
            <tr>
              <th
                onClick={() => onSort("clientName")}
                className="cursor-pointer py-3 px-4 text-left"
              >
                <div className="flex items-center">
                  Client
                  {getSortIcon("clientName")}
                </div>
              </th>
              <th
                onClick={() => onSort("id")}
                className="cursor-pointer py-3 px-4 text-left"
              >
                <div className="flex items-center">
                  Ticket ID
                  {getSortIcon("id")}
                </div>
              </th>
              <th className="py-3 px-4 text-left max-w-20">Description</th>
              <th className="py-3 px-4 text-left">Comments</th>
              <th
                onClick={() => onSort("priority")}
                className="cursor-pointer py-3 px-4 text-left"
              >
                <div className="flex items-center">
                  Priority
                  {getSortIcon("priority")}
                </div>
              </th>
              <th
                onClick={() => onSort("status")}
                className="cursor-pointer py-3 px-4 text-left"
              >
                <div className="flex items-center">
                  Status
                  {getSortIcon("status")}
                </div>
              </th>
              <th
                onClick={() => onSort("createdTime")}
                className="cursor-pointer py-3 px-4 text-left"
              >
                <div className="flex items-center pr-2 mr-2">
                  Created
                  {getSortIcon("createdTime")}
                </div>
              </th>
              <th
                onClick={() => onSort("createdTime")}
                className="cursor-pointer py-3 px-4 text-left"
              >
                <div className="flex items-center pr-2 mr-2">Last Updated</div>
              </th>
              <th className="py-3 px-4 text-left">Assigned To</th>
              <th className="py-3 px-4 text-left">Attachments</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className={"dark:bg-gray-800 bg-white"}>
            {tickets.length > 0 ? (
              tickets.map((ticket) => (
                <tr
                  key={Math.trunc(Math.random() * 1000000)}
                  className={`border-t dark:border-gray-700 dark:hover:bg-gray-700 border-gray-200 hover:bg-gray-50 transition-colors`}
                >
                  <td className="py-3 px-4 min-w-30">
                    <div>
                      <div className="font-medium">{ticket.clientName}</div>
                      <div
                        className={`text-sm dark:text-gray-400 text-gray-500`}
                      >
                        {ticket.accountNumber}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">{ticket.id}</td>
                  <td 
                    className="py-3 px-4 max-w-xs truncate max-w-20 cursor-pointer hover:text-blue-500 transition-colors"
                    onClick={() => handleDescriptionClick(ticket.description)}
                    title="Click to view full description"
                  >
                    {ticket.description}
                  </td>
                  <td className="px-1 py-3">
                    <CommentCell
                      prevData={ticket}
                      comment={ticket.comments}
                      onCommentUpdate={null}
                    />
                  </td>
                  <td className="py-3 px-4">
                    <PriorityBadge priority={ticket.priority} />
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={ticket.status} />
                  </td>
                  <td className="py-3 px-4">
                    {formatTicketDate(ticket.createdTime)}
                  </td>
                  <td className="py-3 px-4">
                    {formatTicketDate(ticket.updatedTime)}
                  </td>
                  <td className="py-3 px-4">
                    {/* {(typeof (ticket.assignedTo )== "number") ? (
                      agents.find((agent) => agent.id === ticket.assignedTo)
                        ?.fullname || (
                        <span className={"dark:text-gray-400 text-gray-500"}>
                          Unassigned
                        </span>
                      )
                    ) : ( */}
                      <span className={"dark:text-gray-400 text-gray-500"}>
                        {/* {ticket.assignedTo} */}
                        {agents.find((agent) => agent.id === ticket.assignedTo)
                        ?.fullname || ticket.assignedTo }
                      </span>

                     {/* )} */}
                  </td>
                  <td className="py-3 px-4">
                    {ticket.attachments && ticket.attachments.length > 0 ? (
                      <div className="flex items-center space-x-1">
                        {ticket.attachments
                          .slice(0, 3)
                          .map((attachment, index) => (
                            <div
                              key={index}
                              className="relative group cursor-pointer"
                              title={`Attachment ${attachment.id}`}
                            >
                              <a
                                href={attachment.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                              >
                                <File className="h-5 w-5 text-xs font-medium text-blue-600 dark:text-blue-400" />
                              </a>
                            </div>
                          ))}
                        {ticket.attachments.length > 3 && (
                          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-xs">
                            +{ticket.attachments.length - 3}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        None
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 relative dropdown-container">
                    <button
                      onClick={(e) => toggleDropdown(ticket.id, e)}
                      className={`p-2 rounded flex items-center justify-center 
                          dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 dark:hover:text-gray-100
                          bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800`}
                      aria-label="Ticket actions"
                    >
                      <MoreVertical size={18} />
                    </button>

                    {/* Dropdown Menu */}
                    {activeDropdown === ticket.id && (
                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg z-10 dark:bg-gray-700 bg-white border dark:border-gray-600 border-gray-200 z-[999] overflow-auto">
                        <div className="py-1">
                          <button
                            onClick={() => handleEditClick(ticket)}
                            className="flex items-center w-full text-left px-4 py-2 dark:text-gray-200 text-gray-700 dark:hover:bg-gray-600 hover:bg-gray-100"
                          >
                            <Edit size={16} className="mr-2" />
                            Update/Assign
                          </button>
                          <button
                            onClick={() => handleDeleteClick(ticket)}
                            className="flex items-center w-full text-left px-4 py-2 dark:text-red-400 text-red-600 dark:hover:bg-gray-600 hover:bg-gray-100"
                          >
                            <Trash size={16} className="mr-2" />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="py-6 text-center">
                  <p className={"dark:text-gray-400 text-gray-500"}>
                    No tickets found. Try adjusting your search or filters.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showEditModal && selectedTicket && (
        <EditTicketModal
          ticket={selectedTicket}
          agents={agents}
          onUpdate={handleUpdateTicket}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {showDeleteModal && selectedTicket && (
        <DeleteConfirmModal
          ticket={selectedTicket}
          onConfirm={handleConfirmDelete}
          onClose={() => setShowDeleteModal(false)}
        />
      )}

      {showDescriptionModal && (
        <DescriptionModal
          description={selectedDescription}
          onClose={() => setShowDescriptionModal(false)}
        />
      )}
    </>
  );
};

export default TicketTable;