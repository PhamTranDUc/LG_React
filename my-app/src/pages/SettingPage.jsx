import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "../store/slice/themeSlice";

const SettingPage = () => {
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  const handleThemeToggle = () => {
    const newMode = theme === "dark" ? "light" : "dark";
    dispatch(setTheme(newMode));
  };

  return (
    <div
      className="max-w-4xl mx-auto p-8 min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: theme === "dark" ? "#1A202C" : "#F9FAFB",
      }}
    >
      <h1
        className="text-2xl font-bold mb-6 transition-colors duration-300"
        style={{ color: theme === "dark" ? "#FFFFFF" : "#1F2937" }}
      >
        Settings
      </h1>

      <div
        className="p-6 rounded-lg shadow-md border transition-colors duration-300"
        style={{
          backgroundColor: theme === "dark" ? "#2D3748" : "#FFFFFF",
          borderColor: theme === "dark" ? "#4A5568" : "#E5E7EB",
          color: theme === "dark" ? "#FFFFFF" : "#1F2937",
        }}
      >
        <h2
          className="text-xl font-semibold mb-4 transition-colors duration-300"
          style={{ color: theme === "dark" ? "#FFFFFF" : "#1F2937" }}
        >
          Theme
        </h2>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">Light</span>
            <button
              onClick={handleThemeToggle}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                theme === "dark" 
                  ? "bg-indigo-600" 
                  : "bg-gray-200"
              }`}
              style={{
                backgroundColor: theme === "dark" ? "#4F46E5" : "#E5E7EB"
              }}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
                  theme === "dark" ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className="text-sm font-medium">Dark</span>
          </div>
          
          <div className="text-sm text-gray-500">
            Current: <span className="font-medium capitalize">{theme}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t" style={{
          borderColor: theme === "dark" ? "#4A5568" : "#E5E7EB"
        }}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center">
              ☀️
            </div>
            <span className="text-sm">Light Mode</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center">
              🌙
            </div>
            <span className="text-sm">Dark Mode</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;