import React, { useState } from "react";
import { X, AlertCircle, CheckCircle2, Clock, UserCircle } from "lucide-react";
import CommentCell from "./CommentCell";

const EditTicketModal = ({ ticket, agents, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    title: ticket.title,
    description: ticket.description,
    status: ticket.status,
    priority: ticket.priority,
    category: ticket.category,
    assigned_to: ticket.assignedTo,
  });

  const statusOptions = [
    "Open",
    "In Progress",
    "Pending",
    "Resolved",
    "Closed",
  ];
  const priorityOptions = ["Low", "Medium", "High", "Critical"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Low":
        return "bg-blue-100 text-blue-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "High":
        return "bg-orange-100 text-orange-800";
      case "Critical":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Open":
        return <AlertCircle className="w-4 h-4" />;
      case "In Progress":
        return <Clock className="w-4 h-4" />;
      case "Resolved":
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-2 ]">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg  overflow-y-auto h-[98%]">
        <div className="flex justify-between items-center p-5 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-t-lg">
          <h2 className="text-xl font-bold dark:text-white flex items-center">
            <span className="mr-2">Update Ticket #{ticket.id}</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300 text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
              rows={3}
              placeholder="Ticket description..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-300 text-gray-700">
                Status
              </label>
              <div className="relative">
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                  {getStatusIcon(formData.status)}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-300 text-gray-700">
                Priority
              </label>
              <div className="relative">
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                  {priorityOptions.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <span
                    className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                      formData.priority
                    )}`}
                  >
                    {formData.priority}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300 text-gray-700">
              Assigned To
            </label>
            <div className="border rounded-lg dark:border-gray-600 overflow-hidden">
              <div className="flex items-center bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600 px-3 py-2">
                <UserCircle
                  className="text-gray-500 dark:text-gray-400 mr-2"
                  size={18}
                />
                <span className="text-sm font-medium dark:text-gray-300">
                  Select Agent
                </span>
              </div>

              <div className="max-h-64 overflow-y-auto">
                <div className="p-1">
                  <label className="flex items-center p-3 dark:hover:bg-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                    <input
                      type="radio"
                      name="assigned_to"
                      // value={ticket.assignedTo}
                      value={"Unassigned"}
                      checked={ticket.assignedTo == "Unassigned"}
                      onChange={handleChange}
                      className="mr-3 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <div className="font-medium dark:text-white">
                        Unassigned
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        No agent assigned
                      </div>
                    </div>
                  </label>

                 

                  {agents.map((agent) => (
                    <label
                      key={agent.id}
                      className="flex items-center p-3 dark:hover:bg-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="assigned_to"
                        value={Number(agent.id)}
                        checked={formData.assigned_to == agent.id}
                        onChange={handleChange}
                        className="mr-3 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <div className="font-medium dark:text-white">
                          {agent.fullname}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Currently handling {agent.tickets.length} ticket
                          {agent.tickets.length !== 1 ? "s" : ""}
                        </div>
                      </div>
                      <div className="ml-2">
                        <span
                          className={`inline-block px-2 py-1 text-xs font-medium rounded-full 
        ${
          agent.tickets.length > 5
            ? "bg-red-100 text-red-800"
            : agent.tickets.length > 3
            ? "bg-yellow-100 text-yellow-800"
            : "bg-green-100 text-green-800"
        }`}
                        >
                          {agent.tickets.length}
                        </span>
                      </div>
                    </label>
                  ))}

                  {/* {agents.map(agent => (
                    <label 
                      key={agent.id} 
                       className="flex items-center p-3 dark:hover:bg-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="assignedTo"
                        value={formData.assigned_to}
                        // checked={formData.assignedTo === agent.name}
                        onChange={handleChange}
                        className="mr-3 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <div className="font-medium dark:text-white">{agent.fullname}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Currently handling {agent.tickets.length} ticket{agent.tickets.length !== 1 ? 's' : ''}
                        </div>
                      </div>
                      <div className="ml-2">
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full 
                          ${agent.tickets.length > 5 ? 'bg-red-100 text-red-800' : 
                            agent.tickets.length > 3 ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-green-100 text-green-800'}`}>
                          {agent.tickets.length}
                        </span>
                      </div>
                    </label>
                  ))} */}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-8 pt-4 border-t dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border rounded-lg dark:border-gray-600 dark:text-gray-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
            >
              Update Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTicketModal;
