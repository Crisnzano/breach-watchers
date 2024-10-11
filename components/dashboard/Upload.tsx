// pages/upload.tsx (convert to .tsx for TypeScript)
import { useState } from 'react';
import LayoutPage from '@/components/dashboard/Layout';

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null); // Explicitly define the file state type

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]); // Handle the selected file
    }
  };

  const handleUpload = () => {
    if (file) {
      alert('File uploaded successfully');
    }
  };

  return (
    <LayoutPage>
      <div className="p-8 bg-purple-50 flex-1">
        <h1 className="text-3xl font-semibold mb-6">Compliance Audit Checklist</h1>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <input type="file" className="my-4" onChange={handleFileChange} />
          <button onClick={handleUpload} className="bg-purple-600 text-white py-2 px-4 rounded-md">
            Upload
          </button>
        </div>
      </div>
    </LayoutPage>
  );
};

export default UploadPage;
