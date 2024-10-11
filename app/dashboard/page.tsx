import Dashboard from '@/components/pages/dashboard/Index';
import AppBar from '@/components/layout/AppBar';
/*import Sidebar from "@/components/SideBar";*/
export default function AppDashboard() {
  return(
    <div>
        <AppBar/>
        <div>
            <Dashboard/>
        </div>
    
    </div>
  );
}
