import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const theme = useSelector((state) => state.theme.mode); 

  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      {/* Header */}
      <Header toggleSidebar={toggleSidebar} />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <main
          className="flex-1 overflow-auto p-8 md:ml-56 pt-24 text-gray-900 dark:text-gray-100 transition-colors duration-300"
          style={{
            backgroundColor: theme === "dark" ? "#1A202C" : "#F9FAFB", 
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
