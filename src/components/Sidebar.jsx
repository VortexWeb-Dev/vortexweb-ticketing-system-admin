import React from 'react'
import {
    Plus,
    Search,
    Bell,
    Menu,
    Sun,
    Moon,
    Filter,
    Calendar,
    PieChart,
    List,
    Eye,
    Clock,
    CloudUpload
  } from "lucide-react";

const Sidebar = ({sidebarOpen, setSidebarOpen}) => {
  return (
    <aside
    className={`${
      sidebarOpen ? "w-64" : "w-20"
    } bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col`}
  >
    <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        {sidebarOpen &&
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Raise Ticket
          </h1>
        }
      </div>
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex item-center justify-center"
      >{
        !sidebarOpen ? 
        <Menu size={20} />
        : <div className='text-xl'>✘</div>
      }
      </button>
    </div>

    <nav className="flex-1 p-4">
      <ul className="space-y-2">
        <li>
          <a
            href="#"
            className="flex items-center p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
          >
            <PieChart size={20} className="mr-3" />
            {sidebarOpen && <span>Dashboard</span>}
          </a>
        </li>
       
        <li>
          <a
            href="#"
            className="flex items-center p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Calendar size={20} className="mr-3" />
            {sidebarOpen && <span>Timeline</span>}
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Eye size={20} className="mr-3" />
            {sidebarOpen && <span>Knowledge Base</span>}
          </a>
        </li>
      </ul>
    </nav>

  </aside>
  )
}

export default Sidebar