import { TaskResponseDto } from "@/dto/taskDto";
import { getAllTasks } from "@/services/task/getAllTasks";
import { getTaskByUserId } from "@/services/task/getTaskByUserId";
import { UseQueryOptions } from "@tanstack/react-query";

export function getAllTasksQueryOption(): UseQueryOptions<TaskResponseDto[],Error>{
    return {
        queryKey: ['taskList'] , 
        queryFn: getAllTasks,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10 ,
    }
}

export function getTasksByUserIdQueryOption(): UseQueryOptions<TaskResponseDto[],Error>{
    return {
        queryKey: ['tasksOfAUser'],
        queryFn: getTaskByUserId,
        staleTime: 1000 *60 *5,
        gcTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
    }
}