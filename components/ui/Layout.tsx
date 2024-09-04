'use client'

import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import Header from './Header';
import { PageTitleProvider } from '../PageTitleContext';
import { useOutsideClick } from '../../hooks/useOutsideClick';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useOutsideClick(sidebarRef, () => {
    if (sidebarOpen) {
      setSidebarOpen(false);
    }
  });

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <PageTitleProvider>
      <div className="flex h-screen bg-gray-100">
        <div ref={sidebarRef} className="z-20">
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        </div>
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </PageTitleProvider>
  );
};

export default Layout;