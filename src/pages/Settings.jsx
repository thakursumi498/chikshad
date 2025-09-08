import React, { useState } from 'react';

export default function Settings() {
  // State for profile information
  const [profile, setProfile] = useState({
    name: 'Sarah Johnson',
    specialization: 'Intellectual Property Law',
    barRegistration: 'CA-2020-18935',
    email: 's.johnson@lawfirm.com',
    phone: '(555) 123-4567',
    bio: 'Experienced IP attorney with focus on technology patents and copyright law.'
  });
  
  // State for notification preferences
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    caseUpdates: true,
    courtDeadlines: true,
    newMessages: true,
    marketingEmails: false
  });
  
  // State for theme preferences
  const [theme, setTheme] = useState({
    mode: 'light',
    fontSize: 'medium',
    highContrast: false
  });
  
  // State for workspace settings
  const [workspace, setWorkspace] = useState({
    defaultView: 'dashboard',
    matterSorting: 'recent',
    documentAutoSave: true,
    backupFrequency: 'daily'
  });

  // Handle profile changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  // Handle notification changes
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications(prev => ({ ...prev, [name]: checked }));
  };

  // Handle theme changes
  const handleThemeChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTheme(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  // Handle workspace changes
  const handleWorkspaceChange = (e) => {
    const { name, value, type, checked } = e.target;
    setWorkspace(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">⚙️ Settings & Workspace</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left sidebar navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-medium text-gray-700 mb-3">Settings Categories</h3>
              <ul className="space-y-2">
                <li className="px-3 py-2 bg-blue-50 text-blue-700 rounded-md font-medium">Profile Information</li>
                <li className="px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer">Workspace Setup</li>
                <li className="px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer">Theme & Appearance</li>
                <li className="px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer">Notifications</li>
                <li className="px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer">Billing & Subscription</li>
              </ul>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Information Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Advocate Profile</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                  <select
                    name="specialization"
                    value={profile.specialization}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Intellectual Property Law</option>
                    <option>Criminal Law</option>
                    <option>Corporate Law</option>
                    <option>Family Law</option>
                    <option>Real Estate Law</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bar Registration Number</label>
                  <input
                    type="text"
                    name="barRegistration"
                    value={profile.barRegistration}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Professional Bio</label>
                  <textarea
                    name="bio"
                    value={profile.bio}
                    onChange={handleProfileChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Save Profile
                </button>
              </div>
            </div>
            
            {/* Theme Customization Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Theme & Appearance</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Theme Mode</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="mode"
                        value="light"
                        checked={theme.mode === 'light'}
                        onChange={handleThemeChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Light</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="mode"
                        value="dark"
                        checked={theme.mode === 'dark'}
                        onChange={handleThemeChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Dark</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="mode"
                        value="auto"
                        checked={theme.mode === 'auto'}
                        onChange={handleThemeChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">System Default</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
                  <select
                    name="fontSize"
                    value={theme.fontSize}
                    onChange={handleThemeChange}
                    className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="x-large">Extra Large</option>
                  </select>
                </div>
                
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="highContrast"
                      checked={theme.highContrast}
                      onChange={handleThemeChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">High Contrast Mode</span>
                  </label>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Apply Theme
                </button>
              </div>
            </div>
            
            {/* Notifications Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Notification Preferences</h3>
              
              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="emailNotifications"
                    checked={notifications.emailNotifications}
                    onChange={handleNotificationChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Enable Email Notifications</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="caseUpdates"
                    checked={notifications.caseUpdates}
                    onChange={handleNotificationChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Case Updates</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="courtDeadlines"
                    checked={notifications.courtDeadlines}
                    onChange={handleNotificationChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Court Deadlines</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="newMessages"
                    checked={notifications.newMessages}
                    onChange={handleNotificationChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">New Messages</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="marketingEmails"
                    checked={notifications.marketingEmails}
                    onChange={handleNotificationChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Marketing Emails</span>
                </label>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}