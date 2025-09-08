import React, { useState } from 'react';

export default function Documents() {
  const [activeTab, setActiveTab] = useState('upload');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [draftContent, setDraftContent] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Mock data for templates
  const templates = [
    { id: 1, name: 'Affidavit', category: 'Court Documents', icon: '📑' },
    { id: 2, name: 'Employment Contract', category: 'Contracts', icon: '📝' },
    { id: 3, name: 'Non-Disclosure Agreement', category: 'Contracts', icon: '🔒' },
    { id: 4, name: 'FIR Complaint', category: 'Legal Notices', icon: '📢' },
    { id: 5, name: 'Memorandum of Understanding', category: 'Agreements', icon: '🤝' },
    { id: 6, name: 'Power of Attorney', category: 'Legal Authority', icon: '⚖️' },
    { id: 7, name: 'Petition', category: 'Court Documents', icon: '📜' },
    { id: 8, name: 'Lease Agreement', category: 'Contracts', icon: '🏢' },
  ];

  // Mock OCR results
  const ocrResults = [
    { id: 1, name: 'Contract_2023.pdf', date: '2023-10-15', relevance: 92 },
    { id: 2, name: 'Agreement_Draft.docx', date: '2023-09-22', relevance: 87 },
    { id: 3, name: 'Court_Petition.pdf', date: '2023-11-05', relevance: 95 },
  ];

  // Handle file upload
  const handleFileUpload = (files) => {
    if (files.length > 0) {
      const newFiles = Array.from(files);
      setUploadedFiles([...uploadedFiles, ...newFiles]);
      // Simulate OCR processing
      setTimeout(() => {
        alert(`${newFiles.length} file(s) processed with OCR! Text is now searchable.`);
      }, 1500);
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

  // Handle template selection
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setDraftContent(`# ${template.name}\n\nStart drafting your ${template.name} here...`);
    setActiveTab('draft');
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`);
      // In a real app, this would trigger the search API call
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="mr-2">📂</span> Document & Drafting Tools
      </h2>
      
      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button 
          className={`py-3 px-6 font-medium ${activeTab === 'upload' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('upload')}
        >
          Upload & Scan
        </button>
        <button 
          className={`py-3 px-6 font-medium ${activeTab === 'search' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('search')}
        >
          Deep Search
        </button>
        <button 
          className={`py-3 px-6 font-medium ${activeTab === 'draft' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('draft')}
        >
          Auto-Drafting
        </button>
        <button 
          className={`py-3 px-6 font-medium ${activeTab === 'templates' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('templates')}
        >
          Templates
        </button>
      </div>
      
      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Upload & Scan Section */}
        {activeTab === 'upload' && (
          <div className="space-y-6">
            <div 
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
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
                accept=".pdf,.doc,.docx" 
                onChange={handleFileInputChange}
                className="hidden"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="text-5xl mb-4">📁</div>
                <p className="text-lg font-medium text-gray-700">Drag & drop files here or click to browse</p>
                <p className="text-gray-500 mt-2">Supports PDF, DOC, DOCX files</p>
                <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Browse Files
                </button>
              </label>
            </div>
            
            {uploadedFiles.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Uploaded Files</h3>
                <ul className="divide-y divide-gray-200">
                  {uploadedFiles.map((file, index) => (
                    <li key={index} className="py-3 flex items-center">
                      <span className="mr-3">📄</span>
                      <span className="flex-1">{file.name}</span>
                      <span className="text-sm text-gray-500">{file.size ? (file.size / 1024).toFixed(1) + ' KB' : 'Size unknown'}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="text-lg font-medium text-blue-800 flex items-center">
                <span className="mr-2">🔍</span> OCR Processing
              </h3>
              <p className="text-blue-700 mt-2">
                All uploaded documents are automatically processed with Optical Character Recognition to make text searchable and editable.
              </p>
            </div>
          </div>
        )}
        
        {/* Deep Search Section */}
        {activeTab === 'search' && (
          <div className="space-y-6">
            <form onSubmit={handleSearch} className="flex">
              <input 
                type="text" 
                placeholder="Search across all documents..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border border-gray-300 rounded-l-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button 
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <span className="mr-2">🔍</span> Search
              </button>
            </form>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Search Results</h3>
              <div className="space-y-4">
                {ocrResults.map(result => (
                  <div key={result.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <h4 className="font-medium text-gray-800">{result.name}</h4>
                    <div className="flex text-sm text-gray-500 mt-1">
                      <span className="mr-4">Uploaded: {result.date}</span>
                      <span>Relevance: {result.relevance}%</span>
                    </div>
                    <p className="text-gray-600 mt-2 italic">
                      Excerpt containing your search terms will appear here with highlighted matching text...
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Auto-Drafting Section */}
        {activeTab === 'draft' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-800">Document Drafting Assistant</h3>
              <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                Risk Assessment: <span className="font-bold">Medium Risk</span>
              </div>
            </div>
            
            <textarea 
              value={draftContent}
              onChange={(e) => setDraftContent(e.target.value)}
              placeholder="Start drafting your document here..."
              className="w-full h-64 border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            
            <div>
              <h4 className="text-md font-medium text-gray-800 mb-3">Suggested Clauses</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-center cursor-pointer hover:bg-blue-100 transition-colors">
                  Confidentiality Clause
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-center cursor-pointer hover:bg-blue-100 transition-colors">
                  Termination Clause
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-center cursor-pointer hover:bg-blue-100 transition-colors">
                  Governing Law Clause
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-center cursor-pointer hover:bg-blue-100 transition-colors">
                  Indemnification Clause
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Templates Section */}
        {activeTab === 'templates' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-800">Document Templates</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {templates.map(template => (
                <div 
                  key={template.id} 
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedTemplate?.id === template.id 
                      ? 'border-blue-500 bg-blue-50 shadow-md' 
                      : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
                  }`}
                  onClick={() => handleTemplateSelect(template)}
                >
                  <div className="text-3xl mb-2">{template.icon}</div>
                  <h4 className="font-medium text-gray-800">{template.name}</h4>
                  <p className="text-sm text-gray-500">{template.category}</p>
                </div>
              ))}
            </div>
            
            {selectedTemplate && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-6">
                <h4 className="font-medium text-gray-800 mb-2">Selected Template: {selectedTemplate.name}</h4>
                <p className="text-gray-600">
                  This is a preview of the {selectedTemplate.name} template. Click "Use Template" to start drafting.
                </p>
                <button 
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  onClick={() => setActiveTab('draft')}
                >
                  Use This Template
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}