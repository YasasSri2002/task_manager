import { getAllTasks } from "@/services/task/getAllTasks";
import { useQuery } from "@tanstack/react-query";

export const useTasks = ()=> {
    return useQuery({
        queryKey: ['taskList'] , 
        queryFn: getAllTasks 
    })
}