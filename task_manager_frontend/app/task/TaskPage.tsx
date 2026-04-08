'use client';

import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { TaskStatus, TaskPriority, SortField, SortOrder, TasksPageProps } from '@/types/task';
import { TaskResponseDto, TaskFormData, TaskRequestDto } from '@/dto/taskDto';
import TaskCard from './taskCard';
import DynamicIcon from '@/utill/DynamicIcon';
import PaginationControls from '@/utill/PaginationControls';
import Swal from 'sweetalert2';
import TaskForm from './taskForm';

import Cookies from 'js-cookie';

import { useDeleteTask, useMarkTaskAsInProgress, useMarkTaskCompleteById, useRegisterNewTask, useUpdateTask } from '@/hooks/useTasks';
import { Page } from '@/types/page';



export default function TasksPage({ tasks }: {tasks: TasksPageProps}) {

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const role = Cookies.get('x-user-role');

  const page = Number(searchParams.get('page') ?? '1');
  const perPage = Number(searchParams.get('per_page') ?? '10');

 
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<TaskResponseDto | undefined>();

  const isFirstRender = useRef(true);

  // Keep a ref to latest searchParams to avoid it being a reactive dependency
  const searchParamsRef = useRef(searchParams);
  useEffect(() => {
    searchParamsRef.current = searchParams;
  }, [searchParams]);

  
  

  //api hooks
  const{mutate: markTaskComplete} = useMarkTaskCompleteById();
  const {mutate: deleteTask} = useDeleteTask();
  const {mutate: markTaskInProgress} =useMarkTaskAsInProgress();
  const {mutate: updateTask} =useUpdateTask();
  const {mutate: saveTask} = useRegisterNewTask();

 

  // callback — reads searchParams via ref, not as a dependency
  const resetPage = useCallback(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const params = new URLSearchParams(searchParamsRef.current.toString());
    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`);
  }, [pathname, router]); // searchParams intentionally omitted — read via ref

 

 

  const paginatedTasks = tasks.tasks

  

  

  const handleDeleteTask = async (id: string) => {

    const confirm = await Swal.fire({
      title: 'Delete task?',
      icon: 'question',
      showCancelButton: true
    });

    if (!confirm.isConfirmed) return;

    deleteTask(id);
  };

  const handleMarkComplete = async (id: string) => {
    const confirm = await Swal.fire({
      title: 'Mark as Complete?',
      icon: 'question',
      showCancelButton: true
    });
    if(!confirm.isConfirmed) return;
    
    
    markTaskComplete(id);


  };

  const handleMarkInProgress = async (id: string) => {
    const confirm = await Swal.fire({
      title: 'Mark as In Progress?',
      icon: 'question',
      showCancelButton: true
    });
    if(!confirm.isConfirmed) return;
    markTaskInProgress(id);
  };

  const handleEditTask = (task: TaskResponseDto) => {
    setTaskToEdit(task);
    setShowTaskForm(true);
  };

  const handleFormSubmit = async (data: TaskFormData) => {

    try {

      if (taskToEdit) {
        Swal.fire({
            title: 'Saving...',
            text: 'Processing....',
            allowOutsideClick: false,
            background: '#fff',
            color: '#000000',
            didOpen: () => {
              Swal.showLoading();
          }
        });
        try{
          
          updateTask({taskId: taskToEdit.id , updatedData: data});
          Swal.close();
          

        }catch(err:unknown){
          if(err instanceof Error){
              Swal.fire({
              icon: 'error',
              title: `Save Failed`,
              text: err instanceof Error ? err.message : 'An unexpected error occurred.',
              background: '#fff',
              color: '#000000',
              confirmButtonColor: '#dc2626',
              customClass: {
                popup: 'border border-gray-700'
              }
            });
          }
        }

      } else {

         Swal.fire({
            title: 'Saving...',
            text: 'Processing....',
            allowOutsideClick: false,
            background: '#fff',
            color: '#000000',
            didOpen: () => {
              Swal.showLoading();
          }
        });

       try{

        const payload: TaskRequestDto = {
          ...data,
          dueDate: new Date(data.dueDate),
        };
        
        saveTask(payload);
       

        Swal.close();

       
      }catch(err: unknown){
        if(err instanceof Error){
          Swal.fire({
              icon: 'error',
              title: `Save Failed`,
              text: err instanceof Error ? err.message : 'An unexpected error occurred.',
              background: '#fff',
              color: '#000000',
              confirmButtonColor: '#dc2626',
              customClass: {
                popup: 'border border-gray-700'
              }
            });
        }
      }
       }

      setShowTaskForm(false);
      setTaskToEdit(undefined);

    } catch{
      Swal.fire('Error', `Operation failed`, 'error');
    }
  };

  const toggleSortOrder = () => {
  const newOrder = tasks.sortOrder === 'asc' ? 'desc' : 'asc';
    tasks.onSortOrderChange(newOrder); // pass the new value directly
  };

  const clearFilters = () => {
    tasks.onStatusChange('');
    tasks.onPriorityChange('');
  };

  return (

    <div className="min-h-screen bg-gray-50">

      <main className="max-w-7xl mx-auto px-4 py-8">

        
        <div className="bg-white rounded-lg shadow-xl p-4 mb-6">

          <div className="flex justify-between items-center mb-4">

            <div className="flex items-center gap-2">
              <DynamicIcon name="FaFilter" className="h-5 w-5" />
              Filters
            </div>

           
            <button
                onClick={() => {
                  setTaskToEdit(undefined);
                  setShowTaskForm(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-md flex gap-2 items-center"
              >
                <DynamicIcon name="FaPlus" />
                New Task
            </button>
            

          </div>

          {/* Filters */}
          <div className="grid md:grid-cols-4 gap-4">
            
              <select
              value={tasks.statusFilter}
              onChange={e => tasks.onStatusChange(e.target.value as TaskStatus | '')}
              className="shadow-md rounded p-2"
            >
              <option value="">All Status</option>
              <option value="TODO">Todo</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
            
            

            <select
              value={tasks.priorityFilter}
              onChange={e => tasks.onPriorityChange(e.target.value as TaskPriority | '')}
              className="shadow-md rounded p-2"
            >
              <option value="">All Priority</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>

            <select
              value={tasks.sortBy}
              onChange={e => tasks.onSortChange(e.target.value as SortField)}
              className="shadow-md rounded p-2"
            >
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority</option>
            </select>

            <button
              onClick={toggleSortOrder}
              className="shadow-md rounded p-2 flex items-center gap-2"
            >
              <DynamicIcon name='LuArrowUpDown' className='w-4 h-4 mr-4'></DynamicIcon>
              {tasks.sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            </button>

          </div>

          {(tasks.statusFilter || tasks.priorityFilter) && (
            <button
              onClick={clearFilters}
              className="text-blue-600 text-sm mt-3"
            >
              Clear filters
            </button>
          )}

        </div>

        {/* Task list */}
        {paginatedTasks.length === 0 ? (

          <div className="bg-white rounded-lg p-10 text-center">
            No tasks found
          </div>

        ) : (

          <>
            <div className="space-y-4 mb-6">
              {paginatedTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  onMarkComplete={handleMarkComplete}
                  onMarkInProgress={handleMarkInProgress}
                  role={role!}
                />
              ))}
            </div>

            <div className='flex justify-between items-center'>
              <div className="">
                <p className='text-sm md:text-lg text-gray-600'>
                  showing page {tasks.page} of total page {tasks.totalPages}
                </p>
              </div>
                <PaginationControls
                hasNextPage={tasks.page < tasks.totalPages}
                hasPrevPage={tasks.page > 1}
                endPage={tasks.totalPages}
                perPageNumber={String(perPage)}
                routerPath={pathname.replace(/^\//, '')}
              />
            </div>
          </>

        )}

      </main>

      {showTaskForm && (
        <TaskForm
          task={taskToEdit}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowTaskForm(false)}
        />
      )}

    </div>
  );
}