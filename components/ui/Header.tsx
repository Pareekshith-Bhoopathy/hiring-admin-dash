import React from 'react';
import { usePageTitle } from '../PageTitleContext';
import { BellIcon, MagnifyingGlassIcon, PersonIcon } from '@radix-ui/react-icons';
import { Menu } from 'lucide-react';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { pageTitle } = usePageTitle();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex justify-between items-center px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-500 focus:outline-none focus:text-gray-700 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-800 ml-2 lg:ml-0">{pageTitle}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          <BellIcon className="w-6 h-6 text-gray-600 cursor-pointer" />
          <PersonIcon className="w-6 h-6 text-gray-600 cursor-pointer" />
        </div>
      </div>
    </header>
  );
};

export default Header;