import React, { useState } from "react";
import { X, AlertCircle, CheckCircle2, Clock, UserCircle, CalendarIcon, Building, Mail, Globe, FileText, Bug, Clipboard } from "lucide-react";

const EditBugModal = ({ bug, agents, onUpdate, onClose }) => {
    console.log(agents);
    
  const [formData, setFormData] = useState({
    title: bug.title || "",
    description: bug.description || "",
    priority: bug.priority || "Medium",
    category: bug.category || "Feature Request",
    status: bug.status || "Open",
    severity: bug.severity || "minor",
    comments: bug.comments || "",
    planned_hours: bug.plannedHours || "",
    client_name: bug.clientName || "",
    company_name: bug.companyName || "",
    client_email: bug.clientEmail || "",
    portal_url: bug.portalUrl || "",
    assigned_to: bug.assignedTo || "",
    reported_by: bug.reportedBy || "",
    date_found: bug.dateFound || "",
    environment: bug.environment || "",
    steps_to_reproduce: bug.stepsToReproduce || "",
    expected_result: bug.expectedResult || "",
    actual_result: bug.actualResult || "",
    logs: bug.logs || ""
  });

  const statusOptions = ["Open", "In Progress", "Resolved", "Closed", "Reopened"];
  const priorityOptions = ["Low", "Medium", "High"];
  const categoryOptions = ["Technical Support", "Billing", "Feature Request", "Account Access", "Other"];
  const severityOptions = ["critical", "major", "minor", "trivial"];

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
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Critical":
        return "bg-red-100 text-red-800";
      case "Major":
        return "bg-orange-100 text-orange-800";
      case "Minor":
        return "bg-yellow-100 text-yellow-800";
      case "Trivial":
        return "bg-green-100 text-green-800";
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
      case "Closed":
        return <X className="w-4 h-4" />;
      case "Reopened":
        return <Clock className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-2">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl overflow-y-auto h-[98%]">
        <div className="flex justify-between items-center p-5 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-t-lg">
          <h2 className="text-xl font-bold dark:text-white flex items-center">
            <Bug className="mr-2" />
            <span>Edit Bug #{bug.id}</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-300 text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Bug title..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-300 text-gray-700">
                Planned Hours
              </label>
              <input
                type="number"
                name="planned_hours"
                value={formData.planned_hours}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Estimated hours to fix..."
              />
            </div>
          </div>

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
              placeholder="Bug description..."
            />
          </div>

          {/* Status, Priority, Category, Severity */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
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

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-300 text-gray-700">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-300 text-gray-700">
                Severity
              </label>
              <div className="relative">
                <select
                  name="severity"
                  value={formData.severity}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                  {severityOptions.map((severity) => (
                    <option key={severity} value={severity}>
                      {severity}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <span
                    className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(
                      formData.severity
                    )}`}
                  >
                    {formData.severity}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Client Information */}
          <div className="border-t pt-5 mt-5 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 dark:text-white flex items-center">
              <Building className="mr-2" size={18} />
              Client Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-300 text-gray-700">
                  Client Name
                </label>
                <input
                  type="text"
                  name="client_name"
                  value={formData.client_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Client name..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-300 text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Company name..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-300 text-gray-700">
                  Client Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="client_email"
                    value={formData.client_email}
                    onChange={handleChange}
                    className="w-full pl-10 px-4 py-3 border rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Email address..."
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    <Mail className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-300 text-gray-700">
                  Portal URL
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="portal_url"
                    value={formData.portal_url}
                    onChange={handleChange}
                    className="w-full pl-10 px-4 py-3 border rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Client portal URL..."
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    <Globe className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Assignment Information */}
          <div className="border-t pt-5 mt-5 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 dark:text-white flex items-center">
              <UserCircle className="mr-2" size={18} />
              Assignment Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-300 text-gray-700 underline">
  Assigned To:{" "}
  {
    agents.find(a => a.id === String(formData.assigned_to))?.fullname
    ?? formData.assigned_to
    ?? "Unassigned"
  }
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
                          value="Unassigned"
                          checked={formData.assigned_to === "Unassigned"}
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
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-300 text-gray-700">
                  Reported By
                </label>
                <input
                  type="text"
                  name="reported_by"
                  value={formData.reported_by}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Reporter name..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-300 text-gray-700">
                  Date Found
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="date_found"
                    value={formData.date_found}
                    onChange={handleChange}
                    className="w-full pl-10 px-4 py-3 border rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    <CalendarIcon className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-300 text-gray-700">
                  Environment
                </label>
                <input
                  type="text"
                  name="environment"
                  value={formData.environment}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Development, Production, etc..."
                />
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div className="border-t pt-5 mt-5 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 dark:text-white flex items-center">
              <FileText className="mr-2" size={18} />
              Technical Details
            </h3>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-300 text-gray-700">
                  Steps to Reproduce
                </label>
                <textarea
                  name="steps_to_reproduce"
                  value={formData.steps_to_reproduce}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
                  rows={3}
                  placeholder="Detailed steps to reproduce the bug..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300 text-gray-700">
                    Expected Result
                  </label>
                  <textarea
                    name="expected_result"
                    value={formData.expected_result}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
                    rows={3}
                    placeholder="What should happen..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300 text-gray-700">
                    Actual Result
                  </label>
                  <textarea
                    name="actual_result"
                    value={formData.actual_result}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
                    rows={3}
                    placeholder="What actually happens..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-300 text-gray-700">
                  Logs
                </label>
                <textarea
                  name="logs"
                  value={formData.logs}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical font-mono text-sm"
                  rows={3}
                  placeholder="Relevant log output..."
                />
              </div>
            </div>
          </div>

          {/* Comments */}
          <div className="border-t pt-5 mt-5 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 dark:text-white flex items-center">
              <Clipboard className="mr-2" size={18} />
              Additional Comments
            </h3>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
              rows={3}
              placeholder="Any additional comments or notes..."
            />
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
              Update Bug
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBugModal;