import { MENU_ITEMS } from '../../constants/index'; 

const Sidebar = ({ activeItem, setActiveItem }) => {
  return (
    <aside className="bg-gray-100 w-48 min-h-screen border-r border-gray-200">
      <nav className="p-4">
        <ul className="space-y-2">
          {MENU_ITEMS.map(item => (
            <li key={item.id}>
              <button
                onClick={() => setActiveItem(item.id)}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                  activeItem === item.id
                    ? 'bg-indigo-100 text-indigo-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
