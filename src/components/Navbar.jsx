import React from 'react'
import DarkModeToggle from './DarkModeToggle'
import { Search, Bell } from 'lucide-react'
const Navbar = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm p-4 flex items-center justify-between">
            <div className="flex items-center w-1/2 font-bold dark:text-white text-gray-700 text-3xl">
              Welcome Admin
            </div>
            <div className="flex items-center space-x-4">
              <DarkModeToggle/>
              <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 relative">
                <Bell size={20} />
                <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-medium">
                  JD
                </div>
              </div>
            </div>
          </header>
  )
}

export default Navbar