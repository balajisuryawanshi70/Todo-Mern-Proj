import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch, type RootState } from '../store'; // Correct import for useAppDispatch
import { register } from '../store/slice/authSlice';
import { AxiosError } from 'axios'; // Import AxiosError for correct error handling

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useAppDispatch(); // Use typed dispatch hook
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  // Define a type for the error response data
  interface ErrorResponse {
    message: string;
    // You can add more properties if the API returns additional data
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    try {
      const result = await dispatch(register({ name, email, password }));
      if (register.fulfilled.match(result)) {
        navigate('/');
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>; // Correct error typing
      setPasswordError(axiosError?.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-950">
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 text-white p-16 flex-col justify-center">
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold mb-6">
            Join Our Platform 🚀
          </h1>

          <p className="text-xl text-indigo-100 mb-10">
            Create your account and start managing projects,
            collaborating with teams, and boosting productivity.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                ⚡
              </div>
              <div>
                <h3 className="font-semibold">Quick Setup</h3>
                <p className="text-indigo-100 text-sm">
                  Get started in minutes with an easy registration process.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                🔒
              </div>
              <div>
                <h3 className="font-semibold">Secure & Reliable</h3>
                <p className="text-indigo-100 text-sm">
                  Your information is protected with modern security standards.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                🌍
              </div>
              <div>
                <h3 className="font-semibold">Work Anywhere</h3>
                <p className="text-indigo-100 text-sm">
                  Access your account from any device, anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-3xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Create Account
              </h2>
              <p className="text-gray-500 mt-2">
                Sign up to get started
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {(error || passwordError) && (
                <div className="bg-red-100 text-red-600 text-sm p-3 rounded-lg">
                  {passwordError || error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              {/* <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div> */}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white dark:bg-gray-900 px-3 text-gray-500">
                    OR
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="w-full border border-gray-300 dark:border-gray-700 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                Continue with Google
              </button>

              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
