import { useNavigate, useLocation } from "react-router-dom";
import { MENU_ITEMS } from "../../constants";
import { useSelector } from "react-redux";

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const theme = useSelector((state) => state.theme.mode);

  const handleClick = (path) => {
    navigate(path);
    setTimeout(() => {
      toggleSidebar();
    }, 150);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    window.location.href = "/login";
  };

  return (
    <>
      <div
        className={`fixed inset-x-0 top-16 bottom-0 z-30 md:hidden transition-all duration-300
        ${sidebarOpen 
          ? `opacity-50 visible ${theme === 'dark' ? 'bg-black bg-opacity-60' : 'bg-black bg-opacity-20'}` 
          : "opacity-0 invisible"
        }`}
        onClick={toggleSidebar}
        aria-hidden="true"
      />

      <aside
        className={`
          fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 md:w-56 z-40 transform transition-all duration-300 ease-out
          border-r backdrop-blur-sm
          ${theme === "dark" 
            ? "bg-gradient-to-b from-slate-900 to-gray-900 border-gray-700/50 text-gray-100 shadow-2xl shadow-black/50" 
            : "bg-gradient-to-b from-white to-gray-50/80 border-gray-200 text-gray-700 shadow-2xl"
          }
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          md:shadow-lg
        `}
      >
        <div className={`p-6 border-b md:hidden transition-colors duration-300
                        ${theme === "dark" ? "border-gray-700/50" : "border-gray-100"}`}>
          <div className="flex items-center justify-between">
            <h2 className={`text-lg font-semibold transition-colors duration-300
                           ${theme === "dark" 
                             ? "bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400" 
                             : "text-gray-800"
                           }`}>
              {theme === "dark" ? "Menu" : "Menu"}
            </h2>
            <button
              onClick={toggleSidebar}
              className={`p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 hover:scale-110 active:scale-95
                         ${theme === "dark" 
                           ? "hover:bg-gray-700 focus:ring-blue-400" 
                           : "hover:bg-gray-200 focus:ring-indigo-500"
                         }`}
              aria-label="Close sidebar"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-1">
            {MENU_ITEMS.map((item, index) => {
              const isActive = location.pathname === item.path;

              return (
                <li
                  key={item.id}
                  style={{ animationDelay: sidebarOpen ? `${index * 50}ms` : "0ms" }}
                  className={`transform transition-all duration-300 ${sidebarOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0 md:translate-x-0 md:opacity-100"}`}
                >
                  <button
                    onClick={() => handleClick(item.path)}
                    className={`
                      w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center space-x-3 group relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-opacity-50
                      ${isActive
                        ? theme === "dark"
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 transform scale-[1.02] focus:ring-blue-400"
                          : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-[1.02] focus:ring-indigo-400"
                        : theme === "dark"
                          ? "hover:bg-gray-800/70 hover:text-blue-400 hover:scale-[1.01] focus:ring-gray-400"
                          : "hover:bg-gray-50 hover:text-indigo-600 hover:scale-[1.01] focus:ring-gray-300"
                      }
                    `}
                  >
                    <div className={`w-2 h-2 rounded-full transition-all duration-200 
                                   ${isActive 
                                     ? "bg-white animate-pulse" 
                                     : theme === "dark"
                                       ? "bg-gray-500 group-hover:bg-blue-400"
                                       : "bg-gray-400 group-hover:bg-indigo-500"
                                   }`} />
                    <span className="font-medium relative z-10">{item.label}</span>

                    {!isActive && (
                      <div className={`absolute inset-0 rounded-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left
                                     ${theme === "dark" 
                                       ? "bg-gradient-to-r from-gray-800/50 to-gray-700/50" 
                                       : "bg-gradient-to-r from-indigo-50 to-purple-50"
                                     }`} />
                    )}

                    {isActive && (
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                      </div>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={`absolute bottom-0 left-0 right-0 border-t transition-colors duration-300
                        ${theme === "dark" ? "border-gray-700/50" : "border-gray-100"}`}>
          <div className="p-4 space-y-2">
            <button
              onClick={handleLogout}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center space-x-3 group relative overflow-hidden hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-opacity-50
                         ${theme === "dark" 
                           ? "text-red-400 hover:bg-red-900/20 focus:ring-red-400" 
                           : "text-red-600 hover:bg-red-50 focus:ring-red-300"
                         }`}
            >
              <div className={`w-2 h-2 rounded-full transition-all duration-200
                             ${theme === "dark" 
                               ? "bg-red-400 group-hover:bg-red-300" 
                               : "bg-red-400 group-hover:bg-red-500"
                             }`} />
              <span className="font-medium relative z-10">Logout</span>
            </button>
          </div>

          <div className="text-center pb-3">
            <p className={`text-xs transition-colors duration-300
                          ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
              JobTracker v1.0
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;