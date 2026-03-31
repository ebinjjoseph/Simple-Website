import { useNavigate } from 'react-router-dom';
import { logoutUser, getCurrentUser } from '../utils/storage';

export default function Navbar() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      <div className="text-xl font-bold text-gray-900 tracking-tight">
        MyApp
      </div>
      <div className="flex items-center space-x-6">
        <span className="text-gray-600 text-sm hidden sm:block">User: {user}</span>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          Sign out
        </button>
      </div>
    </nav>
  );
}
