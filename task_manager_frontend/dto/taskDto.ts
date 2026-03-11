import { TaskPriority, TaskStatus } from "@/types/task";
import { UserResponseDto } from "./user";

export interface TaskResponseDto{
    
    id: string;

    title: string;

    description: string;

    status: string; //IN_PROGRESS,DONE,to do are the status

    priority: string; //HIGH,MEDIUM,LOW

    dueDate: Date;

    createdAt: Date;

    updatedAt: Date;

    userResponseDto? : UserResponseDto;
}

export interface TaskRequestDto{
    
    title: string;

    description: string;

    status: string; //IN_PROGRESS,COMPLETED,TODO are the status

    priority: string; //HIGH,MEDIUM,LOW

    dueDate: Date;

    userId: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  status: TaskStatus | string;
  priority: TaskPriority | string;
  dueDate: string;
}