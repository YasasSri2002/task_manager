'use client'
import { useParams } from "next/navigation";
import LoadingScreen from "@/components/loadingScreen";
import { Navbar } from "@/app/navBar";
import TasksPage from "@/app/task/TaskPage";
import { useState, useEffect } from "react";
import { UserResponseDto } from "@/dto/user";
import Cookies from "js-cookie";
import { getUserById } from "@/services/user/getByid";

import AdminRegistrationModal from "../../register-admin/page";
import { AddAdminSection } from "./addAdminSection";
import { useGetAllTasks } from "@/hooks/useTasks";
import { SortField, SortOrder, TaskStatus,TaskPriority } from "@/types/task";
import { useUserData } from "@/hooks/useUser";

export default function AdminDashboardPage(){

    const params = useParams();
     const id = params.id as string;
    
    const[showRegisterForm,setShowRegisterForm] = useState(false);

    //filters
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState<TaskStatus | ''>('');
    const [priorityFilter, setPriorityFilter] = useState<TaskPriority | ''>('');
    const [sortBy, setSortBy] = useState<SortField>('dueDate');
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

    const role = Cookies.get('x-user-role') ?? "";
    //api
    const{data: tasksList, isLoading, error} = useGetAllTasks(page,10,statusFilter,priorityFilter,sortBy,sortOrder);
    const{data: userData}= useUserData(id);

    

    if (!userData || isLoading) return <LoadingScreen message="Fetching user data..." />;

    return (
        <div>
            <main>
                <Navbar username={userData.username} role={role} />
                {
                    role == "SUPER_ADMIN" && <AddAdminSection showForm={setShowRegisterForm}/>
                }
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
            {showRegisterForm && (
                    <AdminRegistrationModal
                        isOpen={showRegisterForm}
                        onClose={() => setShowRegisterForm(false)}
                    />
            )}
        </div>
    );
}