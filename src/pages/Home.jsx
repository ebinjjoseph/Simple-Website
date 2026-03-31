import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getCurrentUser } from '../utils/storage';

export default function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      navigate('/login');
    } else {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) return null;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-5xl px-4 py-12 mx-auto w-full">
        <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-8">
          <div className="mb-8 border-b border-gray-100 pb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Dashboard
            </h1>
            <p className="mt-2 text-gray-600">
              Welcome back. You are successfully authenticated via Local Storage.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="p-6 bg-gray-50 border border-gray-200 rounded-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure</h3>
              <p className="text-gray-600 text-sm">
                Validates fields and restricts access using conditional rendering.
              </p>
            </div>
            
            <div className="p-6 bg-gray-50 border border-gray-200 rounded-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast</h3>
              <p className="text-gray-600 text-sm">
                Instant client-side navigation with React Router without refreshing.
              </p>
            </div>
            
            <div className="p-6 bg-gray-50 border border-gray-200 rounded-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Clean</h3>
              <p className="text-gray-600 text-sm">
                Minimalist and highly readable standard standard design components.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
