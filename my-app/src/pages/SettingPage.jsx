import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "../store/slice/themeSlice";

const SettingPage = () => {
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  const handleThemeChange = (mode) => {
    dispatch(setTheme(mode));
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
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleThemeChange("light")}
            className={`px-4 py-2 rounded-md font-medium border transition-colors duration-300 ${
              theme === "light"
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-gray-700 border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
            }`}
          >
            Light
          </button>
          <button
            onClick={() => handleThemeChange("dark")}
            className={`px-4 py-2 rounded-md font-medium border transition-colors duration-300 ${
              theme === "dark"
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-gray-700 border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
            }`}
          >
            Dark
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
