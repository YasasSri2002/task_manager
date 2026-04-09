import { TaskFormData, TaskRequestDto } from "@/dto/taskDto";
import { getAllTasksQueryOption, getTasksByUserIdQueryOption } from "@/queryOptions/tasksQueryOptions";
import { deleteTaskByid } from "@/services/task/deleteTaskByid";
import { getAllTasks } from "@/services/task/getAllTasks";
import { getTaskByUserId } from "@/services/task/getTaskByUserId";
import { markTaskAsCompletedById } from "@/services/task/markTaskAsCompletedById";
import { markTaskAsInProgressById } from "@/services/task/markTaskAsInProgress";
import { registerNewTask } from "@/services/task/registerANewTask";
import { updateTaskById } from "@/services/task/updateTaskByid";
import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";



export const useGetAllTasks = (
    page: number,
    size: number,
    status: string,
    priority:string,
    sortBy:string,
    orderBy: string
)=> {
    return useQuery(
        getAllTasksQueryOption(
            page,
            size,
            status,
            priority,
            sortBy,
            orderBy
        )
    );
}

export const useGetTasksByUserId= (
    page: number,
    size: number,
    status: string,
    priority:string,
    sortBy:string,
    orderBy: string
)=>{
    return useQuery(getTasksByUserIdQueryOption(page,size,status,priority,sortBy,orderBy))
}

export const useMarkTaskCompleteById = ()=>{

   const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (taskId: string) =>{
            await markTaskAsCompletedById(taskId);
        },onSuccess: () => {
            Swal.fire({
                title: "Complerted",
                text: "mark task as completed",
                icon: "success"
                
            })

            queryClient.invalidateQueries({queryKey: ['tasksOfAUser']})

        },onError(error, variables, onMutateResult, context) {
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Something went wrong"
            })
        },
    })
}

export const useDeleteTask =() => {

    const queryClient = useQueryClient();

    return  useMutation({
        mutationFn: async (taskId: string)=>{
            await deleteTaskByid(taskId);
        },onSuccess:()=>{
            Swal.fire('Deleted!', '', 'success');
            queryClient.invalidateQueries({queryKey: ['tasksOfAUser']})
        }
  })
}

export const useMarkTaskAsInProgress=()=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (taskId:string)=>{
            await markTaskAsInProgressById(taskId);
        },onSuccess:() =>{
            Swal.fire({
                icon: "success",
                title: "In Progress",
                text: `task is marked as in progress`
            })
        },onError(error){
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: `${error.message}`
            })
        }
    })
}

export const useUpdateTask =() =>{
    return useMutation({
        mutationFn: async ({taskId,updatedData}:{taskId: string ,updatedData: TaskFormData })=> {
            await updateTaskById(taskId,updatedData);
        },onSuccess: ()=>{
             Swal.fire({
                icon: "success",
                title: "Successfully",
                text: `task update is successfully`
            })
        },onError(error){
            if(error instanceof Error){
                Swal.fire({
                    icon: 'error',
                    title: `Save Failed`,
                    text: error instanceof Error ? error.message : 'An unexpected error occurred.',
                    background: '#fff',
                    color: '#000000',
                    confirmButtonColor: '#dc2626',
                    customClass: {
                        popup: 'border border-gray-700'
                        }
                    });
            }
        }
    })
}

export const useRegisterNewTask = () =>{

    const queryClient =useQueryClient();

    return useMutation({
        mutationFn: async(task: TaskRequestDto)=> {
            await registerNewTask(task);
        },onSuccess: async () =>{
             Swal.fire({
                icon: "success",
                title: "Successfully",
                text: `Task registered is successfully`
            })
           await Promise.all([ 
            queryClient.invalidateQueries({queryKey: ['tasksOfAUser']}),
            queryClient.invalidateQueries({queryKey: ['taskList']})
         ])
        },onError(error){
            if(error instanceof Error){
                Swal.fire({
                    icon: 'error',
                    title: `Save Failed`,
                    text: error instanceof Error ? error.message : 'An unexpected error occurred.',
                    background: '#fff',
                    color: '#000000',
                    confirmButtonColor: '#dc2626',
                    customClass: {
                        popup: 'border border-gray-700'
                        }
                    });
            }
        }

    })
}

