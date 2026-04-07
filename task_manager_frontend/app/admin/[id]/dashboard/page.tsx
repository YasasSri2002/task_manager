'use client'
import { useParams } from "next/navigation";
import LoadingScreen from "@/components/loadingScreen";
import { Navbar } from "@/app/navBar";
import TasksPage from "@/app/task/TaskPage";
import { useState, useEffect } from "react";
import { UserResponseDto } from "@/dto/user";
import Cookies from "js-cookie";
import { getUserById } from "@/services/user/getByid";
import { getAllTasks } from "@/services/task/getAllTasks";
import AdminRegistrationModal from "../../register-admin/page";
import { AddAdminSection } from "./addAdminSection";
import { useGetAllTasks } from "@/hooks/useTasks";

export default function AdminDashboardPage(){
    const params = useParams();
    const id = params.id as string;
    const[userData,setUserData] =useState<UserResponseDto>();
    const[role,setRole] = useState("ADMIN");
    const[showRegisterForm,setShowRegisterForm] = useState(false);
    const{data: tasksList=[], isLoading, error} = useGetAllTasks();

    useEffect(() => {
        const fetchUser = async () => {
            const cookieRole = Cookies.get('x-user-role');
            const data = await getUserById(id);
            setUserData(data);
            setRole(cookieRole!);
        };
        
        fetchUser();      
        
    }, [id]);

    if (!userData || isLoading) return <LoadingScreen message="Fetching user data..." />;

    return (
        <div>
            <main>
                <Navbar username={userData.username} role={role} />
                {
                    role == "SUPER_ADMIN" && <AddAdminSection showForm={setShowRegisterForm}/>
                }
                <TasksPage userId={id} tasks={tasksList}/> 
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