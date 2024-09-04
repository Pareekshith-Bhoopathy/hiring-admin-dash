'use client'

import React, { forwardRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LayoutDashboard, BarChart2, Briefcase, Users, Building, Settings, IndianRupeeIcon, X, UserCog } from 'lucide-react';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const menuItems = [
  { href: '/admin/dashboard', title: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/analytics', title: 'Analytics', icon: BarChart2 },
  { href: '/admin/jobs', title: 'Jobs', icon: Briefcase },
  { href: '/admin/candidates', title: 'Candidates', icon: Users },
  { href: '/admin/evaluators', title: 'Evaluators', icon:  UserCog },
  { href: '/admin/companies', title: 'Companies', icon: Building },
  { href: '/admin/transactions', title: 'Transactions', icon: IndianRupeeIcon },
  { href: '/admin/settings', title: 'Settings', icon: Settings },
];

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(({ open, setOpen }, ref) => {
  const router = useRouter();

  return (
    <div ref={ref} className={`flex flex-col h-full lg:block fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-white border-r border-gray-200 ${open ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'} lg:translate-x-0 lg:static lg:inset-0`}>
      <div className="flex items-center justify-between p-6">
        <h1 className="text-2xl font-bold text-gray-800 ml-4">TA Pro</h1>
        <button onClick={() => setOpen(false)} className="lg:hidden">
          <X className="w-6 h-6" />
        </button>
      </div>
      <nav className="flex-1 mt-6 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = router.pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-6 py-4 mb-2 mx-4 rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-5 h-5 mr-4 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
              <span className={`font-medium ${isActive ? 'text-indigo-600' : 'text-gray-600'}`}>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;