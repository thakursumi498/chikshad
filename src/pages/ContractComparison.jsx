import React, { useState } from 'react';
import axios from 'axios';

const API_URL = "https://n8n.srv983857.hstgr.cloud/webhook/a027ab82-e53c-4246-9982-c41c79ac9bca";
const RISK_API_URL = "https://n8n.srv983857.hstgr.cloud/webhook/32c4f30e-6722-4125-bd7d-691f0e9460e4";

function ContractRiskAnalyzer() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [fileName1, setFileName1] = useState('');
  const [fileName2, setFileName2] = useState('');
  const [results, setResults] = useState(null);
  const [riskResults, setRiskResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('comparison');

  const handleFile1Change = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile1(file);
      setFileName1(file.name);
    }
  };

  const handleFile2Change = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile2(file);
      setFileName2(file.name);
    }
  };

  const handleCompare = async () => {
    if (!file1 || !file2) {
      alert("Please select two files first!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file1", file1);
    formData.append("file2", file2);

    try {
      const response = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      let data = response.data;

      // handle plain text vs JSON
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          data = { message: data }; // fallback as plain text
        }
      }

      setResults(data);
      setActiveTab('comparison');
    } catch (err) {
      console.error("Error comparing contracts:", err);
      setResults({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleRiskAnalysis = async () => {
    if (!file1) {
      alert("Please select a contract file first!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file1", file1);

    try {
      const response = await axios.post(RISK_API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      let data = response.data;

      // handle plain text vs JSON
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          data = { message: data }; // fallback as plain text
        }
      }

      setRiskResults(data);
      setActiveTab('risk');
    } catch (err) {
      console.error("Error analyzing contract risks:", err);
      setRiskResults({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  const renderRiskLevel = (level) => {
    if (!level) return null;
    
    const levelLower = level.toLowerCase();
    let bgColor = 'bg-gray-200';
    let textColor = 'text-gray-800';
    
    if (levelLower.includes('high')) {
      bgColor = 'bg-red-100';
      textColor = 'text-red-800';
    } else if (levelLower.includes('medium')) {
      bgColor = 'bg-yellow-100';
      textColor = 'text-yellow-800';
    } else if (levelLower.includes('low')) {
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
    }
    
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${bgColor} ${textColor}`}>
        {level}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Contract Risk Analyzer</h1>
          <p className="text-lg text-gray-600">Upload contracts to compare or analyze for potential risks</p>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contract 1</label>
              <div className="flex items-center">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">{fileName1 || 'Click to upload contract'}</p>
                  </div>
                  <input type="file" className="hidden" onChange={handleFile1Change} accept=".pdf,.doc,.docx" />
                </label>
              </div>
              {fileName1 && (
                <p className="mt-2 text-sm text-gray-600 truncate">
                  <span className="font-medium">Selected:</span> {fileName1}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contract 2 (for comparison)</label>
              <div className="flex items-center">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">{fileName2 || 'Click to upload contract'}</p>
                  </div>
                  <input type="file" className="hidden" onChange={handleFile2Change} accept=".pdf,.doc,.docx" />
                </label>
              </div>
              {fileName2 && (
                <p className="mt-2 text-sm text-gray-600 truncate">
                  <span className="font-medium">Selected:</span> {fileName2}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleCompare}
              disabled={loading || !file1 || !file2}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading && activeTab === 'comparison' ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Compare Contracts'
              )}
            </button>
            
            <button
              onClick={handleRiskAnalysis}
              disabled={loading || !file1}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading && activeTab === 'risk' ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </>
              ) : (
                'Analyze Contract Risks'
              )}
            </button>
          </div>
        </div>
        
        {(results || riskResults) && (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('comparison')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'comparison' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  Contract Comparison
                </button>
                <button
                  onClick={() => setActiveTab('risk')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'risk' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  Risk Analysis
                </button>
              </nav>
            </div>
            
            <div className="p-6">
              {activeTab === 'comparison' && results && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Comparison Results</h3>
                  {results.error ? (
                    <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-red-700">Error: {results.error}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <pre className="bg-gray-50 p-4 rounded text-sm whitespace-pre-wrap overflow-auto max-h-96">
                      {JSON.stringify(results, null, 2)}
                    </pre>
                  )}
                </div>
              )}
              
              {activeTab === 'risk' && riskResults && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Risk Analysis Results</h3>
                  {riskResults.error ? (
                    <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-red-700">Error: {riskResults.error}</p>
                        </div>
                      </div>
                    </div>
                  ) : riskResults.message ? (
                    <div>
                      <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <h4 className="text-md font-semibold text-gray-900 mb-2">Flagged Risks & Missing Critical Clauses:</h4>
                        <div className="bg-white rounded-lg shadow-sm p-4">
                          <ul className="list-disc pl-5 space-y-2">
                            {riskResults.message.split('\n').filter(line => line.trim() && !line.includes('Summary of Risk Level')).map((risk, index) => (
                              <li key={index} className="text-sm text-gray-700">{risk}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                        <h4 className="text-md font-semibold text-gray-900 mb-2">Summary of Risk Level:</h4>
                        <div className="flex items-center">
                          {renderRiskLevel(riskResults.message.split('Summary of Risk Level:')[1]?.trim())}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <pre className="bg-gray-50 p-4 rounded text-sm whitespace-pre-wrap overflow-auto max-h-96">
                      {JSON.stringify(riskResults, null, 2)}
                    </pre>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        
        {!results && !riskResults && (
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No analysis yet</h3>
            <p className="mt-1 text-sm text-gray-500">Upload contracts and click analyze to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContractRiskAnalyzer;