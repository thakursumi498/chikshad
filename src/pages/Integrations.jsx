import React, { useState } from "react";

// Comparison Results Component
const ComparisonResults = ({ results, file1, file2 }) => {
  if (!results) return null;

  // If results is a string (raw text response), display it directly
  if (typeof results === 'string') {
    return (
      <div className="mt-6 bg-gray-100 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Comparison Results</h3>
        <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-white p-4 rounded">
          {results}
        </pre>
      </div>
    );
  }

  // Helper functions to check if data exists
  const hasContent = (value) => {
    return value && Array.isArray(value) && value.length > 0;
  };

  const hasText = (value) => {
    return value && typeof value === 'string' && value.trim().length > 0;
  };

  return (
    <div className="mt-6 bg-gray-100 p-6 rounded-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Comparison Results</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-medium text-gray-700 mb-2">Document 1:</h4>
          <p className="text-gray-600">{file1?.name || 'Unknown file'}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-medium text-gray-700 mb-2">Document 2:</h4>
          <p className="text-gray-600">{file2?.name || 'Unknown file'}</p>
        </div>
      </div>
      
      {hasText(results.summary) && (
        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-2">Summary:</h4>
          <p className="text-gray-600">{results.summary}</p>
        </div>
      )}
      
      {hasContent(results.differences) && (
        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-2">Key Differences:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <h5 className="font-medium text-red-600 mb-2">In {file1?.name}:</h5>
              <ul className="list-disc pl-5 text-gray-600">
                {results.differences
                  .filter(diff => typeof diff === 'string' && diff.includes('only in Document 1'))
                  .map((diff, index) => (
                    <li key={index} className="mb-1">{diff}</li>
                  ))}
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h5 className="font-medium text-red-600 mb-2">In {file2?.name}:</h5>
              <ul className="list-disc pl-5 text-gray-600">
                {results.differences
                  .filter(diff => typeof diff === 'string' && diff.includes('only in Document 2'))
                  .map((diff, index) => (
                    <li key={index} className="mb-1">{diff}</li>
                  ))}
              </ul>
            </div>
          </div>
          {/* General differences that don't belong to a specific document */}
          <div className="mt-4 bg-white p-4 rounded-lg">
            <h5 className="font-medium text-red-600 mb-2">General Differences:</h5>
            <ul className="list-disc pl-5 text-gray-600">
              {results.differences
                .filter(diff => typeof diff === 'string' && 
                  !diff.includes('only in Document 1') && 
                  !diff.includes('only in Document 2'))
                .map((diff, index) => (
                  <li key={index} className="mb-1">{diff}</li>
                ))}
            </ul>
          </div>
        </div>
      )}
      
      {hasContent(results.similarities) && (
        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-2">Similarities:</h4>
          <ul className="list-disc pl-5 text-gray-600">
            {results.similarities.map((similarity, index) => (
              <li key={index} className="mb-1">{similarity}</li>
            ))}
          </ul>
        </div>
      )}
      
      {hasText(results.riskAssessment) && (
        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h4 className="font-medium text-yellow-800 mb-2">Risk Assessment:</h4>
          <p className="text-yellow-700">{results.riskAssessment}</p>
        </div>
      )}
      
      {/* If the API returns an unexpected format, show raw data for debugging */}
      {!hasText(results.summary) && !hasContent(results.differences) && 
       !hasContent(results.similarities) && !hasText(results.riskAssessment) && (
        <div className="bg-white p-4 rounded-lg">
          <h4 className="font-medium text-gray-700 mb-2">Raw API Response:</h4>
          <pre className="whitespace-pre-wrap text-sm mt-2 text-gray-700 overflow-auto max-h-60">
            {JSON.stringify(results, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

// Main Documents Component
export default function Documents() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [comparisonResult, setComparisonResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [comparisonStatus, setComparisonStatus] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  // File size limit (10MB)
  const MAX_FILE_SIZE = 10 * 1024 * 1024;

  // Handle file upload
  const handleFileUpload = (files) => {
    if (files.length > 0) {
      const newFiles = Array.from(files);
      // Filter only PDF files for contract comparison
      const pdfFiles = newFiles.filter(file => 
        file.type === 'application/pdf' && file.size <= MAX_FILE_SIZE
      );
      
      const nonPdfFiles = newFiles.filter(file => file.type !== 'application/pdf');
      const oversizedFiles = newFiles.filter(file => 
        file.type === 'application/pdf' && file.size > MAX_FILE_SIZE
      );
      
      if (nonPdfFiles.length > 0) {
        alert(`${nonPdfFiles.length} non-PDF file(s) were uploaded but only PDF files can be used for comparison.`);
      }
      
      if (oversizedFiles.length > 0) {
        alert(`${oversizedFiles.length} PDF file(s) exceed the maximum size limit of ${formatFileSize(MAX_FILE_SIZE)}.`);
      }
      
      if (pdfFiles.length > 0) {
        setUploadedFiles([...uploadedFiles, ...pdfFiles]);
        // Clear previous comparison results when new files are uploaded
        setComparisonResult(null);
        setError(null);
      }
    }
  };

  // Handle file input change
  const handleFileInputChange = (e) => {
    handleFileUpload(e.target.files);
  };

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };

  // Process comparison data from API
  const processComparisonData = (data) => {
    // If the data is already in the expected format, return it as is
    if (data.summary || data.differences || data.similarities) {
      return data;
    }
    
    // If it's a string, try to parse it
    if (typeof data === 'string') {
      try {
        return JSON.parse(data);
      } catch (e) {
        // If it's not JSON, return it as a raw text response
        return data;
      }
    }
    
    // If it's in a different format, transform it
    // This part depends on your API's response format
    if (data.comparison_results) {
      return {
        summary: data.comparison_summary,
        differences: data.comparison_results.differences || [],
        similarities: data.comparison_results.similarities || [],
        riskAssessment: data.risk_assessment
      };
    }
    
    // Fallback: return the data as is
    return data;
  };

  // API call for Contract Comparison
  const handleCompareContracts = async () => {
    if (uploadedFiles.length < 2) {
      setError("Please upload exactly 2 PDF contracts to compare.");
      return;
    }

    // Check if files are PDFs
    if (uploadedFiles[0].type !== 'application/pdf' || uploadedFiles[1].type !== 'application/pdf') {
      setError("Only PDF files can be compared. Please upload PDF documents.");
      return;
    }

    const formData = new FormData();
    formData.append("file1", uploadedFiles[0]);
    formData.append("file2", uploadedFiles[1]);

    setLoading(true);
    setError(null);
    setComparisonStatus("Preparing documents for comparison...");
    
    try {
      // Replace with your actual API endpoint
      const response = await fetch(
        "https://n8n.srv983857.hstgr.cloud/webhook/a027ab82-e53c-4246-9982-c41c79ac9bca",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      let data = await response.json();
      
      // Handle string responses
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          data = { rawResponse: data };
        }
      }
      
      const processedData = processComparisonData(data);
      setComparisonResult(processedData);
      setComparisonStatus("Comparison completed successfully!");
      
      // Clear status after 3 seconds
      setTimeout(() => setComparisonStatus(""), 3000);
    } catch (err) {
      console.error("Error comparing contracts:", err);
      
      // Provide more specific error messages
      if (err.message.includes("Failed to fetch")) {
        setError("Network error: Could not connect to the comparison service. Please check your internet connection.");
      } else if (err.message.includes("Server error")) {
        setError(`Server error: ${err.message}`);
      } else {
        setError("Failed to compare contracts. The service might be temporarily unavailable.");
      }
      
      setComparisonStatus("Comparison failed!");
    }
    setLoading(false);
  };

  // Clear comparison results
  const clearComparison = () => {
    setComparisonResult(null);
    setError(null);
    setComparisonStatus("");
  };

  // Remove uploaded file
  const removeFile = (index) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
    // Clear comparison when files change
    setComparisonResult(null);
    setError(null);
    setComparisonStatus("");
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="mr-2">📂</span> Contract Comparison Tool
      </h2>

      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-6">
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDragIn}
            onDragLeave={handleDragOut}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="file-upload"
              multiple
              accept=".pdf"
              onChange={handleFileInputChange}
              className="hidden"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="text-5xl mb-4">📁</div>
              <p className="text-lg font-medium text-gray-700">
                Drag & drop PDF files here or click to browse
              </p>
              <p className="text-gray-500 mt-2">Only PDF files supported for contract comparison</p>
              <p className="text-gray-400 text-sm mt-1">Max file size: {formatFileSize(MAX_FILE_SIZE)}</p>
              <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Browse PDF Files
              </button>
            </label>
          </div>

          {uploadedFiles.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-3">Uploaded PDF Files</h3>
              <ul className="divide-y divide-gray-200">
                {uploadedFiles.map((file, index) => (
                  <li key={index} className="py-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="mr-3">📄</span>
                      <div>
                        <span className="block font-medium">{file.name}</span>
                        <span className="text-sm text-gray-500">
                          {formatFileSize(file.size)} • PDF Document
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700 text-sm bg-red-50 px-2 py-1 rounded"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Compare Contracts Section */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-medium text-blue-800 mb-2">Contract Comparison Tool</h3>
            <p className="text-blue-700 mb-4">
              Compare two PDF contracts to identify differences and similarities. 
              Only the first two uploaded PDFs will be compared.
            </p>
            
            <div className="flex items-center">
              <button
                onClick={handleCompareContracts}
                disabled={loading || uploadedFiles.length < 2}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Comparing...
                  </>
                ) : (
                  "Compare Contracts"
                )}
              </button>
              
              <button
                onClick={() => {
                  setComparisonResult({
                    summary: "The contracts have 5 significant differences and 3 similarities.",
                    differences: [
                      "Clause 4.2: Payment terms are 30 days in Document 1 but 45 days in Document 2",
                      "Clause 7.1: Liability cap is $100,000 in Document 1 but unlimited in Document 2",
                      "Document 1 includes a non-compete clause missing in Document 2",
                      "Document 2 includes an arbitration clause missing in Document 1"
                    ],
                    similarities: [
                      "Both contracts have identical confidentiality clauses",
                      "Termination conditions are the same in both documents",
                      "Intellectual property rights allocation is identical"
                    ],
                    riskAssessment: "Document 2 presents higher financial risk due to unlimited liability cap."
                  });
                }}
                className="ml-4 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
              >
                Test with Sample Data
              </button>
              
              {comparisonResult && (
                <button
                  onClick={clearComparison}
                  className="ml-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Clear Results
                </button>
              )}
            </div>
            
            {comparisonStatus && (
              <div className="mt-4 p-3 bg-blue-100 rounded-md">
                <p className="text-blue-700">{comparisonStatus}</p>
              </div>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="mt-6 bg-red-100 p-4 rounded-lg">
              <h3 className="font-semibold text-red-800 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                Error:
              </h3>
              <p className="text-red-700 mt-2">{error}</p>
              <p className="text-red-700 mt-2 text-sm">
                Please ensure you've uploaded exactly two PDF files and try again.
              </p>
            </div>
          )}

          {/* Show Comparison Results using our component */}
          <ComparisonResults 
            results={comparisonResult} 
            file1={uploadedFiles[0]} 
            file2={uploadedFiles[1]} 
          />
        </div>
      </div>
    </div>
  );
}