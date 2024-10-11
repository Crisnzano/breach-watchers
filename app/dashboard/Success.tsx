// pages/success.js
import LayoutPage from "@/components/dashboard/Layout";

const SuccessPage = () => {
  return (
    <LayoutPage>
      <div className="p-8 bg-purple-50 flex-1 text-center">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold">Upload Successful</h1>
          <p>Your compliance report has been analyzed and is ready.</p>
          <button className="bg-purple-600 text-white py-2 px-4 rounded-md mt-4">
            View Report
          </button>
        </div>
      </div>
    </LayoutPage>
  );
};

export default SuccessPage;
