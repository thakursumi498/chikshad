import React, { useState } from 'react';

export default function Research() {
  const [activeTab, setActiveTab] = useState('caselaw');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourt, setSelectedCourt] = useState('supreme');
  const [selectedYear, setSelectedYear] = useState('2023');
  const [selectedCase, setSelectedCase] = useState(null);

  // Mock data for case law search results
  const caseLawResults = [
    {
      id: 1,
      title: 'Kesavananda Bharati vs State of Kerala',
      citation: 'AIR 1973 SC 1461',
      court: 'Supreme Court',
      year: '1973',
      judges: 'Sikri, S.M., Shelat, J.M., Hegde, K.S., Grover, A.N., Ray, A.N., Palekar, D.G., Beg, M.H., Dwivedi, S.N., Chandrachud, Y.V., Reddy, P.J., Khanna, H.R., Mathew, K.K., Mukherjea, A.K.',
      summary: 'Established the Basic Structure Doctrine of the Constitution',
      importance: 'Landmark',
      tags: ['Constitutional Law', 'Basic Structure Doctrine']
    },
    {
      id: 2,
      title: 'Maneka Gandhi vs Union of India',
      citation: 'AIR 1978 SC 597',
      court: 'Supreme Court',
      year: '1978',
      judges: 'Bhagwati, P.N., Untwalia, N.L., Fazal Ali, S.M.',
      summary: 'Expanded the scope of Article 21 (Right to Life and Personal Liberty)',
      importance: 'Landmark',
      tags: ['Constitutional Law', 'Fundamental Rights']
    },
    {
      id: 3,
      title: 'Shayara Bano vs Union of India',
      citation: 'AIR 2017 SC 4609',
      court: 'Supreme Court',
      year: '2017',
      judges: 'Khehar, J.S., Nariman, R.F., Lalit, U.U., Joseph, K., Goel, R.',
      summary: 'Declared instant triple talaq (talaq-e-biddat) unconstitutional',
      importance: 'Landmark',
      tags: ['Muslim Law', 'Gender Justice']
    }
  ];

  // Mock data for judgment evolution
  const judgmentEvolution = [
    {
      id: 1,
      year: '1950',
      title: 'Initial Interpretation',
      description: 'Early constitutional interpretations established foundational principles'
    },
    {
      id: 2,
      year: '1973',
      title: 'Basic Structure Doctrine',
      description: 'Kesavananda Bharati case established the basic structure doctrine'
    },
    {
      id: 3,
      year: '1978',
      title: 'Expansion of Article 21',
      description: 'Maneka Gandhi case expanded the scope of right to life and personal liberty'
    },
    {
      id: 4,
      year: '2017',
      title: 'Privacy as Fundamental Right',
      description: 'Puttaswamy case declared privacy as a fundamental right'
    },
    {
      id: 5,
      year: '2023',
      title: 'Modern Interpretations',
      description: 'Recent judgments addressing digital rights and contemporary issues'
    }
  ];

  // Mock data for cause list
  const causeList = [
    {
      id: 1,
      caseNo: 'Crl.A. No. 1234/2023',
      petitioner: 'State of Maharashtra',
      respondent: 'Rajesh Kumar',
      purpose: 'Hearing',
      time: '10:30 AM',
      bench: 'Court No. 5',
      status: 'Upcoming'
    },
    {
      id: 2,
      caseNo: 'W.P.(C) No. 5678/2023',
      petitioner: 'Sunita Sharma',
      respondent: 'Delhi Municipal Corporation',
      purpose: 'Arguments',
      time: '11:45 AM',
      bench: 'Court No. 2',
      status: 'Upcoming'
    },
    {
      id: 3,
      caseNo: 'Civil Appeal No. 9012/2023',
      petitioner: 'Reliance Industries Ltd.',
      respondent: 'Competition Commission of India',
      purpose: 'Judgment',
      time: '02:15 PM',
      bench: 'Chief Justice Court',
      status: 'Upcoming'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <div className="bg-blue-600 p-3 rounded-full mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
          </svg>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Research & Intelligence</h1>
          <p className="text-gray-600">Advanced legal research tools and case law analysis</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">12,487</h3>
            <p className="text-gray-600">Cases in Database</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">2,341</h3>
            <p className="text-gray-600">Supreme Court Cases</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">8,642</h3>
            <p className="text-gray-600">High Court Cases</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Daily</h3>
            <p className="text-gray-600">Database Updates</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-3 px-6 font-medium ${activeTab === 'caselaw' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('caselaw')}
        >
          Case Law Search
        </button>
        <button
          className={`py-3 px-6 font-medium ${activeTab === 'evolution' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('evolution')}
        >
          Judgment Evolution
        </button>
        <button
          className={`py-3 px-6 font-medium ${activeTab === 'causelist' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('causelist')}
        >
          Cause List Monitoring
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Case Law Search */}
        {activeTab === 'caselaw' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Case Law Search</h2>
              <div className="flex space-x-2">
                <button
                  className={`px-4 py-2 rounded-lg text-sm ${selectedCourt === 'supreme' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => setSelectedCourt('supreme')}
                >
                  Supreme Court
                </button>
                <button
                  className={`px-4 py-2 rounded-lg text-sm ${selectedCourt === 'high' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => setSelectedCourt('high')}
                >
                  High Courts
                </button>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by case name, citation, judge, or keywords..."
                  className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 absolute left-3 top-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <select
                className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedCourt}
                onChange={(e) => setSelectedCourt(e.target.value)}
              >
                <option value="supreme">Supreme Court of India</option>
                <option value="delhi">Delhi High Court</option>
                <option value="bombay">Bombay High Court</option>
                <option value="madras">Madras High Court</option>
              </select>
              <select
                className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
              </select>
            </div>
            
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors">
              Search Case Law
            </button>

            {/* Search Results */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Search Results</h3>
              <div className="space-y-4">
                {caseLawResults.map((caseItem) => (
                  <div
                    key={caseItem.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedCase(caseItem)}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-gray-800">{caseItem.title}</h4>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {caseItem.importance}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{caseItem.citation} | {caseItem.court} | {caseItem.year}</p>
                    <p className="text-gray-700 mt-2">{caseItem.summary}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {caseItem.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Judgment Evolution */}
        {activeTab === 'evolution' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Judgment Evolution Tracker</h2>
            
            <div className="relative">
              {/* Timeline */}
              <div className="absolute left-4 top-0 h-full w-0.5 bg-blue-200"></div>
              
              {/* Timeline Items */}
              <div className="space-y-10 pl-16">
                {judgmentEvolution.map((item) => (
                  <div key={item.id} className="relative">
                    <div className="absolute -left-11 top-1.5 h-6 w-6 rounded-full bg-blue-600 border-4 border-white"></div>
                    <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-medium text-gray-800">{item.title}</h3>
                        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                          {item.year}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-2">{item.description}</p>
                      <button className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View Related Judgments →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Cause List Monitoring */}
        {activeTab === 'causelist' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Cause List Live Monitoring</h2>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-500 mr-1.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-sm text-green-600">Last updated: Today, 09:45 AM</span>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-600 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-blue-700">Cause lists are updated daily at 6:00 AM. Real-time updates provided during court hours.</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-100 text-left text-gray-700 font-medium">
                    <th className="px-4 py-3">Case No.</th>
                    <th className="px-4 py-3">Petitioner vs Respondent</th>
                    <th className="px-4 py-3">Purpose</th>
                    <th className="px-4 py-3">Time</th>
                    <th className="px-4 py-3">Bench</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {causeList.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-800">{item.caseNo}</td>
                      <td className="px-4 py-3">
                        <div>{item.petitioner}</div>
                        <div className="text-sm text-gray-600">vs {item.respondent}</div>
                      </td>
                      <td className="px-4 py-3">{item.purpose}</td>
                      <td className="px-4 py-3">{item.time}</td>
                      <td className="px-4 py-3">{item.bench}</td>
                      <td className="px-4 py-3">
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center pt-4">
              <p className="text-sm text-gray-600">Showing 3 of 247 cases listed today</p>
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                View Full Cause List →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}