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
    <header className={`fixed top-0 left-0 right-0 h-16 shadow-lg z-50 
                        ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white'}`}>
      <div className="px-5 h-full flex flex-col justify-center">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {/* Toggle sidebar */}
            <button
              id="sidebar-toggle"
              className="md:hidden focus:outline-none p-2 rounded-lg hover:bg-white/10 transition-all duration-200 transform hover:scale-110 active:scale-95 focus:ring-2 focus:ring-white/30"
              onClick={handleSidebarToggle}
              aria-label="Toggle sidebar"
            >
              <div className="relative w-6 h-6 flex flex-col justify-center items-center">
                <span className="block w-6 h-0.5 mb-0.75 bg-white transform transition-all duration-300 hover:bg-yellow-300" />
                <span className="block w-6 h-0.5 mb-0.75 bg-white transform transition-all duration-300 hover:bg-yellow-300" />
                <span className="block w-6 h-0.5 bg-white transform transition-all duration-300 hover:bg-yellow-300" />
              </div>
            </button>

            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center
                            backdrop-blur-sm border border-white/30">
                <div className="w-4 h-4 bg-white rounded-sm transform rotate-12" />
              </div>
              <h1
                className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-yellow-200 cursor-pointer"
                onClick={() => navigate('/dashboard')}
              >
                JobTracker
              </h1>
            </div>
          </div>

          {/* Navbar & Dark Mode toggle */}
          <nav className="hidden md:flex items-center space-x-3">
            {['Home', 'About', 'Profile'].map((item, index) => (
              <a
                key={item}
                href="#"
                className="px-4 py-2 rounded-lg transition-all duration-200 hover:bg-white/10 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/30 relative group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="relative z-10">{item}</span>
                <div className="absolute inset-0 bg-white/5 rounded-lg transform scale-0 group-hover:scale-100 transition-transform duration-300" />
              </a>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className="px-3 py-1 rounded bg-white/20 text-white hover:bg-white/30 transition-all duration-200"
            >
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="py-2 space-y-2 border-t border-white/20">
            {['Home', 'About', 'Profile'].map((item, index) => (
              <a
                key={item}
                href="#"
                className="block px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 transform hover:translate-x-2"
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

            {/* Theme toggle mobile */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className="block w-full text-left px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200"
            >
              {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
