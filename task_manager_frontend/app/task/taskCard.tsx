"use client";

import { TaskResponseDto } from "@/dto/taskDto";
import { TaskStatus,TaskPriority } from "@/types/task";
import DynamicIcon from "@/utill/DynamicIcon";

interface TaskItemProps {
  task: TaskResponseDto;
  onEdit: (task: TaskResponseDto) => void;
  onDelete: (id: string) => void;
  onMarkComplete: (id: string) => void;
  onMarkInProgress: (id: string) => void;
}

const statusColors: Record<TaskStatus, string> = {
  TODO: "bg-gray-100 text-gray-700",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-green-100 text-green-700",
};

const statusLabels: Record<TaskStatus, string> = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
};

const priorityColors: Record<TaskPriority, string> = {
  LOW: "bg-green-100 text-green-700",
  MEDIUM: "bg-yellow-100 text-yellow-700",
  HIGH: "bg-red-100 text-red-700",
};

export default function TaskCard({task, onEdit, onDelete, onMarkComplete, onMarkInProgress}: TaskItemProps) {


  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-3">
        
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base sm:text-lg flex-1 leading-snug">{task.title}</h3>
          <div className="flex flex-wrap gap-1.5 shrink-0">
            <span
              className={`px-2 py-1 rounded-full text-xs ${statusColors[task.status as TaskStatus]}`}
            >
              {statusLabels[task.status as TaskStatus]}
            </span>
            <span
              className={`px-2 py-1 rounded-full text-xs ${priorityColors[task.priority as TaskPriority]}`}
            >
              {task.priority}
            </span>
          </div>
        </div>

        
        <p className="text-gray-600 text-sm">{task.description}</p>

        {/* Bottom row: meta + actions */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pt-1">
          {/* Left: dates + author */}
          <div className="flex flex-col gap-1.5 text-sm text-gray-500">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1">
                <DynamicIcon name="FaCalendarAlt" className="h-4 w-4 shrink-0" />
                <span>Due: {new Date(task.dueDate).toDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <DynamicIcon name="FaCalendarAlt" className="h-4 w-4 shrink-0" />
                <span>Created: {new Date(task.createdAt).toDateString()}</span>
              </div>
            </div>
            {
              task.userResponseDto && (
                <div className="flex items-center gap-1 text-gray-400">
                  <DynamicIcon name="FaUser" className="h-3.5 w-3.5 shrink-0" />
                  <span className="text-xs">By: <span className="font-medium text-gray-500">{task.userResponseDto.email}</span></span>
                </div>
              )
            }
          </div>

          {/* Right: action buttons */}
          <div className="flex gap-1.5 shrink-0">
            {task.status !== "COMPLETED" && (
              <button
                onClick={() => onMarkComplete(task.id)}
                className="p-2 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                title="Mark as complete"
              >
                <DynamicIcon name="FaCheckDouble" className="h-5 w-5" />
              </button>
            )}
            {!["IN_PROGRESS", "COMPLETED"].includes(task.status) && (
              <button
                onClick={() => onMarkInProgress(task.id)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                title="Mark as in progress"
              >
                <DynamicIcon name="FaClockRotateLeft" className="h-5 w-5" />
              </button>
            )}
            {!["IN_PROGRESS", "COMPLETED"].includes(task.status) && (
              <button
                onClick={() => onEdit(task)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                title="Edit task"
              >
                <DynamicIcon name="FaEdit" className="h-5 w-5" />
              </button>
            )}
            <button
              onClick={() => onDelete(task.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
              title="Delete task"
            >
              <DynamicIcon name="FaTrash" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}