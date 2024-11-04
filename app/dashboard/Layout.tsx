import { ReactNode } from 'react'; 
import { Sidebar } from '@/components/ui/dashboard/SideBar'; 

interface DashboardLayoutProps {
  children: ReactNode;
}

const LayoutPage = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        {children} 
      </div>
    </div>
  );
};

export default LayoutPage;
