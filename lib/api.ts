// lib/api.ts
export const askQuestion = async (file: File, question: string, sessionId: string | null = null) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("question", question);
    if (sessionId) {
      formData.append("session_id", sessionId);
    }
  
    const response = await fetch("http://localhost:8001/ask_question", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data;
  };
  
  export const downloadReport = async (sessionId: string) => {
    const response = await fetch(`http://localhost:8001/download_report?session_id=${sessionId}`);
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "compliance_report.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } else {
      throw new Error("Failed to download report");
    }
  };
  