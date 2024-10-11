import Dashboard from '@/components/dashboard/index/page';
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
