import React from 'react';
import Sidebar from './SideBar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ">
        {children}
      </main>
    </div>
  );
};

export default Layout;
