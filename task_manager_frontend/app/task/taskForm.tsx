'use client';
import { useState } from 'react';
import { TaskResponseDto,TaskFormData } from '@/dto/taskDto';
import { TaskStatus, TaskPriority } from '@/types/task';
import DynamicIcon from '@/utill/DynamicIcon';
import { TaskRegisterFormErrors, taskRegistrationFormValidation } from '@/lib/schema/taskRegistraionFromValidationSchema';


interface TaskFormProps {
  task?: TaskResponseDto;
  onSubmit: (data: TaskFormData) => Promise<void>;
  onCancel: () => void;
}

export default function TaskForm({ task, onSubmit, onCancel }: TaskFormProps) {
  const [formData, setFormData] = useState<TaskFormData & { dueDateStr: string }>({
    title: task?.title || '',
    description: task?.description || '',
    status: (task?.status as TaskStatus) || 'TODO',
    priority: (task?.priority as TaskPriority) || 'MEDIUM',
    dueDate: task?.dueDate || new Date(),
    dueDateStr: task?.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [inputValidationErrors, setInputValidationErrors] = useState<TaskRegisterFormErrors>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
  
    const result = taskRegistrationFormValidation.safeParse(formData);

    if (!result.success) {
      setInputValidationErrors(result.error.flatten().fieldErrors);
      return; // Stop here, don't call the API
    }

    setInputValidationErrors({})

    const taskData: TaskFormData = {
      title: result.data.title,
      description: formData.description,
      dueDate: new Date(formData.dueDateStr),
      priority: result.data.priority,
      status: result.data.status,
    };

    try {
      setLoading(true);
      await onSubmit(taskData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save task');
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onCancel}
    >
      {/* Modal box */}
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            {task ? 'Edit Task' : 'New Task'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <DynamicIcon name="IoCloseOutline" className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1 text-gray-700">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Enter task title"
            />
            {inputValidationErrors.title && 
                  <p className="text-red-500 text-sm pl-1">{inputValidationErrors.title[0]}</p>}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1 text-gray-700">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 
              focus:ring-blue-500 text-sm min-h-25 resize-none"
              placeholder="Enter task description"
            />
          
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="status" className="block text-sm font-medium mb-1 text-gray-700">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as TaskStatus })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 
                focus:ring-blue-500 text-sm"
              >
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>

            <div>
              <label htmlFor="priority" className="block text-sm font-medium mb-1 text-gray-700">
                Priority <span className="text-red-500">*</span>
              </label>
              <select
                id="priority"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as TaskPriority })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 
                focus:ring-blue-500 text-sm"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium mb-1 text-gray-700">
              Due Date <span className="text-red-500">*</span>
            </label>
            <input
              id="dueDate"
              type="date"
              required
              value={formData.dueDateStr}
              onChange={(e) => setFormData({ ...formData, dueDateStr: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 
              focus:ring-blue-500 text-sm"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors
               disabled:bg-blue-400 disabled:cursor-not-allowed text-sm font-medium"
            >
              {loading ? 'Saving...' : task ? 'Update Task' : 'Create Task'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}