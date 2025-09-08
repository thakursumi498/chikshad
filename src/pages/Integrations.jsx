import React, { useState } from 'react';

export default function Integrations() {
  // State for integration statuses
  const [integrations, setIntegrations] = useState({
    ecPortal: { connected: false, loading: false },
    patta: { connected: false, loading: false },
    fmb: { connected: false, loading: false },
    guidelineValue: { connected: false, loading: false },
    eFiling: { connected: false, loading: false },
    calendarSync: { connected: false, loading: false }
  });

  // State for calendar settings
  const [calendarSettings, setCalendarSettings] = useState({
    syncFrequency: 'daily',
    notifyBefore: '1 day',
    courtTypes: ['high', 'district', 'supreme']
  });

  // Function to toggle integration connection
  const toggleIntegration = (integrationName) => {
    setIntegrations(prev => ({
      ...prev,
      [integrationName]: {
        ...prev[integrationName],
        loading: true
      }
    }));

    // Simulate API call
    setTimeout(() => {
      setIntegrations(prev => ({
        ...prev,
        [integrationName]: {
          ...prev[integrationName],
          connected: !prev[integrationName].connected,
          loading: false
        }
      }));
    }, 1500);
  };

  // Function to handle calendar setting changes
  const handleCalendarSettingChange = (setting, value) => {
    if (setting === 'courtTypes') {
      // Toggle court type in array
      const newCourtTypes = calendarSettings.courtTypes.includes(value)
        ? calendarSettings.courtTypes.filter(type => type !== value)
        : [...calendarSettings.courtTypes, value];
      
      setCalendarSettings(prev => ({
        ...prev,
        courtTypes: newCourtTypes
      }));
    } else {
      setCalendarSettings(prev => ({
        ...prev,
        [setting]: value
      }));
    }
  };

  // Government portal integrations
  const governmentPortals = [
    {
      id: 'ecPortal',
      name: 'Election Commission Portal',
      description: 'Access voter information and election records',
      icon: 'how_to_vote',
      connected: integrations.ecPortal.connected,
      loading: integrations.ecPortal.loading
    },
    {
      id: 'patta',
      name: 'Patta Chitta',
      description: 'Land records and property ownership verification',
      icon: 'map',
      connected: integrations.patta.connected,
      loading: integrations.patta.loading
    },
    {
      id: 'fmb',
      name: 'FMB - Field Measurement Book',
      description: 'Survey and land measurement data',
      icon: 'square_foot',
      connected: integrations.fmb.connected,
      loading: integrations.fmb.loading
    },
    {
      id: 'guidelineValue',
      name: 'Guideline Value Registry',
      description: 'Property valuation and registration data',
      icon: 'attach_money',
      connected: integrations.guidelineValue.connected,
      loading: integrations.guidelineValue.loading
    },
    {
      id: 'eFiling',
      name: 'E-Filing System',
      description: 'Electronic court document filing',
      icon: 'description',
      connected: integrations.eFiling.connected,
      loading: integrations.eFiling.loading
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">🔗 Integrations</h2>
        <p className="text-gray-600 mb-8">Connect with government portals and sync with court calendars</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Government Portals Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Government Portals</h3>
            <p className="text-gray-600 mb-6">Connect directly to government systems for seamless data access</p>
            
            <div className="space-y-4">
              {governmentPortals.map(portal => (
                <div key={portal.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <span className="material-icons text-blue-600">{portal.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{portal.name}</h4>
                      <p className="text-sm text-gray-600">{portal.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleIntegration(portal.id)}
                    disabled={portal.loading}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      portal.connected 
                        ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    } transition-colors flex items-center`}
                  >
                    {portal.loading ? (
                      <>
                        <span className="material-icons animate-spin mr-1">refresh</span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <span className="material-icons mr-1">
                          {portal.connected ? 'check_circle' : 'link'}
                        </span>
                        {portal.connected ? 'Connected' : 'Connect'}
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Calendar Sync Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Court Calendar Sync</h3>
            <p className="text-gray-600 mb-6">Sync with court cause-lists and get automatic updates</p>
            
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg mb-6">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <span className="material-icons text-purple-600">event</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Calendar Sync</h4>
                  <p className="text-sm text-gray-600">Sync with court cause-lists and get reminders</p>
                </div>
              </div>
              <button
                onClick={() => toggleIntegration('calendarSync')}
                disabled={integrations.calendarSync.loading}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  integrations.calendarSync.connected 
                    ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                } transition-colors flex items-center`}
              >
                {integrations.calendarSync.loading ? (
                  <>
                    <span className="material-icons animate-spin mr-1">refresh</span>
                    Processing...
                  </>
                ) : (
                  <>
                    <span className="material-icons mr-1">
                      {integrations.calendarSync.connected ? 'check_circle' : 'link'}
                    </span>
                    {integrations.calendarSync.connected ? 'Connected' : 'Connect'}
                  </>
                )}
              </button>
            </div>

            {integrations.calendarSync.connected && (
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-4">Calendar Settings</h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sync Frequency</label>
                    <select 
                      value={calendarSettings.syncFrequency}
                      onChange={(e) => handleCalendarSettingChange('syncFrequency', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="realtime">Real-time</option>
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notify Before Hearing</label>
                    <select 
                      value={calendarSettings.notifyBefore}
                      onChange={(e) => handleCalendarSettingChange('notifyBefore', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="1 hour">1 hour</option>
                      <option value="3 hours">3 hours</option>
                      <option value="6 hours">6 hours</option>
                      <option value="1 day">1 day</option>
                      <option value="2 days">2 days</option>
                      <option value="1 week">1 week</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Court Types to Sync</label>
                    <div className="space-y-2">
                      {[
                        { id: 'high', label: 'High Court' },
                        { id: 'district', label: 'District Court' },
                        { id: 'supreme', label: 'Supreme Court' },
                        { id: 'tribunal', label: 'Tribunals' }
                      ].map(court => (
                        <label key={court.id} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={calendarSettings.courtTypes.includes(court.id)}
                            onChange={() => handleCalendarSettingChange('courtTypes', court.id)}
                            className="rounded text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-gray-700">{court.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Save Settings
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white rounded-lg shadow p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Integration Activity</h3>
          
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Integration
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {governmentPortals.map(portal => (
                  <tr key={portal.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <span className="material-icons text-blue-600 text-sm">{portal.icon}</span>
                        </div>
                        <div className="text-sm font-medium text-gray-900">{portal.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        portal.connected ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {portal.connected ? 'Connected' : 'Disconnected'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date().toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-800 mr-3">
                        View Logs
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        Disconnect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}