import React from 'react';

const Header = () => {
  return (
    <header className="bg-indigo-600 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">JobTracker</h1>
        <nav className="flex space-x-6">
          <a href="#" className="hover:text-indigo-200 transition-colors">Home</a>
          <a href="#" className="hover:text-indigo-200 transition-colors">About</a>
          <a href="#" className="hover:text-indigo-200 transition-colors">Profile</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;