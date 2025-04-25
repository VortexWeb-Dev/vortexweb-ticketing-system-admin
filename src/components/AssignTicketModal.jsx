

import React, { useState } from "react";
import { X, CheckCircle, UserPlus, Users } from "lucide-react";

const AssignTicketModal = ({ ticket, agents, onAssign, onClose }) => {
  const [selectedAgent, setSelectedAgent] = useState(null);
  // Sort agents by number of assigned tickets (least to most)
  const sortedAgents = [...agents].sort(
    (a, b) => a.tickets.length - b.tickets.length
  );

  const handleAssign = (agent) => {
    setSelectedAgent(agent);
    // You could add a delay here before calling onAssign to show the selection animation
    setTimeout(() => onAssign(agent), 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4  bg-opacity-40 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-xl shadow-2xl dark:bg-gray-900 dark:text-white bg-white text-gray-800 transform transition-all">
        {/* Header with gradient background */}
        <div className="relative px-6 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-800 dark:to-purple-900">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <UserPlus className="text-white" size={22} />
              <h3 className="text-xl font-bold text-white">Assign Ticket</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white hover:bg-opacity-20 text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <div className="mt-2 flex items-center">
            <span className="px-2.5 py-1 text-xs font-medium bg-gray-700 bg-opacity-20 text-white rounded-full">
              #{ticket.id}
            </span>
            <span className="ml-2 text-sm text-white text-opacity-90">
              {ticket.title}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-5">
            <div className="flex items-center space-x-2 mb-2">
              <Users
                size={18}
                className="text-indigo-500 dark:text-indigo-400"
              />
              <p className="font-medium text-gray-700 dark:text-gray-200">
                Available Agents
              </p>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Agents are sorted by current workload (least busy first)
            </p>
          </div>

          <div className="overflow-y-auto max-h-80 pr-1">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleAssign("Unassigned")}
                  className="w-full text-left p-3 rounded-lg flex items-center justify-between transition
                    border border-gray-100 dark:border-gray-700 hover:border-indigo-200 hover:bg-indigo-50
                    dark:hover:border-indigo-900 dark:hover:bg-indigo-900 dark:hover:bg-opacity-30 focus:outline-none"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">Unassigned</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Remove current assignment
                    </span>
                  </div>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center">
                    {selectedAgent === "Unassigned" && (
                      <CheckCircle
                        size={20}
                        className="text-indigo-600 dark:text-indigo-400"
                      />
                    )}
                  </div>
                </button>
              </li>

              {sortedAgents.map((agent) => (
                <li key={agent.agentId}>
                  <button
                    onClick={() => handleAssign(agent.name)}
                    className="w-full text-left p-4 rounded-lg flex items-center justify-between transition
                      border border-gray-100 dark:border-gray-700 hover:border-indigo-200 hover:bg-indigo-50
                      dark:hover:border-indigo-900 dark:hover:bg-indigo-900 dark:hover:bg-opacity-30 focus:outline-none"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500
                        flex items-center justify-center font-bold text-white"
                      >
                        {agent.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">{agent.name}</span>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <span>{agent.position}</span>
                          <span className="mx-2">•</span>
                          <div className="flex items-center">
                            <span className="font-medium text-indigo-600 dark:text-indigo-400">
                              {agent.tickets.length}
                            </span>
                            <span className="ml-1">tickets</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center">
                      {selectedAgent === agent.name && (
                        <CheckCircle
                          size={20}
                          className="text-indigo-600 dark:text-indigo-400"
                        />
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 mr-2 rounded-lg border border-gray-300 dark:border-gray-600
              bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 
              text-gray-700 dark:text-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2
              focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
          >
            Cancel
          </button>
          <button
            onClick={() => selectedAgent && onAssign(selectedAgent)}
            disabled={!selectedAgent}
            className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition
            focus:outline-none focus:ring-1 focus:ring-indigo-400 dark:focus:ring-indigo-300
            disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignTicketModal;
