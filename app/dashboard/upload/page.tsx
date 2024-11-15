"use client";

import { useState } from "react";
import LayoutPage from "../Layout";
import AppBar from "@/components/layout/AppBar";

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [answers, setAnswers] = useState<
    { question: string; answer: string }[]
  >([]);
  const [pdfLink, setPdfLink] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file before uploading.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/analyze_policy", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to upload file: ${errorText}`);
      }

      const data = await response.json();
      setAnswers(data.answers);
      setPdfLink(data.pdf_path);
      alert("File uploaded and analyzed successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert(`An error occurred: ${(error as Error).message}`);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <LayoutPage>
      <AppBar />
      <div
        className="container w-full bg-purple-200"
        style={{ height: "calc(100vh - 64px)", paddingTop: "150px" }}
      >
        <div className="p-8 bg-purple-50 flex-1 rounded-lg">
          <h1 className="text-3xl font-semibold mb-6 text-black">
            Upload Privacy Policy
          </h1>
          <div className="bg-black p-6 rounded-lg shadow-md text-center">
            <input type="file" className="my-4" onChange={handleFileChange} />
            <button
              onClick={handleUpload}
              className="bg-purple-600 text-white py-2 px-4 rounded-md"
            >
              {loading ? "Analyzing..." : "Upload and Analyze"}
            </button>
          </div>
          {loading && (
            <div className="flex justify-center items-center my-4">
              <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
              <p className="ml-2 text-black">Processing your file...</p>
            </div>
          )}
          {answers.length > 0 && (
            <div className="mt-6 p-4 bg-gray-100 rounded-md">
              <h3 className="text-xl font-semibold text-black">
                Compliance Report:
              </h3>
              {answers.map((ans, index) => (
                <div key={index} className="mb-4">
                  <p className="text-black font-bold">{ans.question}</p>
                  <p className="text-black">{ans.answer}</p>
                </div>
              ))}
              {pdfLink && (
                <a
                  href={`http://localhost:8000${pdfLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md"
                >
                  Download PDF Report
                </a>
              )}
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .loader {
          border: 4px solid rgba(0, 0, 0, 0.2);
          border-radius: 50%;
          width: 36px;
          height: 36px;
          border-top-color: #3498db;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </LayoutPage>
  );
};

export default UploadPage;
