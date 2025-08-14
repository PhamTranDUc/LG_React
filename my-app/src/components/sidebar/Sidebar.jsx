import { useNavigate, useLocation } from "react-router-dom";
import { MENU_ITEMS } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../store/slice/themeSlice";

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

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
        className={`fixed inset-x-0 top-16 bottom-0 bg-black bg-opacity-20 z-30 md:hidden transition-opacity duration-300
        ${sidebarOpen ? "opacity-50 visible" : "opacity-0 invisible"}`}
        onClick={toggleSidebar}
        aria-hidden="true"
      />

      <aside
        className={`
          fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 md:w-56 z-40 transform transition-all duration-300 ease-out
          border-r ${theme === "dark" ? "bg-gray-900 border-gray-700 text-gray-100" : "bg-white border-gray-200 text-gray-700"}
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          shadow-2xl md:shadow-none
        `}
      >
        <div className="p-6 border-b border-gray-100 md:hidden">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{theme === "dark" ? "Menu (Dark)" : "Menu"}</h2>
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-20"
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
                      w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center space-x-3 group relative overflow-hidden
                      ${isActive
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-[1.02]"
                        : "hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-indigo-600 hover:scale-[1.01]"}
                    `}
                  >
                    <div className={`w-2 h-2 rounded-full transition-all duration-200 ${isActive ? "bg-white" : "bg-gray-400 group-hover:bg-indigo-500"}`} />
                    <span className="font-medium relative z-10">{item.label}</span>

                    {!isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
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

        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100 dark:border-gray-700">
          <div className="p-4 space-y-2">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center space-x-3 group relative overflow-hidden text-red-600 hover:bg-red-50 dark:hover:bg-red-700 hover:scale-[1.01]"
            >
              <div className="w-2 h-2 rounded-full bg-red-400 group-hover:bg-red-500 transition-all duration-200" />
              <span className="font-medium relative z-10">Logout</span>
            </button>

            <button
              onClick={() => dispatch(toggleTheme())}
              className="w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center space-x-3 group relative overflow-hidden bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <span className="font-medium relative z-10">{theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}</span>
            </button>
          </div>

          <div className="text-center pb-3">
            <p className="text-xs text-gray-500 dark:text-gray-400">JobTracker v1.0</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
