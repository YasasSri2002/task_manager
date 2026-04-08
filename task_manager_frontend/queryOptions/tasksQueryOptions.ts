import { TaskResponseDto } from "@/dto/taskDto";
import { getAllTasks } from "@/services/task/getAllTasks";
import { getTaskByUserId } from "@/services/task/getTaskByUserId";
import { Page } from "@/types/page";
import { UseQueryOptions } from "@tanstack/react-query";

export function getAllTasksQueryOption(
    page:number, size:number, status:string, priority:string, sortBy:string, orderBy:string
    
): UseQueryOptions<Page<TaskResponseDto>,Error>{
    return {
        queryKey: ['taskList',page,size,status,priority,sortBy,orderBy] , 
        queryFn: ()=>getAllTasks(page,size,status,priority,sortBy,orderBy),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10 ,
        refetchOnWindowFocus: false
    }
}

export function getTasksByUserIdQueryOption(page:number,size:number,status:string,priority: string,sortBy:string,orderBy:string)
: UseQueryOptions<Page<TaskResponseDto>,Error>{
    return {
        queryKey: ['tasksOfAUser',page,size,status,priority,sortBy,orderBy],
        queryFn: ()=> getTaskByUserId(page,size,status,priority,sortBy,orderBy),
        staleTime: 1000 *60 *5,
        gcTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
    }
}