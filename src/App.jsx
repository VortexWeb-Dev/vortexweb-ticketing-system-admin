import React, { useState, useEffect } from "react";
import TicketTable from "./components/TicketTable";
import SearchBar from "./components/SearchBar";
import LoadingSpinner from "./components/LoadingSpinner";
import "./App.css";
import { ThemeProvider } from "./context/ThemeContext";
import MainPage from "./MainPage";
import { createServer, Server, Model, Response } from "miragejs";
import Navbar from "./components/Navbar";
import { tickets, agents } from "./mockData/mockData";
import fetchAllData from "./utils/fetchAllData";
import fetchAllBugs from "./utils/fetchAllBugs";
import NewTicketModal from "./components/NewTicketModal";
import { Plus } from "lucide-react";
import NewBugModal from "./components/NewBugModal";
import BugsTable from "./components/BugsTable";
import removeEmptyFields from "./utils/removeEmptyFields";

function App() {
  const [tickets, setTickets] = useState([]);
  const [bugs, setBugs] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [filteredBugs, setFilteredBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({
    key: "createdTime",
    direction: "desc",
  });
  const [bugSortConfig, setBugSortConfig] = useState({
    key: "createdTime",
    direction: "desc",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [showNewBugModal, setShowNewBugModal] = useState(false);
  const [currentTab, setCurrentTab] = useState(localStorage.getItem("currentTab")?localStorage.getItem("currentTab"):"tickets");
  const [error, setError] = useState(true);

  useEffect(() => {
    fetchAllData(
      `${import.meta.env.VITE_GETALL_TICKET}` + "&limit=50&page=",
      {},
      setLoading,
      null
    ).then((data) => {
      setTickets(data);
      setFilteredTickets(data);
    });
  }, []);

  useEffect(() => {
    fetchAllBugs(
      `${import.meta.env.VITE_GETALL_BUGS}` + "&limit=50&page=",
      {},
      setLoading,
      null
    ).then((data) => {
      setBugs(data);
      setFilteredBugs(data);
    });
  }, []);

  // Apply sorting and filtering
  useEffect(() => {
    if(localStorage.getItem("currentTab") == "tickets"){

      let result = [...tickets];
      
      // Apply search filtering
      if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (ticket) =>
          ticket.title.toLowerCase().includes(query) ||
          ticket.clientName.toLowerCase().includes(query) ||
          // ticket.id.includes(query) ||
          ticket.status.toLowerCase().includes(query) ||
          ticket.description.toLowerCase().includes(query)
        );
    }

    // Apply status filter
    if (statusFilter) {
      result = result.filter((ticket) => ticket.status === statusFilter);
    }
    
    // Apply priority filter
    if (priorityFilter) {
      result = result.filter((ticket) => ticket.priority === priorityFilter);
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    
    setFilteredTickets(result);
  }else{
    let result = [...bugs];
      
    // Apply search filtering
    if (searchQuery) {
    const query = searchQuery.toLowerCase();
    result = result.filter(
      (bug) =>
        bug.title.toLowerCase().includes(query) ||
        bug.clientName.toLowerCase().includes(query) ||
        bug.status.toLowerCase().includes(query) ||
        bug.description.toLowerCase().includes(query)
      );
  }

  // Apply status filter
  if (statusFilter) {
    result = result.filter((bug) => bug.status === statusFilter);
  }
  
  // Apply priority filter
  if (priorityFilter) {
    result = result.filter((bug) => bug.priority === priorityFilter);
  }

  // Apply sorting
  if (bugSortConfig.key) {
    result.sort((a, b) => {
      if (a[bugSortConfig.key] < b[bugSortConfig.key]) {
        return bugSortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[bugSortConfig.key] > b[bugSortConfig.key]) {
        return bugSortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }
  
  setFilteredBugs(result);
  }

  }, [tickets, bugs, sortConfig, bugSortConfig, searchQuery, statusFilter, priorityFilter]);


  

  const handleSort = (key) => {
    if(localStorage.getItem("currentTab") == "tickets"){
      let direction = "asc";
      if (sortConfig.key === key && sortConfig.direction === "asc") {
        direction = "desc";
      }
      setSortConfig({ key, direction });
    } else{
      let direction = "asc";
      if (bugSortConfig.key === key && bugSortConfig.direction === "asc") {
        direction = "desc";
      }
      setBugSortConfig({ key, direction });
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };

  const handlePriorityFilter = (priority) => {
    setPriorityFilter(priority);
  };

  const handleTicketUpdate = async (ticketId, ticketData) => {
    try {
      console.log(ticketData);
      console.log(ticketData.assignedTo);

      const response = await fetch(
        `${import.meta.env.VITE_UPDATE_TICKET}${ticketId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ticketData),
        }
      );

      if (response.ok) {
        const updatedTicket = await response.json();
        console.log(updatedTicket);

        // Update the ticket in the state
        setTickets(
          tickets.map((ticket) =>
            ticket.id === ticketId
              ? {
                  ...ticket,
                  assignedTo: ticketData.assigned_to,
                  status: ticketData.status,
                  priority: ticketData.priority,
                  description: ticketData.description,
                }
              : ticket
          )
        );
      } else {
        console.error("Failed to update ticket");
      }
    } catch (error) {
      console.error("Error updating ticket:", error);
    }
  };

  const handleBugUpdate = async (bugId, bugData) => {
    try {
      
      console.log("cleansed fields: ",removeEmptyFields(bugData));
      
      console.log(bugData);
      console.log(bugData.assigned_to);

      const response = await fetch(
        `${import.meta.env.VITE_UPDATE_BUG}${bugId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(removeEmptyFields(bugData)),
        }
      );

      if (response.ok) {
        const updatedBug = await response.json();
        console.log(updatedBug);

        // Update the bug in the state
        setBugs(
          bugs.map((bug) =>
            bug.id === bugId
              ? {
                  ...bug,
                  title: bugData.title,
                  description: bugData.description,
                  priority: bugData.priority,
                  category: bugData.category,
                  status: bugData.status,
                  severity: bugData.severity,
                  comments: bugData.comments,
                  plannedHours: bugData.planned_hours,
                  clientName: bugData.client_name,
                  companyName: bugData.company_name,
                  clientEmail: bugData.client_email,
                  portalUrl: bugData.portal_url,
                  assignedTo: bugData.assigned_to,
                  reportedBy: bugData.reported_by,
                  dateFound: bugData.date_found,
                  environment: bugData.environment,
                  stepsToReproduce: bugData.steps_to_reproduce,
                  expectedResult: bugData.expected_result,
                  actualResult: bugData.actual_result,
                  logs: bugData.logs,
                }
              : bug
          )
        );
      } else {
        console.error("Failed to update bug");
      }
    } catch (error) {
      console.error("Error updating bug:", error);
    }
  };

  const handleTicketDelete = async (ticketId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_DELETE_TICKET}${ticketId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Remove the ticket from the state
        setTickets(tickets.filter((ticket) => ticket.id !== ticketId));
      } else {
        console.error("Failed to delete ticket");
      }
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  };

  const handleBugDelete = async (bugId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_DELETE_BUG}${bugId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Remove the bug from the state
        setBugs(bugs.filter((bug) => bug.id !== bugId));
      } else {
        console.error("Failed to delete bug");
      }
    } catch (error) {
      console.error("Error deleting bug:", error);
    }
  };

  return (
    <ThemeProvider>
      <Navbar />
      <div
        className={`min-h-screen transition-colors duration-200 dark:bg-gray-900 dark:text-white bg-gray-50 text-gray-900`}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4">
          <div>
            <p className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-6">
              Track and manage your support tickets!
            </p>

            <div className="flex space-x-4">
              <button
                onClick={() => {
                  localStorage.setItem("currentTab","tickets")
                  setCurrentTab("tickets")
                  
                }}
                className={`px-4 py-2 rounded-md  ${
                  localStorage.getItem("currentTab") === "tickets"
                    ? "bg-blue-600 text-white dark:bg-blue-500 dark:text-white font-medium shadow-lg"
                    : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                Tickets
              </button>

              <button
                onClick={() =>{
                  localStorage.setItem("currentTab","bugs")
                   setCurrentTab("bugs")
                  }}
                className={`px-4 py-2 rounded-md  ${
                  localStorage.getItem("currentTab") === "bugs"
                    ? "bg-blue-600 text-white dark:bg-blue-500 dark:text-white font-medium shadow-lg"
                    : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                Bugs
              </button>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setShowNewTicketModal(true)}
              className="mt-4 md:mt-0 flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors"
            >
              <Plus size={18} className="mr-1" />
              Create New Ticket
            </button>

            <button
              onClick={() => setShowNewBugModal(true)}
              className="mt-4 md:mt-0 flex items-center bg-yellow-500 dark:bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors"
            >
              <Plus size={18} className="mr-1" />
              Raise Bug
            </button>
          </div>
        </div>

        <main className="container mx-auto py-6 px-4">
          <SearchBar
            onSearch={handleSearch}
            onStatusChange={handleStatusFilter}
            onPriorityChange={handlePriorityFilter}
          />

          {loading ? (
            <LoadingSpinner />
          ) : currentTab == "tickets" ? (
            <TicketTable
              tickets={filteredTickets}
              sortConfig={sortConfig}
              onSort={handleSort}
              onUpdate={handleTicketUpdate}
              onDelete={handleTicketDelete}
            />
          ) : (
            <BugsTable
              bugs={filteredBugs}
              sortConfig={sortConfig}
              onSort={handleSort}
              onUpdate={handleBugUpdate}
              onDelete={handleBugDelete}
            />
          )}
          {/* New Ticket Modal */}
          {showNewTicketModal && (
            <NewTicketModal
              onClose={() => setShowNewTicketModal(false)}
              setTickets={setTickets}
              setLoading={setLoading}
              setError={setError}
            />
          )}

          {/* New Bug Modal */}
          {showNewBugModal && (
            <NewBugModal
              onClose={() => setShowNewBugModal(false)}
              setBugs={setBugs}
              setLoading={setLoading}
              setError={setError}
            />
          )}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
