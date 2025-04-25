import React, { useState, useEffect } from 'react';
import TicketTable from './components/TicketTable';
import SearchBar from './components/SearchBar';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css'
import { ThemeProvider } from './context/ThemeContext'
import MainPage from './MainPage'
import {createServer, Server, Model, Response } from "miragejs"
import Navbar from './components/Navbar';
import {tickets, agents} from './mockData/mockData';
import fetchAllData from './utils/fetchAllData';
import NewTicketModal from './components/NewTicketModal';
import { Plus } from 'lucide-react';

//  createServer({
//     models: {
//       ticket: Model,
//       agent: Model,
//     },
//     seeds(server) {
//       // Create agents
//     agents.forEach((agent) => server.create("agent", agent)); //tickets come from mockData
    
//     //  create tickets
//     tickets.forEach((ticket) => server.create("ticket", ticket)); //tickets come from mockData

//     },
//     routes() {
//       this.namespace = 'api';
      
//       // GET all tickets
//       this.get('/tickets', (schema, request) => {
//         let { status, priority, sortBy, sortOrder } = request.queryParams;
//         let tickets = schema.tickets.all().models;
        
//         // Filter by status if provided
//         if (status) {
//           tickets = tickets.filter(ticket => ticket.status === status);
//         }
        
//         // Filter by priority if provided
//         if (priority) {
//           tickets = tickets.filter(ticket => ticket.priority === priority);
//         }
        
//         // Sort if sortBy is provided
//         if (sortBy) {
//           tickets = tickets.sort((a, b) => {
//             let aValue = a[sortBy];
//             let bValue = b[sortBy];
            
//             // Handle date sorting
//             if (sortBy === 'createdAt') {
//               aValue = new Date(aValue);
//               bValue = new Date(bValue);
//             }
            
//             if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
//             if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
//             return 0;
//           });
//         }
        
//         return tickets;
//       });
      
//       // GET specific ticket by ID
//       this.get('/tickets/:id', (schema, request) => {
//         let id = request.params.id;
//         let ticket = schema.tickets.find(id);
        
//         if (ticket) {
//           return ticket;
//         } else {
//           return new Response(404, {}, { error: 'Ticket not found' });
//         }
//       });
      

//       // PUT to update ticket (generalized for all fields)
//       this.put('/tickets/:id', (schema, request) => {
//         const id = request.params.id;
//         const attrs = JSON.parse(request.requestBody);
//         const ticket = schema.tickets.find(id);
        
//         if (ticket) {
//           // Check if we're changing the assignment
//           const oldAssignedTo = ticket.assignedTo;
//           const newAssignedTo = attrs.assignedTo;
          
//           // Update the ticket with all provided fields
//           ticket.update({
//             // ...attrs,
//             updatedAt: new Date().toISOString()
//           });
          
//           // Handle agent assignment changes
//           if (newAssignedTo !== oldAssignedTo) {
//             // If removing from an agent, decrement their count
//             if (oldAssignedTo !== 'Unassigned') {
//               const oldAgent = schema.agents.findBy({ name: oldAssignedTo });
//               if (oldAgent) {
//                 oldAgent.update({ assignedTickets: Math.max(0, oldAgent.assignedTickets - 1) });
//               }
//             }
            
//             // If assigning to a new agent, increment their count
//             if (newAssignedTo !== 'Unassigned') {
//               const newAgent = schema.agents.findBy({ name: newAssignedTo });
//               if (newAgent) {
//                 newAgent.update({ assignedTickets: newAgent.assignedTickets + 1 });
//               }
//             }
//           }
          
//           return ticket;
//         } else {
//           return new Response(404, {}, { error: 'Ticket not found' });
//         }
//       });
      
//       // DELETE ticket
//       this.delete('/tickets/:id', (schema, request) => {
//         const id = request.params.id;
//         const ticket = schema.tickets.find(id);
        
//         if (ticket) {
//           // If ticket was assigned to an agent, decrement their count
//           if (ticket.assignedTo !== 'Unassigned') {
//             const agent = schema.agents.findBy({ name: ticket.assignedTo });
//             if (agent) {
//               agent.update({ assignedTickets: Math.max(0, agent.assignedTickets - 1) });
//             }
//           }
          
//           ticket.destroy();
//           return new Response(200, {}, { success: true });
//         } else {
//           return new Response(404, {}, { error: 'Ticket not found' });
//         }
//       });
      
//       // GET all agents
//       this.get('/agents', (schema) => {
//         return schema.agents.all().models.sort((a, b) => a.assignedTickets - b.assignedTickets);
//       });
      
//       // Allow passthrough for other requests
//       this.passthrough();
//     },
//   });

  function App() {
    const [tickets, setTickets] = useState([]);
    const [filteredTickets, setFilteredTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortConfig, setSortConfig] = useState({
      key: 'createdTime',
      direction: 'desc'
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');
    const [showNewTicketModal, setShowNewTicketModal] = useState(false);
    const [error, setError] = useState(true);

    useEffect(() => {
      fetchAllData(`${import.meta.env.VITE_GETALL_TICKET}`+'&limit=50&page=', {}, setLoading, null).then((data) => {
        setTickets(data);
        setFilteredTickets(data);
      });
    }, []);
  
    // Apply sorting and filtering
    useEffect(() => {
      
      let result = [...tickets];
      
      // Apply search filtering
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        result = result.filter(ticket => 
          ticket.clientName.toLowerCase().includes(query) ||
          // ticket.id.includes(query) ||
          ticket.status.toLowerCase().includes(query) ||
          ticket.description.toLowerCase().includes(query)
        );
      }
      
      // Apply status filter
      if (statusFilter) {
        result = result.filter(ticket => ticket.status === statusFilter);
      }
      
      // Apply priority filter
      if (priorityFilter) {
        result = result.filter(ticket => ticket.priority === priorityFilter);
      }
      
      // Apply sorting
      if (sortConfig.key) {
        result.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
          }
          return 0;
        });
      }
      
      setFilteredTickets(result);
    }, [tickets, sortConfig, searchQuery, statusFilter, priorityFilter]);
  
    const handleSort = (key) => {
      let direction = 'asc';
      if (sortConfig.key === key && sortConfig.direction === 'asc') {
        direction = 'desc';
      }
      setSortConfig({ key, direction });
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
        
        const response = await fetch(`${import.meta.env.VITE_UPDATE_TICKET}${ticketId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(ticketData),
        });
        
        if (response.ok) {
          const updatedTicket = await response.json();
          console.log(updatedTicket);
          
          // Update the ticket in the state
          setTickets(tickets.map(ticket => 
            ticket.id === ticketId ? { ...ticket, assignedTo: ticketData.assigned_to, status: ticketData.status, priority:ticketData.priority, description:ticketData.description  } : ticket
          ));
        } else {
          console.error('Failed to update ticket');
        }
      } catch (error) {
        console.error('Error updating ticket:', error);
      }
    };
    
    const handleTicketDelete = async (ticketId) => {
      try {
        const response = await fetch(`${import.meta.env.VITE_DELETE_TICKET}${ticketId}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          // Remove the ticket from the state
          setTickets(tickets.filter(ticket => ticket.id !== ticketId));
        } else {
          console.error('Failed to delete ticket');
        }
      } catch (error) {
        console.error('Error deleting ticket:', error);
      }
    };
  
    return (
      <ThemeProvider>
      <Navbar />
      <div className={`min-h-screen transition-colors duration-200 dark:bg-gray-900 dark:text-white bg-gray-50 text-gray-900`}>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 p-4">
              <div>
                <p className="text-xl font-semibold text-blue-800 dark:text-blue-200">
                  Track and manage your support tickets!
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

        <main className="container mx-auto py-6 px-4">
          <SearchBar 
            onSearch={handleSearch} 
            onStatusChange={handleStatusFilter}
            onPriorityChange={handlePriorityFilter}
            />
          
          {loading ? (
            <LoadingSpinner />
          ) : (
            <TicketTable 
              tickets={filteredTickets} 
              sortConfig={sortConfig} 
              onSort={handleSort}
              onUpdate={handleTicketUpdate}
              onDelete={handleTicketDelete}
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
        </main>
      </div>
    </ThemeProvider>
    );
  }
  
  export default App;