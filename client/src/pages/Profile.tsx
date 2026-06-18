import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, type RootState } from '../store'; // Correct import for useAppDispatch
import { updateProfile } from '../store/slice/authSlice';
import { AxiosError } from 'axios'; // Import AxiosError to properly type the error

// Define a type for the error response data
interface ErrorResponse {
  message: string;
  // You can add more properties if the API returns additional data
}


const Profile = () => {
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const { isDark } = useSelector((state: RootState) => state.theme);
  const dispatch = useAppDispatch(); // Use the typed dispatch hook

  const [name, setName] = useState(user?.name || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setMessage('');

  if (newPassword && newPassword !== confirmPassword) {
    setMessage('New passwords do not match');
    return;
  }

  try {
    await dispatch(updateProfile({ name, currentPassword, newPassword })).unwrap(); // 👈 important
    setMessage('Profile updated successfully');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    setMessage(axiosError?.response?.data?.message || 'An error occurred');
  }
};


  return (
  <div className="max-w-5xl mx-auto px-4">
    <div
      className={`rounded-3xl overflow-hidden shadow-xl border ${
        isDark
          ? "bg-gray-900 border-gray-800"
          : "bg-white border-gray-200"
      }`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 px-8 py-10">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Avatar */}
          <div className="h-24 w-24 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white text-4xl font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white">
              {user?.name}
            </h1>

            <p className="text-indigo-100 mt-1">
              {user?.email}
            </p>

            <span className="inline-block mt-3 px-3 py-1 rounded-full bg-white/20 text-white text-sm">
              Account Settings
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {message && (
          <div
            className={`mb-6 p-4 rounded-xl ${
              message.includes("success")
                ? "bg-green-100 text-green-700 border border-green-200"
                : "bg-red-100 text-red-700 border border-red-200"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div>
            <h2
              className={`text-xl font-semibold mb-6 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Personal Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={`
                    w-full px-4 py-3 rounded-xl border
                    focus:ring-2 focus:ring-indigo-500
                    outline-none transition
                    ${
                      isDark
                        ? "bg-gray-800 border-gray-700 text-white"
                        : "bg-white border-gray-300"
                    }
                  `}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  value={user?.email}
                  disabled
                  className={`
                    w-full px-4 py-3 rounded-xl border cursor-not-allowed
                    ${
                      isDark
                        ? "bg-gray-800 border-gray-700 text-gray-400"
                        : "bg-gray-100 border-gray-300 text-gray-500"
                    }
                  `}
                />
              </div>
            </div>
          </div>

          {/* Password Section */}
          <div
            className={`pt-8 border-t ${
              isDark
                ? "border-gray-800"
                : "border-gray-200"
            }`}
          >
            <h2
              className={`text-xl font-semibold mb-6 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Change Password
            </h2>

            <div className="grid gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Current Password
                </label>

                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) =>
                    setCurrentPassword(e.target.value)
                  }
                  className={`
                    w-full px-4 py-3 rounded-xl border
                    focus:ring-2 focus:ring-indigo-500
                    outline-none
                    ${
                      isDark
                        ? "bg-gray-800 border-gray-700 text-white"
                        : "bg-white border-gray-300"
                    }
                  `}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    New Password
                  </label>

                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) =>
                      setNewPassword(e.target.value)
                    }
                    minLength={6}
                    className={`
                      w-full px-4 py-3 rounded-xl border
                      focus:ring-2 focus:ring-indigo-500
                      outline-none
                      ${
                        isDark
                          ? "bg-gray-800 border-gray-700 text-white"
                          : "bg-white border-gray-300"
                      }
                    `}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    minLength={6}
                    className={`
                      w-full px-4 py-3 rounded-xl border
                      focus:ring-2 focus:ring-indigo-500
                      outline-none
                      ${
                        isDark
                          ? "bg-gray-800 border-gray-700 text-white"
                          : "bg-white border-gray-300"
                      }
                    `}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="
                px-8 py-3
                rounded-xl
                bg-gradient-to-r
                from-indigo-600
                to-purple-600
                text-white
                font-semibold
                shadow-lg
                hover:scale-105
                transition-all
                disabled:opacity-50
              "
            >
              {loading
                ? "Saving Changes..."
                : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);};

export default Profile;
