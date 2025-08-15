import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../store/slice/themeSlice'; 

const Header = ({ toggleSidebar }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.theme.mode);

  const handleSidebarToggle = () => {
    const button = document.getElementById('sidebar-toggle');
    button?.classList.add('animate-pulse');
    setTimeout(() => button?.classList.remove('animate-pulse'), 200);
    toggleSidebar();
  };

  return (
    <header className={`fixed top-0 left-0 right-0 h-16 shadow-lg z-50 transition-all duration-300 ease-in-out
                        ${theme === 'dark' 
                          ? 'bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 text-white border-b border-gray-700/50' 
                          : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white'
                        }`}>
      <div className="px-5 h-full flex flex-col justify-center">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              id="sidebar-toggle"
              className={`md:hidden focus:outline-none p-2 rounded-lg transition-all duration-200 transform hover:scale-110 active:scale-95 focus:ring-2 focus:ring-opacity-30
                         ${theme === 'dark' 
                           ? 'hover:bg-gray-700/50 focus:ring-gray-400' 
                           : 'hover:bg-white/10 focus:ring-white/30'
                         }`}
              onClick={handleSidebarToggle}
              aria-label="Toggle sidebar"
            >
              <div className="relative w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block w-6 h-0.5 mb-0.75 transform transition-all duration-300
                                ${theme === 'dark' ? 'bg-white hover:bg-blue-300' : 'bg-white hover:bg-yellow-300'}`} />
                <span className={`block w-6 h-0.5 mb-0.75 transform transition-all duration-300
                                ${theme === 'dark' ? 'bg-white hover:bg-blue-300' : 'bg-white hover:bg-yellow-300'}`} />
                <span className={`block w-6 h-0.5 transform transition-all duration-300
                                ${theme === 'dark' ? 'bg-white hover:bg-blue-300' : 'bg-white hover:bg-yellow-300'}`} />
              </div>
            </button>

            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center backdrop-blur-sm border transition-all duration-300
                              ${theme === 'dark' 
                                ? 'bg-gray-800/50 border-gray-600/50 shadow-lg shadow-blue-500/10' 
                                : 'bg-white/20 border-white/30'
                              }`}>
                <div className={`w-4 h-4 rounded-sm transform rotate-12 transition-all duration-300
                               ${theme === 'dark' ? 'bg-blue-400' : 'bg-white'}`} />
              </div>
              <h1
                className={`text-xl font-bold cursor-pointer transition-all duration-300
                           ${theme === 'dark' 
                             ? 'bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-300 hover:to-purple-300' 
                             : 'bg-clip-text text-transparent bg-gradient-to-r from-white to-yellow-200 hover:from-yellow-100 hover:to-yellow-300'
                           }`}
                onClick={() => navigate('/dashboard')}
              >
                JobTracker
              </h1>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-3">
            {['Home', 'About', 'Profile'].map((item, index) => (
              <a
                key={item}
                href="#"
                className={`px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-30 relative group
                           ${theme === 'dark' 
                             ? 'hover:bg-gray-700/50 focus:ring-gray-400' 
                             : 'hover:bg-white/10 focus:ring-white/30'
                           }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="relative z-10">{item}</span>
                <div className={`absolute inset-0 rounded-lg transform scale-0 group-hover:scale-100 transition-transform duration-300
                               ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-white/5'}`} />
              </a>
            ))}

            <button
              onClick={() => dispatch(toggleTheme())}
              className={`relative overflow-hidden px-4 py-2 rounded-xl font-medium transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-opacity-50
                         ${theme === 'dark' 
                           ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/25 focus:ring-blue-400' 
                           : 'bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-300 hover:to-orange-300 text-gray-800 shadow-lg shadow-yellow-400/25 focus:ring-yellow-300'
                         } 
                         hover:scale-105 active:scale-95`}
            >
              <div className="relative z-10 flex items-center space-x-2">
                <span className="text-sm transition-transform duration-300 group-hover:rotate-12">
                  {theme === 'light' ? '🌙' : '☀️'}
                </span>
                <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
              </div>
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                             ${theme === 'dark' 
                               ? 'bg-gradient-to-r from-blue-400 to-purple-400' 
                               : 'bg-gradient-to-r from-yellow-300 to-orange-300'
                             }`} />
            </button>
          </nav>

          <button
            className={`md:hidden p-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-30
                       ${theme === 'dark' 
                         ? 'hover:bg-gray-700/50 focus:ring-gray-400' 
                         : 'hover:bg-white/10 focus:ring-white/30'
                       }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>
        </div>

        <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className={`py-2 space-y-2 border-t transition-colors duration-300
                          ${theme === 'dark' ? 'border-gray-600/50' : 'border-white/20'}`}>
            {['Home', 'About', 'Profile'].map((item, index) => (
              <a
                key={item}
                href="#"
                className={`block px-4 py-2 rounded-lg transition-all duration-200 transform hover:translate-x-2
                           ${theme === 'dark' 
                             ? 'hover:bg-gray-700/50' 
                             : 'hover:bg-white/10'
                           }`}
                style={{
                  animationDelay: `${index * 50}ms`,
                  transform: isMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                  opacity: isMenuOpen ? 1 : 0,
                  transition: `all 300ms ease-out ${index * 50}ms`,
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}

            <button
              onClick={() => dispatch(toggleTheme())}
              className={`block w-full text-left px-4 py-2 rounded-lg font-medium transition-all duration-300 group
                         ${theme === 'dark' 
                           ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white' 
                           : 'bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-300 hover:to-orange-300 text-gray-800'
                         }`}
            >
              <div className="flex items-center space-x-2">
                <span className="transition-transform duration-300 group-hover:rotate-12">
                  {theme === 'light' ? '🌙' : '☀️'}
                </span>
                <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;