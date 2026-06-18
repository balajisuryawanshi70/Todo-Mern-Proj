import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  X,Calendar,
  Flag,
  FileText,
  Type, } from 'lucide-react';
import { createTask, updateTask } from '../store/slice/taskSlice';
import type { RootState, AppDispatch } from '../store';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: {
    _id: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    dueDate: string;
    status: 'pending' | 'completed';
  } | null;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, task }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isDark } = useSelector((state: RootState) => state.theme);

  // State for task fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState<'pending' | 'completed'>('pending');

  // Reset form fields when modal opens for creating a new task
  useEffect(() => {
    if (task) {
      // Populate form fields with task data for editing
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      const formatedDate = task.dueDate.split('T')[0] || '';
      setDueDate(formatedDate)
      setStatus(task.status);
    } else {
      // Reset form fields for creating a new task
      setTitle('');
      setDescription('');
      setPriority('low');
      setDueDate('');
      setStatus('pending');
    }
  }, [task, isOpen]); // Re-run whenever task or isOpen changes

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const selectedDueDate = new Date(dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today's date to ignore time

  if (!task && selectedDueDate < today) {
    alert('Cannot create a task with a past due date.');
    return;
  }

  const taskData = { title, description, priority, dueDate, status };

  if (task) {
    // Update existing task
    await dispatch(updateTask({ id: task._id, task: taskData }));
  } else {
    // Create new task
    await dispatch(createTask(taskData));
  }

  onClose(); // Close modal after submission
};


  if (!isOpen) return null;

return (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    
    {/* Backdrop */}
    <div
      className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    />

    {/* Modal */}
    <div
      className={`
        relative w-full max-w-2xl
        rounded-3xl
        shadow-2xl
        border
        overflow-hidden
        animate-in fade-in zoom-in duration-200
        ${
          isDark
            ? "bg-gray-900 border-gray-700"
            : "bg-white border-gray-200"
        }
      `}
    >
      {/* Header */}
      <div
        className={`
          px-6 py-5 border-b
          ${
            isDark
              ? "border-gray-700"
              : "border-gray-200"
          }
        `}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2
              className={`text-2xl font-bold ${
                isDark
                  ? "text-white"
                  : "text-gray-900"
              }`}
            >
              {task ? "Edit Task" : "Create New Task"}
            </h2>

            <p
              className={`text-sm mt-1 ${
                isDark
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >
              Manage your tasks efficiently
            </p>
          </div>

          <button
            onClick={onClose}
            className={`
              p-2 rounded-xl transition
              ${
                isDark
                  ? "hover:bg-gray-800"
                  : "hover:bg-gray-100"
              }
            `}
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="p-6 space-y-5"
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Task Title
          </label>

          <div className="relative">
            <Type
              size={18}
              className="absolute left-3 top-3.5 text-gray-400"
            />

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              required
              placeholder="Enter task title"
              className={`
                w-full pl-10 pr-4 py-3 rounded-xl border
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

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Description
          </label>

          <div className="relative">
            <FileText
              size={18}
              className="absolute left-3 top-3.5 text-gray-400"
            />

            <textarea
              rows={4}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              required
              placeholder="Describe the task..."
              className={`
                w-full pl-10 pr-4 py-3 rounded-xl border
                resize-none
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

        {/* Priority + Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Priority
            </label>

            <div className="relative">
              <Flag
                size={18}
                className="absolute left-3 top-3.5 text-gray-400"
              />

              <select
                value={priority}
                onChange={(e) =>
                  setPriority(
                    e.target.value as
                      | "low"
                      | "medium"
                      | "high"
                  )
                }
                className={`
                  w-full pl-10 pr-4 py-3 rounded-xl border
                  focus:ring-2 focus:ring-indigo-500
                  outline-none
                  ${
                    isDark
                      ? "bg-gray-800 border-gray-700 text-white"
                      : "bg-white border-gray-300"
                  }
                `}
              >
                <option value="low">
                  🟢 Low Priority
                </option>
                <option value="medium">
                  🟡 Medium Priority
                </option>
                <option value="high">
                  🔴 High Priority
                </option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Status
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value as
                    | "pending"
                    | "completed"
                )
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
            >
              <option value="pending">
                Pending
              </option>
              <option value="completed">
                Completed
              </option>
            </select>
          </div>
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Due Date
          </label>

          <div className="relative">
            <Calendar
              size={18}
              className="absolute left-3 top-3.5 text-gray-400"
            />

            <input
              type="date"
              value={dueDate}
              onChange={(e) =>
                setDueDate(e.target.value)
              }
              required
              className={`
                w-full pl-10 pr-4 py-3 rounded-xl border
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

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className={`
              px-5 py-3 rounded-xl font-medium transition
              ${
                isDark
                  ? "bg-gray-800 hover:bg-gray-700 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }
            `}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="
              px-6 py-3
              bg-indigo-600
              hover:bg-indigo-700
              text-white
              rounded-xl
              font-semibold
              shadow-lg
              transition
            "
          >
            {task
              ? "Update Task"
              : "Create Task"}
          </button>
        </div>
      </form>
    </div>
  </div>
);
};

export default TaskModal;
