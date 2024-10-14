"use client"

import { useState } from 'react';
import LayoutPage from '../Layout';
import AppBar from '@/components/layout/AppBar';

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
      <AppBar/>
      <div className="container w-full bg-purple-200" style={{ height: 'calc(100vh - 64px)', paddingTop: '150px' }}>
        <div className="p-8 bg-purple-50 flex-1 rounded-lg">
          <h1 className="text-3xl font-semibold mb-6 text-black">Upload Privacy policy </h1>
          <div className="bg-black p-6 rounded-lg shadow-md text-center">
            <input type="file" className="my-4" onChange={handleFileChange} />
            <button onClick={handleUpload} className="bg-purple-600 text-white py-2 px-4 rounded-md">
              Upload
            </button>
          </div>
        </div>
      </div>
    </LayoutPage>
  );
};

export default UploadPage;
