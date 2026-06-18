import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import type { RootState } from "../store";

const Layout = () => {
  const { isDark } = useSelector(
    (state: RootState) => state.theme
  );

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        isDark
          ? "dark bg-gray-950"
          : "bg-gradient-to-br from-slate-50 via-white to-indigo-50"
      }`}
    >
      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;