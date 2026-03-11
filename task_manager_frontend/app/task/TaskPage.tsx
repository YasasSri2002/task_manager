'use client';

import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { TaskStatus, TaskPriority, SortField, SortOrder } from '@/types/task';
import { TaskResponseDto, TaskFormData, TaskRequestDto } from '@/dto/taskDto';
import TaskCard from './taskCard';
import DynamicIcon from '@/utill/DynamicIcon';
import PaginationControls from '@/utill/PaginationControls';
import Swal from 'sweetalert2';
import TaskForm from './taskForm';

import { deleteTaskByid } from '@/services/task/deleteTaskByid';
import { updateTaskById } from '@/services/task/updateTaskByid';
import { newTask } from '@/services/task/newtask';
import { markTaskAsCompletedById } from '@/services/task/markTaskAsCompletedById';
import { markTaskAsInProgressById } from '@/services/task/markTaskAsInProgress';

interface TasksPageProps {
  tasks: TaskResponseDto[];
  userId?: string;
}

export default function TasksPage({ tasks, userId }: TasksPageProps) {

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const page = Number(searchParams.get('page') ?? '1');
  const perPage = Number(searchParams.get('per_page') ?? '10');

  const [taskList, setTaskList] = useState<TaskResponseDto[]>(tasks);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<TaskResponseDto | undefined>();

  const isFirstRender = useRef(true);

  // Keep a ref to latest searchParams to avoid it being a reactive dependency
  const searchParamsRef = useRef(searchParams);
  useEffect(() => {
    searchParamsRef.current = searchParams;
  }, [searchParams]);

  // Filters
  const [statusFilter, setStatusFilter] = useState<TaskStatus | ''>('');
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | ''>('');
  const [sortBy, setSortBy] = useState<SortField>('dueDate');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

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

  useEffect(() => {
    resetPage();
  }, [statusFilter, priorityFilter, sortBy, sortOrder, resetPage]);

  const filteredTasks = useMemo(() => {

    let result = [...taskList];

    if (statusFilter) {
      result = result.filter(t => t.status === statusFilter);
    }

    if (priorityFilter) {
      result = result.filter(t => t.priority === priorityFilter);
    }

    result.sort((a, b) => {

      if (sortBy === 'dueDate') {
        const dateA = new Date(a.dueDate).getTime();
        const dateB = new Date(b.dueDate).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      }

      if (sortBy === 'priority') {
        const weight = { LOW: 1, MEDIUM: 2, HIGH: 3 };
        return sortOrder === 'asc'
          ? weight[a.priority as keyof typeof weight] - weight[b.priority as keyof typeof weight]
          : weight[b.priority as keyof typeof weight] - weight[a.priority as keyof typeof weight];
      }

      return 0;
    });

    return result;

  }, [taskList, statusFilter, priorityFilter, sortBy, sortOrder]);

  const paginatedTasks = useMemo(() => {
    return filteredTasks.slice((page - 1) * perPage, page * perPage);
  }, [filteredTasks, page, perPage]);

  const total = filteredTasks.length;

  const handleDeleteTask = async (id: string) => {

    const confirm = await Swal.fire({
      title: 'Delete task?',
      icon: 'question',
      showCancelButton: true
    });

    if (!confirm.isConfirmed) return;

    await deleteTaskByid(id);

    setTaskList(prev => prev.filter(task => task.id !== id));

    Swal.fire('Deleted!', '', 'success');
  };

  const handleMarkComplete = async (id: string) => {
    const confirm = await Swal.fire({
      title: 'Complete?',
      icon: 'question',
      showCancelButton: true
    });
    if(!confirm.isConfirmed) return;
    await markTaskAsInProgressById(id);
    await markTaskAsCompletedById(id);
    setTaskList(prev =>
      prev.map(t => t.id === id ? { ...t, status: 'COMPLETED' } : t)
    );
    Swal.fire('Completed!', '', 'success');
  };

  const handleMarkInProgress = async (id: string) => {
    const confirm = await Swal.fire({
      title: 'In Progress?',
      icon: 'question',
      showCancelButton: true
    });
    if(!confirm.isConfirmed) return;
    await markTaskAsInProgressById(id);
    setTaskList(prev =>
      prev.map(t => t.id === id ? { ...t, status: 'IN_PROGRESS' } : t)
    );
    Swal.fire('Completed!', '', 'success');
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
          
          const updated = await updateTaskById(taskToEdit.id, data);
          Swal.close();
          setTaskList(prev =>
            prev.map(t => (t.id === taskToEdit.id ? updated : t))
          );
          await Swal.fire({
              icon: 'success',
              title: 'Successful!',
              background: '#fff',
              color: '#000000',
              timer: 3500,
              timerProgressBar: true,
              customClass: {
                popup: 'border border-gray-700'
              }
            });

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
          userId: userId!
        };
        
        const created = await newTask(payload);

        setTaskList(prev => [created, ...prev]);

        Swal.close();

        await Swal.fire({
              icon: 'success',
              title: 'Successful!',
              background: '#fff',
              color: '#000000',
              timer: 3500,
              timerProgressBar: true,
              customClass: {
                popup: 'border border-gray-700'
              }
            });
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

  const toggleSortOrder = () =>
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));

  const clearFilters = () => {
    setStatusFilter('');
    setPriorityFilter('');
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

            {userId && (
              <button
                onClick={() => {
                  setTaskToEdit(undefined);
                  setShowTaskForm(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-md flex gap-2"
              >
                <DynamicIcon name="FaPlus" />
                New Task
              </button>
            )}

          </div>

          {/* Filters */}
          <div className="grid md:grid-cols-4 gap-4">
            
              <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value as TaskStatus | '')}
              className="shadow-md rounded p-2"
            >
              <option value="">All Status</option>
              <option value="TODO">Todo</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
            
            

            <select
              value={priorityFilter}
              onChange={e => setPriorityFilter(e.target.value as TaskPriority | '')}
              className="shadow-md rounded p-2"
            >
              <option value="">All Priority</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>

            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as SortField)}
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
              {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            </button>

          </div>

          {(statusFilter || priorityFilter) && (
            <button
              onClick={clearFilters}
              className="text-blue-600 text-sm mt-3"
            >
              Clear filters
            </button>
          )}

        </div>

        {/* Task list */}
        {filteredTasks.length === 0 ? (

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
                />
              ))}
            </div>

            <PaginationControls
              hasNextPage={page * perPage < total}
              hasPrevPage={page > 1}
              endPage={total}
              perPageNumber={String(perPage)}
              routerPath={`user/${userId}/dashboard`}
            />
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