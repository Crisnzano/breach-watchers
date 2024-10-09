import Link from 'next/link';
import { FaRegFileAlt, FaUpload, FaCheckCircle, FaGlobe, FaCog } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="h-screen w-65 bg-white text-black">
      <div className="p-6">
        <h2 className="text-2xl font-bold">BreachWatchers</h2>
      </div>
      <nav className="mt-10">
        <Link href="/dashboard" className="block py-2 px-6 rounded-lg hover:bg-blue-300 flex items-center">
          <FaRegFileAlt className="mr-3" /> Reports
        </Link>
        <Link href="/pages/dashboard/checklist" className="block py-2 px-6 rounded-lg hover:bg-blue-300 flex items-center">
          <FaCheckCircle className="mr-3" /> Compliance Checklist
        </Link>
        <Link href="/pages/dashboard/upload" className="block py-2 px-6 rounded-lg hover:bg-blue-300 flex items-center">
          <FaUpload className="mr-3" /> Upload Data
        </Link>
        <Link href="/pages/dashboard/audit" className="block py-2 px-6 rounded-lg hover:bg-blue-300 flex items-center">
          <FaGlobe className="mr-3" /> Website Audit
        </Link>
       
      </nav>
    </div>
  );
};

export default Sidebar;
