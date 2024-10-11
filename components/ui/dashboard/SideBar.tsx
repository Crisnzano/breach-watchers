import Link from 'next/link'; // Or use 'react-router-dom' if using React Router
import { FaRegFileAlt, FaUpload, FaCheckCircle, FaGlobe, FaCog } from 'react-icons/fa';

export const Sidebar = () => {
  return (
    <div className="w-64 bg-white text-black flex flex-col p-15 pt-20 ">

      <nav className="flex flex-col gap-4">
        <Link href="/dashboard/index" className="block py-2 px-6 rounded-lg hover:bg-blue-300 flex items-center">
        <FaRegFileAlt className="mr-3" />
        Reports
        </Link>
        <Link href="/dashboard/checklist" className="block py-2 px-6 rounded-lg hover:bg-blue-300 flex items-center">
        <FaCheckCircle className="mr-3" />
        Compliance Checklist
        </Link>
        <Link href="/dashboard/upload" className="block py-2 px-6 rounded-lg hover:bg-blue-300 flex items-center">
        <FaUpload className="mr-3" />
        Upload Data
        </Link>
        <Link href="/dashboard/audit" className="block py-2 px-6 rounded-lg hover:bg-blue-300 flex items-center">
        <FaGlobe className="mr-3" />
        Website Audit
        </Link>
      </nav>
    </div>
  );
};

