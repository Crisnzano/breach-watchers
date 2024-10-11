import Layout from "@/components/Layout";
import { DatePicker } from "../layout/DatePicker";

const Dashboard = () => {
  return (
    <Layout>
      <div className="flex-1 min-h-screen p-8 bg-purple-200 ">
        <h1 className="text-3xl font-semibold mb-8 text-black">Reports</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Compliance Status Card */}
          <div className="bg-white p-8 rounded-lg shadow-md h-full">
            <h2 className="text-xl font-bold text-black">Compliance Status</h2>
            <p className="text-gray-600 mb-4">52% Compliant</p>
            <div className="h-2 bg-gray-200 rounded-full mb-6">
              <div className="h-full bg-purple-600 rounded-full" style={{ width: '52%' }}></div>
            </div>
            <p className="text-gray-600 mt-4">Next audit due: <span className="font-semibold">2024-03-15</span></p>
            <DatePicker/>
          </div>

          {/* Upcoming Tasks Card */}
          <div className="bg-white p-8 rounded-lg shadow-md h-full">
            <h2 className="text-xl font-bold text-black">Upcoming Tasks</h2>
            <ul className="mt-6 space-y-4">
              <li className="text-gray-600">
                <span>Data protection audit</span>
                <span className="block mt-1 text-sm text-gray-500 text-right">Due: 2024-03-15</span>
              </li>
              <li className="text-gray-600">
                <span>Privacy policy review</span>
                <span className="block mt-1 text-sm text-gray-500 text-right">Due: 2024-02-28</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Recent Audit Reports Section */}
        <div className="bg-white mt-12 p-8 rounded-lg shadow-md h-full">
          <h2 className="text-xl font-bold text-black">Recent Audit Reports</h2>
          <ul className="mt-6 space-y-4">
            <li className="text-gray-600">
              <span>Q4 2023 Compliance Audit</span>
              <span className="block mt-1 text-sm text-gray-500 text-right">Completed: 2024-03-15</span>
            </li>
            <li className="text-gray-600">
              <span>Website Privacy Assessment</span>
              <span className="block mt-1 text-sm text-gray-500 text-right">Completed: 2024-02-28</span>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
