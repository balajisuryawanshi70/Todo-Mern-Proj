import { Link, useNavigate } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { Sun, Moon, LogOut} from 'lucide-react';
import { toggleTheme } from '../store/slice/themeSlice';
import { logout } from '../store/slice/authSlice';  // Import logout action
import type { RootState } from '../store';
import type { AppDispatch } from '../store'; // Import AppDispatch type

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch to type dispatch
  const navigate = useNavigate();
  const { isDark } = useSelector((state: RootState) => state.theme);
  const { user } = useSelector((state: RootState) => state.auth);

  // Handle logout functionality
  const handleLogout = () => {
    dispatch(logout()) // Dispatch logout action
      .unwrap() // Unwrap the promise to handle result or error
      .then(() => {
        navigate('/login'); // Redirect to login page after successful logout
      })
      .catch((error) => {
        console.error('Logout failed: ', error);
      });
  };

  return (
  <header
    className={`sticky top-0 z-50 backdrop-blur-xl border-b ${
      isDark
        ? "bg-gray-900/80 border-gray-800"
        : "bg-white/80 border-gray-200"
    }`}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
            T
          </div>

          <div>
            <h1
              className={`font-bold text-lg ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Task Manager
            </h1>

            <p className="text-xs text-gray-500">
              Productivity Workspace
            </p>
          </div>
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          
          {/* Theme Toggle */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className={`h-11 w-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
              isDark
                ? "bg-gray-800 hover:bg-gray-700 text-yellow-400"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            {isDark ? (
              <Sun size={20} />
            ) : (
              <Moon size={20} />
            )}
          </button>

          {user && (
            <>
              {/* User Profile */}
              <Link
                to="/profile"
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition ${
                  isDark
                    ? "hover:bg-gray-800"
                    : "hover:bg-gray-100"
                }`}
              >
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>

                <div className="hidden md:block">
                  <p
                    className={`text-sm font-medium ${
                      isDark
                        ? "text-white"
                        : "text-gray-900"
                    }`}
                  >
                    {user?.name}
                  </p>

                  <p className="text-xs text-gray-500">
                    My Account
                  </p>
                </div>
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition shadow-md"
              >
                <LogOut size={18} />
                <span className="hidden sm:block">
                  Logout
                </span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  </header>
);
};

export default Navbar;
