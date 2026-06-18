import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slice/authSlice';
import type { RootState, AppDispatch } from '../store';
import { AxiosError } from 'axios'; // Import AxiosError from Axios

// Define a type for the error response data
interface ErrorResponse {
  message: string;
  // Add other fields if necessary
}

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const dispatch = useDispatch<AppDispatch>(); // Correctly typed dispatch
  const navigate = useNavigate();
  const { loading, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Redirect if user is already logged in
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await dispatch(login({ email, password }));
      if (login.fulfilled.match(result)) {
        navigate('/');  // Navigate on successful login
      } else {
        // If login fails, set the error message
        setErrorMessage('Invalid credentials');
      }
    } catch (err) {
      // Type the error as AxiosError<ErrorResponse>
      const axiosError = err as AxiosError<ErrorResponse>;

      // Now TypeScript knows that axiosError.response.data.message exists
      if (axiosError.response?.data?.message === 'User already exists') {
        setErrorMessage('User already exists');
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
//             Sign in to your account
//           </h2>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           {errorMessage && (
//             <div className="text-red-500 text-center">{errorMessage}</div>
//           )}
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <input
//                 type="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="appearance-none rounded-none dark:text-white relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Email address"
//               />
//             </div>
//             <div>
//               <input
//                 type="password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="appearance-none rounded-none relative dark:text-white block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Password"
//               />
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               {loading ? 'Signing in...' : 'Sign in'}
//             </button>
//           </div>

//           <div className="text-center">
//             <Link
//               to="/register"
//               className="font-medium text-indigo-600 hover:text-indigo-500"
//             >
//               Don't have an account? Sign up
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

return (
  <div className="min-h-screen flex bg-gray-100 dark:bg-gray-950">
    {/* Left Side */}
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 text-white p-16 flex-col justify-center">
      <div className="max-w-lg">
        <h1 className="text-5xl font-bold mb-6">
          Welcome Back 👋
        </h1>

        <p className="text-xl text-indigo-100 mb-10">
          Access your dashboard, manage projects, track progress,
          and collaborate with your team seamlessly.
        </p>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              🚀
            </div>
            <div>
              <h3 className="font-semibold">Fast Performance</h3>
              <p className="text-indigo-100 text-sm">
                Optimized for speed and productivity.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              🔒
            </div>
            <div>
              <h3 className="font-semibold">Secure Access</h3>
              <p className="text-indigo-100 text-sm">
                Enterprise-grade security for your data.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              ⚡
            </div>
            <div>
              <h3 className="font-semibold">Easy Management</h3>
              <p className="text-indigo-100 text-sm">
                Manage everything from one place.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Right Side */}
    <div className="w-full lg:w-1/2 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-3xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Sign In
            </h2>
            <p className="text-gray-500 mt-2">
              Login to continue to your account
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {errorMessage && (
              <div className="bg-red-100 text-red-600 text-sm p-3 rounded-lg">
                {errorMessage}
              </div>
            )}

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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <input type="checkbox" />
                Remember me
              </label>

              <Link
                to="/forgot-password"
                className="text-indigo-600 text-sm hover:text-indigo-500"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
            >
              {loading ? "Signing In..." : "Sign In"}
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
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
);
}

export default Login;
