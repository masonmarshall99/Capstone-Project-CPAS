import React, { useState } from "react";

const DownloadPage = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [message, setMessage] = useState("");

  const handleDownload = async () => {
    console.log("Starting download...");
    setIsDownloading(true);
    setMessage("");

    try {
      console.log("Making request to:", "http://localhost:8000/api/download/crop-health-data/");
      const response = await fetch("http://localhost:8000/api/download/crop-health-data/", {
        method: "GET",
        mode: "cors",
        credentials: "include",
      });
      
      console.log("Response received:", response);
      console.log("Response status:", response.status);
      console.log("Response headers:", [...response.headers.entries()]);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      // Check if response is CSV
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("text/csv")) {
        // Get the filename from Content-Disposition header
        const contentDisposition = response.headers.get("content-disposition");
        let filename = "crop_health_data.csv";
        if (contentDisposition) {
          const filenameMatch = contentDisposition.match(/filename="(.+)"/);
          if (filenameMatch) {
            filename = filenameMatch[1];
          }
        }

        // Create blob and download
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        setMessage(" Download completed successfully!");
      } else {
        setMessage(" Unexpected response format. Please try again.");
      }
    } catch (error) {
      console.error("Download error:", error);
      console.error("Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      setMessage(` Download failed: ${error.message}`);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Crop Health Data Download</h1>
      
      <div>
        <p>Download the complete crop health dataset as a CSV file.</p>
        
        <div style={{ margin: "2rem 0" }}>
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            style={{
              padding: "1rem 2rem",
              fontSize: "1.1rem",
              backgroundColor: isDownloading ? "#ccc" : "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: isDownloading ? "not-allowed" : "pointer",
            }}
          >
            {isDownloading ? "Downloading..." : "Download CSV"}
          </button>
        </div>

        {message && (
          <div
            style={{
              padding: "1rem",
              backgroundColor: message.includes("✅") ? "#e6ffe6" : "#ffe6e6",
              border: `1px solid ${message.includes("✅") ? "#99ff99" : "#ff9999"}`,
              borderRadius: "5px",
              marginTop: "1rem",
            }}
          >
            {message}
          </div>
        )}

        <div style={{ marginTop: "2rem", padding: "1rem", backgroundColor: "#f8f9fa", borderRadius: "5px" }}>
          <h3>Dataset Information</h3>
          <ul>
            <li><strong>File Format:</strong> CSV (Comma Separated Values)</li>
            <li><strong>Data Includes:</strong> Disease information, crop details, location data, and health metrics</li>
            <li><strong>Records:</strong> 2,886 disease presence records</li>
            <li><strong>Columns:</strong> Disease Name, Crop Name, Region, Zone, Severity, Control methods, and more</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
