import { useNavigate, useLocation } from "react-router-dom";
import { MENU_ITEMS } from "../../constants";

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (path) => {
    navigate(path);
    setTimeout(() => {
      toggleSidebar();
    }, 150);
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-20 z-30 md:hidden transition-opacity duration-300
        ${sidebarOpen ? "opacity-50 visible" : "opacity-0 invisible"}`}
        onClick={toggleSidebar}
        aria-hidden="true"
      />

      <aside
        className={`
          fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white shadow-2xl w-64
          z-40 transform transition-all duration-300 ease-out
          md:translate-x-0 md:shadow-none md:w-56
          border-r border-gray-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="p-6 border-b border-gray-100 md:hidden">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-20"
              aria-label="Close sidebar"
            >
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
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
                  style={{
                    animationDelay: sidebarOpen ? `${index * 50}ms` : "0ms",
                  }}
                  className={`transform transition-all duration-300 ${
                    sidebarOpen
                      ? "translate-x-0 opacity-100"
                      : "translate-x-4 opacity-0 md:translate-x-0 md:opacity-100"
                  }`}
                >
                  <button
                    onClick={() => handleClick(item.path)}
                    className={`
                      w-full text-left px-4 py-3 rounded-xl transition-all duration-200
                      flex items-center space-x-3 group relative overflow-hidden
                      ${
                        isActive
                          ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-[1.02]"
                          : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600 hover:transform hover:scale-[1.01]"
                      }
                    `}
                  >
                    <div
                      className={`
                        w-2 h-2 rounded-full transition-all duration-200
                        ${
                          isActive
                            ? "bg-white"
                            : "bg-gray-400 group-hover:bg-indigo-500"
                        }
                      `}
                    />
                    <span className="font-medium relative z-10">
                      {item.label}
                    </span>

                    {!isActive && (
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 
                                    transform scale-x-0 group-hover:scale-x-100 transition-transform 
                                    duration-300 origin-left"
                      />
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

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 md:hidden">
          <div className="text-center">
            <p className="text-xs text-gray-500">JobTracker v1.0</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
