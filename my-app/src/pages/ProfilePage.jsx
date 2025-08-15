import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { Edit3, LogOut, Shield, Settings } from "lucide-react";
import { PROFILE_FIELDS, PROFILE_THEME } from "../constants/index";

export default function ProfilePage() {
  const user = useSelector((state) => state.auth.user);
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const fields = PROFILE_FIELDS(user);
  const t = PROFILE_THEME[theme];

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${t.bgGradient} flex items-center justify-center p-4`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-4 -left-4 w-72 h-72 rounded-full opacity-20 blur-3xl transition-colors duration-500 ${t.blob1}`}></div>
        <div className={`absolute -bottom-4 -right-4 w-72 h-72 rounded-full opacity-20 blur-3xl transition-colors duration-500 ${t.blob2}`}></div>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl transition-colors duration-500 ${t.blob3}`}></div>
      </div>

      <div
        className={`relative backdrop-blur-lg rounded-3xl p-8 w-full max-w-md shadow-2xl border transition-all duration-500 ${t.card}`}
      >
        <div className="absolute top-6 left-6">
          <button
            onClick={() => console.log("Settings clicked")}
            className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${theme === "dark" ? "bg-gray-700/80 hover:bg-gray-600 text-gray-300 hover:text-white focus:ring-gray-400" : "bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 focus:ring-gray-300"}`}
          >
            <Settings size={20} />
          </button>
        </div>

        <div className="text-center mb-8 pt-6">
          <div className="relative mx-auto w-28 h-28 mb-6">
            <div className={`w-full h-full rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-2xl transition-all duration-500 ${t.avatar}`}>
              {user.fullName ? user.fullName[0].toUpperCase() : "U"}
            </div>
            <div className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-full border-4 flex items-center justify-center transition-colors duration-500 ${t.online}`}>
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-2 transition-colors duration-500">{user.fullName}</h2>
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors duration-500 ${t.roleBadge}`}>
            <Shield size={16} className="mr-2" />
            {user.role}
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {fields.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={f.label}
                className={`flex items-center p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] ${t.fieldBg}`}
                style={{
                  animationDelay: `${idx * 100}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                }}
              >
                <div className={`p-2 rounded-lg mr-4 transition-colors duration-500 ${t.fieldIcon}`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1">
                  <div className={`text-sm font-medium transition-colors duration-500 ${t.fieldLabel}`}>
                    {f.label}
                  </div>
                  <div className={`font-semibold transition-colors duration-500 ${t.fieldValue}`}>
                    {f.value}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="space-y-3">
          <button
            onClick={() => console.log("Edit profile clicked")}
            className={`w-full flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${t.btnEdit}`}
          >
            <Edit3 size={18} className="mr-2" />
            Edit Profile
          </button>

          <button
            onClick={handleLogout}
            className={`w-full flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${t.btnLogout}`}
          >
            <LogOut size={18} className="mr-2" />
            Logout
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
