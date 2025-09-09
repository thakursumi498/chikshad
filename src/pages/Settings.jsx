import React, { useState, useEffect } from 'react';

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

  // State for active settings category
  const [activeCategory, setActiveCategory] = useState('profile');

  // Load saved settings from localStorage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('profileSettings');
    const savedNotifications = localStorage.getItem('notificationSettings');
    const savedTheme = localStorage.getItem('themeSettings');
    const savedWorkspace = localStorage.getItem('workspaceSettings');
    
    if (savedProfile) setProfile(JSON.parse(savedProfile));
    if (savedNotifications) setNotifications(JSON.parse(savedNotifications));
    if (savedTheme) {
      const themeData = JSON.parse(savedTheme);
      setTheme(themeData);
      applyThemeSettings(themeData);
    }
    if (savedWorkspace) setWorkspace(JSON.parse(savedWorkspace));
  }, []);

  // Apply theme settings to the document
  const applyThemeSettings = (themeData) => {
    document.body.classList.remove('light', 'dark', 'high-contrast');
    document.body.classList.add(themeData.mode);
    
    if (themeData.highContrast) {
      document.body.classList.add('high-contrast');
    }
    
    document.body.classList.remove('font-small', 'font-medium', 'font-large', 'font-x-large');
    document.body.classList.add(`font-${themeData.fontSize}`);
  };

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
    const newTheme = { 
      ...theme, 
      [name]: type === 'checkbox' ? checked : value 
    };
    
    setTheme(newTheme);
  };

  // Handle workspace changes
  const handleWorkspaceChange = (e) => {
    const { name, value, type, checked } = e.target;
    setWorkspace(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  // Save profile settings
  const saveProfileSettings = () => {
    localStorage.setItem('profileSettings', JSON.stringify(profile));
    alert('Profile settings saved successfully!');
  };

  // Save notification settings
  const saveNotificationSettings = () => {
    localStorage.setItem('notificationSettings', JSON.stringify(notifications));
    alert('Notification preferences saved successfully!');
  };

  // Apply and save theme settings
  const applyThemeSettingsAndSave = () => {
    applyThemeSettings(theme);
    localStorage.setItem('themeSettings', JSON.stringify(theme));
    alert('Theme settings applied and saved successfully!');
  };

  // Save workspace settings
  const saveWorkspaceSettings = () => {
    localStorage.setItem('workspaceSettings', JSON.stringify(workspace));
    alert('Workspace settings saved successfully!');
  };

  // Validate email format
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Validate profile form
  const validateProfileForm = () => {
    if (!profile.name.trim()) {
      alert('Please enter your name');
      return false;
    }
    
    if (!profile.barRegistration.trim()) {
      alert('Please enter your bar registration number');
      return false;
    }
    
    if (!validateEmail(profile.email)) {
      alert('Please enter a valid email address');
      return false;
    }
    
    return true;
  };

  // Handle profile form submission
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (validateProfileForm()) {
      saveProfileSettings();
    }
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
                <li 
                  className={`px-3 py-2 rounded-md font-medium cursor-pointer flex items-center ${activeCategory === 'profile' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}
                  onClick={() => setActiveCategory('profile')}
                >
                  <span className="mr-2">👤</span> Profile Information
                </li>
                <li 
                  className={`px-3 py-2 rounded-md font-medium cursor-pointer flex items-center ${activeCategory === 'workspace' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}
                  onClick={() => setActiveCategory('workspace')}
                >
                  <span className="mr-2">💼</span> Workspace Setup
                </li>
                <li 
                  className={`px-3 py-2 rounded-md font-medium cursor-pointer flex items-center ${activeCategory === 'theme' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}
                  onClick={() => setActiveCategory('theme')}
                >
                  <span className="mr-2">🎨</span> Theme & Appearance
                </li>
                <li 
                  className={`px-3 py-2 rounded-md font-medium cursor-pointer flex items-center ${activeCategory === 'notifications' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}
                  onClick={() => setActiveCategory('notifications')}
                >
                  <span className="mr-2">🔔</span> Notifications
                </li>
                <li 
                  className={`px-3 py-2 rounded-md font-medium cursor-pointer flex items-center ${activeCategory === 'billing' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}
                  onClick={() => setActiveCategory('billing')}
                >
                  <span className="mr-2">💳</span> Billing & Subscription
                </li>
              </ul>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Information Card - Only show if active */}
            {activeCategory === 'profile' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Advocate Profile</h3>
                
                <form onSubmit={handleProfileSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
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
                        required
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
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={profile.phone}
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
                    <button 
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                      Save Profile
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Workspace Settings Card - Only show if active */}
            {activeCategory === 'workspace' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Workspace Setup</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Default View</label>
                    <select
                      name="defaultView"
                      value={workspace.defaultView}
                      onChange={handleWorkspaceChange}
                      className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="dashboard">Dashboard</option>
                      <option value="cases">Cases</option>
                      <option value="calendar">Calendar</option>
                      <option value="documents">Documents</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Matter Sorting</label>
                    <select
                      name="matterSorting"
                      value={workspace.matterSorting}
                      onChange={handleWorkspaceChange}
                      className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="recent">Most Recent</option>
                      <option value="alphabetical">Alphabetical</option>
                      <option value="priority">Priority</option>
                      <option value="status">Status</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Backup Frequency</label>
                    <select
                      name="backupFrequency"
                      value={workspace.backupFrequency}
                      onChange={handleWorkspaceChange}
                      className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="documentAutoSave"
                        checked={workspace.documentAutoSave}
                        onChange={handleWorkspaceChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Enable Document Auto-Save</span>
                    </label>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button 
                    onClick={saveWorkspaceSettings}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Save Workspace Settings
                  </button>
                </div>
              </div>
            )}
            
            {/* Theme Customization Card - Only show if active */}
            {activeCategory === 'theme' && (
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
                  <button 
                    onClick={applyThemeSettingsAndSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Apply Theme
                  </button>
                </div>
              </div>
            )}
            
            {/* Notifications Card - Only show if active */}
            {activeCategory === 'notifications' && (
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
                  <button 
                    onClick={saveNotificationSettings}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
            
            {/* Billing Card - Only show if active */}
            {activeCategory === 'billing' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Billing & Subscription</h3>
                
                <div className="space-y-6">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium text-gray-700 mb-2">Current Plan</h4>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-lg font-semibold">Professional Plan</p>
                        <p className="text-gray-600">$49.99/month</p>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                        Change Plan
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Payment Method</h4>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-6 bg-gray-200 rounded-sm mr-3"></div>
                        <div>
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className="text-sm text-gray-600">Expires 12/2024</p>
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800">Edit</button>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Billing History</h4>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Invoice</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-4 py-3">Oct 15, 2023</td>
                            <td className="px-4 py-3">$49.99</td>
                            <td className="px-4 py-3"><span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Paid</span></td>
                            <td className="px-4 py-3"><button className="text-blue-600 hover:text-blue-800">Download</button></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3">Sep 15, 2023</td>
                            <td className="px-4 py-3">$49.99</td>
                            <td className="px-4 py-3"><span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Paid</span></td>
                            <td className="px-4 py-3"><button className="text-blue-600 hover:text-blue-800">Download</button></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}