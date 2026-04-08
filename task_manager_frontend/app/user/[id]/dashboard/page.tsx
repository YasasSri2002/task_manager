'use client'
import { Navbar } from "@/app/navBar";
import LoadingScreen from "@/components/loadingScreen";


import { useParams } from "next/navigation";

import TasksPage from "@/app/task/TaskPage";

import Cookies from "js-cookie";

import { useGetTasksByUserId } from "@/hooks/useTasks";

import { useUserData } from "@/hooks/useUser";
import { useState } from "react";
import { SortField, SortOrder, TaskStatus,TaskPriority } from "@/types/task";





function UserDashboardPageContent() {
    
    
    const params = useParams();
    const id = params.id as string;

    

    //filters
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState<TaskStatus | ''>('');
    const [priorityFilter, setPriorityFilter] = useState<TaskPriority | ''>('');
    const [sortBy, setSortBy] = useState<SortField>('dueDate');
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
    
    const role = Cookies.get('x-user-role') ?? "";
    //api hooks
    const{data: tasksList} = useGetTasksByUserId(page,10,statusFilter,priorityFilter,sortBy,sortOrder);
    const {data:userData} = useUserData();
    

    

    if (!userData) return <LoadingScreen message="Fetching user data..." />;

    return (
        
    
        <main>
            <Navbar username={userData.username} role={role} />     
            <TasksPage tasks={{
                tasks: tasksList?.content || [],
                totalPages: tasksList?.totalPages || 1,   // ← add this
                page: page,
                onPageChange: setPage,                     // ← add this
                statusFilter,
                onStatusChange: setStatusFilter,
                priorityFilter,
                onPriorityChange: setPriorityFilter,
                sortBy,
                onSortChange: setSortBy,
                sortOrder,
                onSortOrderChange: setSortOrder
            }}/> 
        </main>
    );
}

export default function UserDashboardPage() {
  return (
    
      <UserDashboardPageContent />
  );
}