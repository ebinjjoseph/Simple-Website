import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { saveUser } from '../utils/storage';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [apiError, setApiError] = useState('');
  
  const navigate = useNavigate();

  const validateEmail = (val) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    setEmailError(isValid ? '' : 'Please enter a valid email address.');
    return isValid;
  };

  const validatePassword = (val) => {
    const isValid = val.length >= 6;
    setPasswordError(isValid ? '' : 'Password must be at least 6 characters.');
    return isValid;
  };

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    if (val) validateEmail(val);
    else setEmailError('');
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    if (val) validatePassword(val);
    else setPasswordError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setApiError('');

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      const success = saveUser(email, password);
      if (success) {
        navigate('/login');
      } else {
        setApiError('User with this email already exists.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-900">Create an account</h2>
        
        {apiError && (
          <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-md">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className={`w-full px-3 py-2 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              placeholder="you@example.com"
              required
            />
            {emailError && <p className="mt-1 text-sm text-red-600">{emailError}</p>}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className={`w-full px-3 py-2 border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              placeholder="••••••••"
              required
            />
            {passwordError && <p className="mt-1 text-sm text-red-600">{passwordError}</p>}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 mt-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
