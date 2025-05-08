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
import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";
import formatTicketDate from "../utils/formatTicketDate";
import DeleteConfirmModal from "./DeleteConfirmModal";
import FullBugModal from "./FullBugModal";
import EditBugModal from "./EditBugModal";
import DeleteBugConfirmModal from "./DeleteBugConfirmModal";

// New component for the description modal
const DescriptionModal = ({ description, onClose }) => {
  return (
    <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium dark:text-white text-gray-900">
            Bug Description
          </h3>
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

// New component for steps to reproduce modal
const StepsModal = ({ title, content, onClose }) => {
  return (
    <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium dark:text-white text-gray-900">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        <div className="dark:text-gray-300 text-gray-700 whitespace-pre-wrap break-words max-h-96 overflow-y-auto">
          {content}
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


const BugTable = ({ bugs, sortConfig, onSort, onUpdate, onDelete }) => {
  const [selectedBug, setSelectedBug] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showStepsModal, setShowStepsModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", content: "" });
  const [selectedDescription, setSelectedDescription] = useState("");
  const [employees, setEmployees] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showFullModal, setShowFullModal] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_EMPLOYEES);
        const data = await response.json();
        console.log(data.employees);

        setEmployees(data.employees);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();

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

  const handleEditClick = (bug) => {
    setSelectedBug(bug);
    setShowEditModal(true);
    setActiveDropdown(null);
  };

  const handleDeleteClick = (bug) => {
    setSelectedBug(bug);
    setShowDeleteModal(true);
    setActiveDropdown(null);
  };

  const handleUpdateBug = (updatedBug) => {
    if (selectedBug) {
      onUpdate(selectedBug.id, updatedBug);
      setShowEditModal(false);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedBug) {
      onDelete(selectedBug.id);
      setShowDeleteModal(false);
    }
  };

  const toggleDropdown = (bugId, event) => {
    event.stopPropagation();
    setActiveDropdown(activeDropdown === bugId ? null : bugId);
  };

  const handleDescriptionClick = (description) => {
    setSelectedDescription(description);
    setShowDescriptionModal(true);
  };

  const handleStepsClick = (title, content) => {
    setModalContent({ title, content });
    setShowStepsModal(true);
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
        <table className="min-w-full dark:text-white text-gray-700 py-10 mb-25 relative overflow-auto">
          <thead className="dark:bg-gray-800 bg-gray-100">
            <tr>
              <th
                onClick={() => onSort("id")}
                className="cursor-pointer py-3 px-4 text-left"
              >
                <div className="flex items-center">
                  Bug ID
                  {getSortIcon("id")}
                </div>
              </th>
              <th
                onClick={() => onSort("title")}
                className="cursor-pointer py-3 px-4 text-left"
              >
                <div className="flex items-center">
                  Title
                  {getSortIcon("title")}
                </div>
              </th>
              <th className="py-3 px-4 text-left max-w-20">Description</th>
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
                onClick={() => onSort("priority")}
                className="cursor-pointer py-3 px-4 text-left"
              >
                <div className="flex items-center">
                  Priority
                  {getSortIcon("priority")}
                </div>
              </th>
              {/* <th
                onClick={() => onSort("severity")}
                className="cursor-pointer py-3 px-4 text-left"
              >
                <div className="flex items-center">
                  Severity
                  {getSortIcon("severity")}
                </div>
              </th> */}
              <th
                onClick={() => onSort("category")}
                className="cursor-pointer py-3 px-4 text-left"
              >
                <div className="flex items-center">
                  Category
                  {getSortIcon("category")}
                </div>
              </th>
              <th className="py-3 px-4 text-left">Steps</th>
              <th className="py-3 px-4 text-left">Environment</th>
              <th
                onClick={() => onSort("createdTime")}
                className="cursor-pointer py-3 px-4 text-left"
              >
                <div className="flex items-center">
                  Created
                  {getSortIcon("createdTime")}
                </div>
              </th>
              <th className="py-3 px-4 text-left">Assigned To</th>
              <th className="py-3 px-4 text-left">Actions</th>
              <th className="py-3 px-4 text-left"></th>
            </tr>
          </thead>
          <tbody className="dark:bg-gray-800 bg-white">
            {bugs.length > 0 ? (
              bugs.map((bug) => (
                <tr
                  key={bug.id}
                  className="border-t dark:border-gray-700 dark:hover:bg-gray-700 border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4">{bug.id}</td>
                  <td className="py-3 px-4 font-medium">{bug.title}</td>
                  <td
                    className="py-3 px-4 max-w-xs truncate cursor-pointer hover:text-blue-500 transition-colors"
                    onClick={() => handleDescriptionClick(bug.description)}
                    title="Click to view full description"
                  >
                    {bug.description}
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={bug.status} />
                  </td>
                  <td className="py-3 px-4">
                    <PriorityBadge priority={bug.priority} />
                  </td>
                  {/* <td className="py-3 px-4">
                    <SeverityBadge severity={bug.severity} />
                  </td> */}
                  <td className="py-3 px-4">
                    <span className="text-sm">{bug.category || "Not set"}</span>
                  </td>
                  <td
                    className="py-3 px-4 max-w-xs truncate cursor-pointer hover:text-blue-500 transition-colors"
                    onClick={() =>
                      handleStepsClick(
                        "Steps to Reproduce",
                        bug.stepsToReproduce
                      )
                    }
                    title="Click to view steps to reproduce"
                  >
                    {bug.stepsToReproduce ? "View Steps" : "No Steps"}
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm">
                      {bug.environment || "Not specified"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {formatTicketDate(bug.createdTime)}
                  </td>
                  <td className="py-3 px-4">
                    <span className="dark:text-gray-400 text-gray-500">
                    {
    employees.find(a => a.id === String(bug.assignedTo))?.fullname
    ?? bug.assignedTo
    ?? "Unassigned"
  }
                      {/* {bug.assignedTo || "Unassigned"} */}
                    </span>
                  </td>
                  <td className="py-3 px-4 relative dropdown-container">
                    <button
                      onClick={(e) => toggleDropdown(bug.id, e)}
                      className="p-2 rounded flex items-center justify-center 
                          dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 dark:hover:text-gray-100
                          bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800"
                      aria-label="Bug actions"
                    >
                      <MoreVertical size={18} />
                    </button>

                    {/* Dropdown Menu */}
                    {activeDropdown === bug.id && (
                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg z-10 dark:bg-gray-700 bg-white border dark:border-gray-600 border-gray-200 z-50 overflow-auto">
                        <div className="py-1">
                          <button
                            onClick={() => handleEditClick(bug)}
                            className="flex items-center w-full text-left px-4 py-2 dark:text-gray-200 text-gray-700 dark:hover:bg-gray-600 hover:bg-gray-100"
                          >
                            <Edit size={16} className="mr-2" />
                            Update/Assign
                          </button>
                        
                          <button
                            onClick={() => handleDeleteClick(bug)}
                            className="flex items-center w-full text-left px-4 py-2 dark:text-red-400 text-red-600 dark:hover:bg-gray-600 hover:bg-gray-100"
                          >
                            <Trash size={16} className="mr-2" />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-md text-blue-600 dark:text-blue-300">
                    <div
                      className="underline hover:cursor-pointer"
                      onClick={() => {
                        setSelectedBug(bug);
                        setShowFullModal(true);
                      }}
                    >
                      VIEW
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="py-6 text-center">
                  <p className="dark:text-gray-400 text-gray-500">
                    No bugs found. Try adjusting your search or filters.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <FullBugModal
        bug={selectedBug}
        isOpen={showFullModal}
        onClose={() => setShowFullModal(false)}
      />
{showEditModal && selectedBug && employees.length !== 0 && (
  <EditBugModal
    bug={selectedBug}
    agents={employees}
    onUpdate={handleUpdateBug}
    onClose={() => setShowEditModal(false)}
  />
)}


      {showDeleteModal && selectedBug && (
        <DeleteBugConfirmModal
          bug={selectedBug}
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

      {showStepsModal && (
        <StepsModal
          title={modalContent.title}
          content={modalContent.content}
          onClose={() => setShowStepsModal(false)}
        />
      )}
    </>
  );
};

export default BugTable;
