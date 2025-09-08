import React, { useState, useRef, useEffect } from 'react';

const Navbar = ({ userData, sidebarCollapsed, setSidebarCollapsed }) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);

  const notifications = [
    { id: 1, text: 'Hearing reminder for Case #C-2023-4582', time: '10 mins ago', read: false },
    { id: 2, text: 'New document uploaded by client', time: '45 mins ago', read: false },
    { id: 3, text: 'Court date changed for Smith v. Jones', time: '2 hours ago', read: true },
    { id: 4, text: 'Client Johnson signed the agreement', time: '5 hours ago', read: true }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Function to search all visible content
  const searchAllContent = (query) => {
    if (!query.trim()) return [];
    
    const results = [];
    const searchTerm = query.toLowerCase();
    
    // Get all text content from the main content area
    const mainContent = document.querySelector('main');
    if (!mainContent) return results;
    
    // Search through all elements with text content
    const textNodes = mainContent.querySelectorAll('*:not(script):not(style)');
    
    textNodes.forEach(node => {
      if (node.children.length === 0 && node.textContent) {
        const text = node.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
          // Get some context around the match
          const startIndex = Math.max(0, text.indexOf(searchTerm) - 20);
          const endIndex = Math.min(text.length, text.indexOf(searchTerm) + searchTerm.length + 50);
          const context = text.substring(startIndex, endIndex);
          
          // Find the closest section or card for categorization
          let category = 'Page Content';
          let parent = node.parentElement;
          
          while (parent && parent !== mainContent) {
            if (parent.tagName === 'SECTION' || parent.classList.contains('card') || 
                parent.classList.contains('panel') || parent.getAttribute('aria-label')) {
              if (parent.getAttribute('aria-label')) {
                category = parent.getAttribute('aria-label');
              } else if (parent.classList.contains('card')) {
                category = 'Card';
              } else if (parent.tagName === 'SECTION') {
                category = 'Section';
              }
              break;
            }
            parent = parent.parentElement;
          }
          
          results.push({
            text: context + '...',
            category: category,
            element: node
          });
        }
      }
    });
    
    return results.slice(0, 10); // Limit to 10 results
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length > 2) {
      const results = searchAllContent(query);
      setSearchResults(results);
      setSearchOpen(true);
    } else {
      setSearchResults([]);
      setSearchOpen(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setSearchOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      // Scroll to the first result
      searchResults[0].element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Highlight the element temporarily
      const originalBg = searchResults[0].element.style.backgroundColor;
      searchResults[0].element.style.backgroundColor = '#fffdba';
      setTimeout(() => {
        searchResults[0].element.style.backgroundColor = originalBg;
      }, 2000);
    }
  };

  const handleResultClick = (result) => {
    result.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // Highlight the element temporarily
    const originalBg = result.element.style.backgroundColor;
    result.element.style.backgroundColor = '#fffdba';
    setTimeout(() => {
      result.element.style.backgroundColor = originalBg;
    }, 2000);
    
    setSearchOpen(false);
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3 shadow-sm flex justify-between items-center">
      {/* Left side - Menu toggle */}
      <div className="flex items-center">
        <button 
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="p-2 rounded-md text-gray-500 hover:bg-gray-100 mr-2"
          aria-label="Toggle sidebar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-2xl mx-4 relative" ref={searchRef}>
        <form onSubmit={handleSearchSubmit}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search anything on this page..."
              className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </form>

        {/* Search Results Dropdown */}
        {searchOpen && searchResults.length > 0 && (
          <div className="absolute z-50 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-2 border-b border-gray-200 bg-gray-50">
              <h3 className="text-sm font-medium text-gray-700">
                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
              </h3>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {searchResults.map((result, index) => (
                <div 
                  key={index} 
                  className="p-3 border-b border-gray-100 hover:bg-blue-50 cursor-pointer"
                  onClick={() => handleResultClick(result)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-800">{result.text}</p>
                    </div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {result.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {searchOpen && searchQuery.length > 2 && searchResults.length === 0 && (
          <div className="absolute z-50 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-4 text-center">
              <svg className="w-12 h-12 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="mt-2 text-sm text-gray-600">No results found for "{searchQuery}"</p>
              <p className="text-xs text-gray-500">Try different keywords</p>
            </div>
          </div>
        )}
      </div>

      {/* Right side items */}
      <div className="flex items-center space-x-3">
        {/* Apps button */}
        <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 relative">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button 
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 relative"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center h-5 w-5 text-xs font-bold text-white bg-red-500 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-10 border border-gray-200">
              <div className="p-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h3 className="text-sm font-medium text-gray-700">Notifications</h3>
                <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                  Mark all as read
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map(notification => (
                    <div key={notification.id} className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}>
                      <div className="flex">
                        {!notification.read && (
                          <span className="h-2 w-2 mt-1.5 rounded-full bg-blue-500 mr-3 flex-shrink-0"></span>
                        )}
                        <div className={notification.read ? "ml-5" : ""}>
                          <p className="text-sm text-gray-800">{notification.text}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="p-4 text-sm text-gray-500">No notifications</p>
                )}
              </div>
              <div className="p-2 border-t border-gray-200 bg-gray-50 text-center">
                <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User profile */}
        <div className="relative">
          <button 
            className="flex items-center space-x-2 focus:outline-none"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <div className="h-9 w-9 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
              {userData ? userData.name.charAt(0) : 'U'}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-700">{userData ? userData.name : 'User'}</p>
              <p className="text-xs text-gray-500">{userData ? userData.role : 'Advocate'}</p>
            </div>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-800">{userData ? userData.name : 'User'}</p>
                <p className="text-xs text-gray-500 truncate">{userData ? userData.role : 'Advocate'}</p>
              </div>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
              <div className="border-t border-gray-100"></div>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;