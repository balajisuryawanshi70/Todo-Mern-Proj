// src/pages/Dashboard.tsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PlusCircle,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  Sparkles } from 'lucide-react';
import { fetchTasks } from '../store/slice/taskSlice';
import type { RootState, AppDispatch } from '../store';
import TaskModal from '../components/TaskModal';
import TaskCard from '../components/TaskCard';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'completed'>('all');
  const dispatch = useDispatch<AppDispatch>();

  const { tasks = [], loading } = useSelector((state: RootState) => state.tasks);
  const { isDark } = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const openCreateModal = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task: any) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const today = new Date().toDateString();

  const filteredTasks = tasks.filter(task => {
    if (filterStatus === 'all') return true;
    return task.status === filterStatus;
  });

const dueTodayCount = tasks.filter(
  task => task.status !== 'completed' && new Date(task.dueDate).toDateString() === today
).length;

const highPriorityCount = tasks.filter(
  task => task.status !== 'completed' && task.priority === 'high'
).length;

  const pendingCount = tasks.filter(task => task.status === 'pending').length;
  const completedCount = tasks.filter(task => task.status === 'completed').length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // return (
  //   <div className="max-w-6xl mx-auto">
  //     <div className="flex justify-between items-center mb-8">
  //       <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>My Tasks</h1>
  //       <button
  //         onClick={openCreateModal}
  //         className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
  //       >
  //         <PlusCircle size={20} className="mr-2" />
  //         Add Task
  //       </button>
  //     </div>

  //     {/* Summary Cards */}
  //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
  //       <SummaryCard icon={<Calendar size={20} className="text-yellow-500" />} title="Due Today" count={dueTodayCount} isDark={isDark} />
  //       <SummaryCard icon={<AlertCircle size={20} className="text-red-500" />} title="High Priority" count={highPriorityCount} isDark={isDark} />
  //       <SummaryCard icon={<Clock size={20} className="text-blue-500" />} title="Pending" count={pendingCount} isDark={isDark} />
  //       <SummaryCard icon={<CheckCircle size={20} className="text-green-500" />} title="Completed" count={completedCount} isDark={isDark} />
  //     </div>

  //     {/* Filter */}
  //     <div className="flex space-x-2 mb-6">
  //       {['all', 'pending', 'completed'].map(status => (
  //         <button
  //           key={status}
  //           onClick={() => setFilterStatus(status as 'all' | 'pending' | 'completed')}
  //           className={`px-4 py-2 rounded ${
  //             filterStatus === status
  //               ? 'bg-indigo-600 text-white'
  //               : 'bg-gray-200 text-gray-800'
  //           }`}
  //         >
  //           {status.charAt(0).toUpperCase() + status.slice(1)}
  //         </button>
  //       ))}
  //     </div>

  //     {/* Tasks */}
  //     <div className="space-y-4">
  //       {filteredTasks.map((task) => (
  //         <TaskCard key={task._id} task={task} onEdit={() => openEditModal(task)} />
  //       ))}
  //     </div>

  //     <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} task={selectedTask} />
  //   </div>
  // );
return (
  <div className="max-w-7xl mx-auto px-4 py-6">
    {/* Header Banner */}
    <div className="mb-8">
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-3xl p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <p className="text-indigo-100 mb-2">
              Welcome back 👋
            </p>

            <h1 className="text-4xl font-bold text-white mb-2">
              Task Dashboard
            </h1>

            <p className="text-indigo-100">
              Manage your work, stay organized and boost productivity.
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="mt-5 md:mt-0 flex items-center px-6 py-3 bg-white text-indigo-700 font-semibold rounded-xl shadow-lg hover:scale-105 transition"
          >
            <PlusCircle size={20} className="mr-2" />
            Create Task
          </button>
        </div>
      </div>
    </div>

    {/* Statistics Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      <div className={`rounded-2xl p-6 shadow-lg ${
        isDark ? "bg-gray-800" : "bg-white"
      }`}>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">
              Due Today
            </p>
            <h2 className="text-3xl font-bold mt-2">
              {dueTodayCount}
            </h2>
          </div>

          <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center">
            <Calendar className="text-yellow-600" size={24} />
          </div>
        </div>
      </div>

      <div className={`rounded-2xl p-6 shadow-lg ${
        isDark ? "bg-gray-800" : "bg-white"
      }`}>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">
              High Priority
            </p>
            <h2 className="text-3xl font-bold mt-2">
              {highPriorityCount}
            </h2>
          </div>

          <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center">
            <AlertCircle className="text-red-600" size={24} />
          </div>
        </div>
      </div>

      <div className={`rounded-2xl p-6 shadow-lg ${
        isDark ? "bg-gray-800" : "bg-white"
      }`}>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">
              Pending
            </p>
            <h2 className="text-3xl font-bold mt-2">
              {pendingCount}
            </h2>
          </div>

          <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
            <Clock className="text-blue-600" size={24} />
          </div>
        </div>
      </div>

      <div className={`rounded-2xl p-6 shadow-lg ${
        isDark ? "bg-gray-800" : "bg-white"
      }`}>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">
              Completed
            </p>
            <h2 className="text-3xl font-bold mt-2">
              {completedCount}
            </h2>
          </div>

          <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
            <CheckCircle className="text-green-600" size={24} />
          </div>
        </div>
      </div>
    </div>

    {/* Filter Section */}
    <div className="flex flex-wrap gap-3 mb-8">
      {["all", "pending", "completed"].map((status) => (
        <button
          key={status}
          onClick={() =>
            setFilterStatus(
              status as "all" | "pending" | "completed"
            )
          }
          className={`px-5 py-2 rounded-full font-medium transition-all ${
            filterStatus === status
              ? "bg-indigo-600 text-white shadow-lg"
              : isDark
              ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
              : "bg-white text-gray-700 shadow hover:bg-gray-100"
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </button>
      ))}
    </div>

    {/* Tasks Section */}
    <div className="space-y-5">
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={() => openEditModal(task)}
          />
        ))
      ) : (
        <div
          className={`rounded-3xl p-12 text-center shadow-lg ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
        >
          <CheckCircle
            size={60}
            className="mx-auto text-green-500 mb-4"
          />

          <h3 className="text-2xl font-bold mb-2">
            No Tasks Found
          </h3>

          <p className="text-gray-500 mb-6">
            Create your first task and start managing your work.
          </p>

          <button
            onClick={openCreateModal}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
          >
            Create Task
          </button>
        </div>
      )}
    </div>

    <TaskModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      task={selectedTask}
    />
  </div>
);
};


// const SummaryCard = ({ icon, title, count, isDark }: any) => (
//   <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
//     <div className="flex items-center mb-2 space-x-2">
//       {icon}
//       <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
//         {title} ({count})
//       </h2>
//     </div>
//   </div>
// );
interface SummaryCardProps {
  icon: React.ReactNode;
  title: string;
  count: number;
  isDark: boolean;
  color: "yellow" | "red" | "blue" | "green";
}

const SummaryCard = ({
  icon,
  title,
  count,
  isDark,
  color,
}: SummaryCardProps) => {
  const colorClasses = {
    yellow: "bg-yellow-100 text-yellow-600",
    red: "bg-red-100 text-red-600",
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
  };

  return (
    <div
      className={`
        relative overflow-hidden
        rounded-2xl p-6
        shadow-md hover:shadow-xl
        transition-all duration-300
        hover:-translate-y-1
        border
        ${
          isDark
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-100"
        }
      `}
    >
      <div className="flex justify-between items-center">
        <div>
          <p
            className={`text-sm font-medium ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {title}
          </p>

          <h2
            className={`mt-2 text-3xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {count}
          </h2>
        </div>

        <div
          className={`
            w-14 h-14
            rounded-xl
            flex items-center justify-center
            ${colorClasses[color]}
          `}
        >
          {icon}
        </div>
      </div>

      {/* Decorative Gradient */}
      <div
        className="
          absolute
          -right-8
          -bottom-8
          w-24
          h-24
          rounded-full
          bg-indigo-500/10
        "
      />
    </div>
  );
};

export default Dashboard;
