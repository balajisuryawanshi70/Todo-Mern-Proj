// components/TaskCard.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pencil, Trash2, CheckCircle, Clock } from 'lucide-react';
import { updateTask, deleteTask } from '../store/slice/taskSlice';
import type { RootState, AppDispatch } from '../store';

interface TaskCardProps {
  task: {
    _id: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    status: 'pending' | 'completed';
    dueDate: string;
  };
  onEdit: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit }) => {
  const dispatch = useDispatch<AppDispatch>();  // Dispatch with AppDispatch
  const { isDark } = useSelector((state: RootState) => state.theme);

  const handleToggleStatus = () => {
    dispatch(
      updateTask({
        id: task._id,
        task: { status: task.status === 'completed' ? 'pending' : 'completed' },
      })
    );
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(task._id));
    }
  };


  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';
  

  return (
  <div
    className={`
      group
      relative
      overflow-hidden
      rounded-2xl
      border
      shadow-md
      hover:shadow-xl
      transition-all
      duration-300
      hover:-translate-y-1
      ${
        isDark
          ? "bg-gray-800 border-gray-700"
          : "bg-white border-gray-200"
      }
      ${task.status === "completed" ? "opacity-80" : ""}
    `}
  >
    {/* Left Accent Border */}
    <div
      className={`absolute left-0 top-0 h-full w-1 ${
        task.priority === "high"
          ? "bg-red-500"
          : task.priority === "medium"
          ? "bg-yellow-500"
          : "bg-green-500"
      }`}
    />

    <div className="p-5">
      <div className="flex justify-between items-start">
        {/* Task Info */}
        <div className="flex gap-4 flex-1">
          {/* Status Toggle */}
          <button
            onClick={handleToggleStatus}
            className="mt-1"
          >
            <CheckCircle
              size={24}
              className={`transition ${
                task.status === "completed"
                  ? "text-green-500"
                  : "text-gray-400 hover:text-green-500"
              }`}
            />
          </button>

          <div className="flex-1">
            {/* Title */}
            <h3
              className={`font-semibold text-lg ${
                task.status === "completed"
                  ? "line-through text-gray-500"
                  : isDark
                  ? "text-white"
                  : "text-gray-900"
              }`}
            >
              {task.title}
            </h3>

            {/* Description */}
            <p
              className={`mt-2 text-sm leading-relaxed ${
                isDark
                  ? "text-gray-400"
                  : "text-gray-600"
              }`}
            >
              {task.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {/* Priority */}
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  task.priority === "high"
                    ? "bg-red-100 text-red-600"
                    : task.priority === "medium"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {task.priority.toUpperCase()}
              </span>

              {/* Status */}
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  task.status === "completed"
                    ? "bg-green-100 text-green-600"
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                {task.status.toUpperCase()}
              </span>

              {/* Due Date */}
              <span
                className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  isOverdue
                    ? "bg-red-100 text-red-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                <Clock size={12} className="mr-1" />
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            </div>

            {/* Overdue Warning */}
            {isOverdue && (
              <div className="mt-3 text-sm text-red-500 font-medium">
                ⚠️ This task is overdue
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 ml-4">
          <button
            onClick={onEdit}
            className={`
              p-2 rounded-xl
              transition
              ${
                isDark
                  ? "hover:bg-gray-700"
                  : "hover:bg-indigo-50"
              }
            `}
          >
            <Pencil
              size={18}
              className="text-indigo-500"
            />
          </button>

          <button
            onClick={handleDelete}
            className={`
              p-2 rounded-xl
              transition
              ${
                isDark
                  ? "hover:bg-gray-700"
                  : "hover:bg-red-50"
              }
            `}
          >
            <Trash2
              size={18}
              className="text-red-500"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
);
};

export default TaskCard;
