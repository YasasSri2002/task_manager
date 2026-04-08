import { TaskResponseDto } from "@/dto/taskDto";

export type TaskStatus = "TODO" | "IN_PROGRESS" | "COMPLETED";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export type SortField = 'dueDate' | 'priority';

export type SortOrder = 'asc' | 'desc';

export type TasksPageProps = {

  tasks: TaskResponseDto[];
  totalPages: number;

  page: number;
  onPageChange: (page: number) => void;

  statusFilter: TaskStatus | '';
  onStatusChange: (StatusValue: TaskStatus | '') => void;

  priorityFilter: TaskPriority | '';
  onPriorityChange: (priorityValue: TaskPriority | '') => void;

  sortBy: SortField;
  onSortChange: (SortByValue: SortField) => void;

  sortOrder: SortOrder;
  onSortOrderChange: (orderValue: SortOrder) => void;
};