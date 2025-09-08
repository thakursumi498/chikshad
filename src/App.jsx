import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Documents from './pages/Documents'
import Research from './pages/Research'
import Analytics from './pages/Analytics'
import Clients from './pages/Clients'
import Simulation from './pages/Simulation'
import Integrations from './pages/Integrations'
import Settings from './pages/Settings'

const App = () => {
  const [activePage, setActivePage] = useState(null)
  const [userData, setUserData] = useState(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  
  // Simulate user login and data fetch
  useEffect(() => {
    const fetchUserData = async () => {
      setTimeout(() => {
        setUserData({
          name: "Sarah Johnson",
          role: "Senior Advocate",
          cases: 18,
          upcomingHearings: 3,
          recentDocuments: 5,
          performanceScore: 92,
          notifications: 4,
          messages: 2
        })
      }, 500)
    }
    
    fetchUserData()
  }, [])

  const renderPage = () => {
    switch (activePage) {
      case 'Documents': return <Documents />
      case 'Research': return <Research />
      case 'Analytics': return <Analytics />
      case 'Clients': return <Clients />
      case 'Simulation': return <Simulation />
      case 'Integrations': return <Integrations />
      case 'Settings': return <Settings />
      default: return <DashboardOverview userData={userData} setActivePage={setActivePage} />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        setActivePage={setActivePage} 
        activePage={activePage} 
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar 
          userData={userData} 
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />
        <main className="flex-1 overflow-y-auto p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}

// Dashboard Overview Component
const DashboardOverview = ({ userData, setActivePage }) => {
  if (!userData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }
  
  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Welcome back, {userData.name}!</h1>
        <p className="text-gray-600">Here's what's happening with your cases today.</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Active Cases" 
          value={userData.cases} 
          change="+2 from last week" 
          color="blue"
          icon="📋"
          onClick={() => setActivePage('Clients')}
        />
        <StatCard 
          title="Upcoming Hearings" 
          value={userData.upcomingHearings} 
          change="Next: Tomorrow at 10:30 AM" 
          color="orange"
          icon="⚖️"
          onClick={() => setActivePage('Documents')}
        />
        <StatCard 
          title="Recent Documents" 
          value={userData.recentDocuments} 
          change="3 need review" 
          color="green"
          icon="📄"
          onClick={() => setActivePage('Documents')}
        />
        <StatCard 
          title="Performance Score" 
          value={`${userData.performanceScore}%`} 
          change="+5% from last month" 
          color="purple"
          icon="📊"
          onClick={() => setActivePage('Analytics')}
        />
      </div>
      
      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ActionButton 
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                }
                label="Add Document" 
                onClick={() => setActivePage('Documents')}
              />
              <ActionButton 
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                }
                label="Research" 
                onClick={() => setActivePage('Research')}
              />
              <ActionButton 
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                }
                label="Analytics" 
                onClick={() => setActivePage('Analytics')}
              />
              <ActionButton 
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                label="Simulation" 
                onClick={() => setActivePage('Simulation')}
              />
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Recent Activity
            </h2>
            <div className="space-y-4">
              <ActivityItem 
                time="2 hours ago"
                action="Submitted motion for summary judgment in Smith v. Jones"
                case="Case #C-2023-4582"
                icon="📝"
              />
              <ActivityItem 
                time="Yesterday"
                action="Added deposition transcripts from Dr. Evans"
                case="Case #C-2023-4196"
                icon="📑"
              />
              <ActivityItem 
                time="2 days ago"
                action="Scheduled mediation session for October 15th"
                case="Case #C-2023-3871"
                icon="📅"
              />
            </div>
          </div>
        </div>
        
        {/* Right column (1/3 width) */}
        <div className="space-y-6">
          {/* Upcoming Hearings */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Upcoming Hearings
            </h2>
            <div className="space-y-4">
              <HearingItem 
                case="Smith v. Jones"
                time="Tomorrow, 10:30 AM"
                court="District Court Room 4B"
                status="preparation"
              />
              <HearingItem 
                case="Williams v. Anderson Corp"
                time="Oct 15, 2:00 PM"
                court="Federal Court Room 2"
                status="review"
              />
              <HearingItem 
                case="State v. Peterson"
                time="Oct 18, 9:00 AM"
                court="Superior Court Room 5"
                status="confirmed"
              />
            </div>
          </div>
          
          {/* Performance Overview */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
              Performance Overview
            </h2>
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Case Resolution Rate</span>
                <span className="text-sm font-semibold">78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{width: '78%'}}></div>
              </div>
              
              <div className="flex items-center justify-between mb-2 mt-4">
                <span className="text-sm text-gray-600">Client Satisfaction</span>
                <span className="text-sm font-semibold">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{width: '92%'}}></div>
              </div>
              
              <div className="flex items-center justify-between mb-2 mt-4">
                <span className="text-sm text-gray-600">Document Accuracy</span>
                <span className="text-sm font-semibold">86%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{width: '86%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Stat Card Component
const StatCard = ({ title, value, change, color, icon, onClick }) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    orange: 'bg-orange-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500'
  }
  
  const bgColorClasses = {
    blue: 'bg-blue-50',
    orange: 'bg-orange-50',
    green: 'bg-green-50',
    purple: 'bg-purple-50'
  }
  
  const textColorClasses = {
    blue: 'text-blue-700',
    orange: 'text-orange-700',
    green: 'text-green-700',
    purple: 'text-purple-700'
  }
  
  return (
    <div 
      className="bg-white rounded-xl shadow-sm p-6 cursor-pointer hover:shadow-md transition-all duration-200 border border-transparent hover:border-gray-200"
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold mt-2 text-gray-800">{value}</p>
          <p className="text-gray-500 text-xs mt-2">{change}</p>
        </div>
        <div className={`rounded-xl p-3 ${bgColorClasses[color]}`}>
          <span className={`text-xl ${textColorClasses[color]}`}>{icon}</span>
        </div>
      </div>
    </div>
  )
}

// Action Button Component
const ActionButton = ({ icon, label, onClick }) => {
  return (
    <button 
      className="bg-white rounded-lg p-4 flex flex-col items-center justify-center border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all duration-200"
      onClick={onClick}
    >
      <span className="text-blue-600 mb-2">{icon}</span>
      <span className="text-gray-700 text-sm font-medium">{label}</span>
    </button>
  )
}

// Activity Item Component
const ActivityItem = ({ time, action, case: caseNumber, icon }) => {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 mt-1">
        <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
          <span className="text-blue-600 text-sm">{icon}</span>
        </div>
      </div>
      <div className="ml-4">
        <p className="text-gray-800 font-medium">{action}</p>
        <div className="flex items-center mt-1">
          <span className="text-gray-500 text-xs bg-gray-100 px-2 py-1 rounded-md">{caseNumber}</span>
          <span className="mx-2 text-gray-300">•</span>
          <span className="text-gray-500 text-xs">{time}</span>
        </div>
      </div>
    </div>
  )
}

// Hearing Item Component
const HearingItem = ({ case: caseName, time, court, status }) => {
  const statusColors = {
    preparation: 'bg-yellow-100 text-yellow-800',
    review: 'bg-blue-100 text-blue-800',
    confirmed: 'bg-green-100 text-green-800'
  }
  
  const statusText = {
    preparation: 'Preparation Needed',
    review: 'Under Review',
    confirmed: 'Confirmed'
  }
  
  return (
    <div className="border-l-4 border-orange-500 pl-3 py-2">
      <h3 className="font-medium text-gray-800">{caseName}</h3>
      <p className="text-sm text-gray-600">{time}</p>
      <p className="text-xs text-gray-500 mt-1">{court}</p>
      <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${statusColors[status]}`}>
        {statusText[status]}
      </span>
    </div>
  )
}

export default App