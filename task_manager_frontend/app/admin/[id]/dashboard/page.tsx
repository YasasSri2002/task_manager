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

export default function AdminDashboardPage(){
    const params = useParams();
    const id = params.id as string;
    const[userData,setUserData] =useState<UserResponseDto>();
    const[role,setRole] = useState("ADMIN");
    const[tasksList,setTasksList] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            const cookieRole = Cookies.get('x-user-role');
            const data = await getUserById(id);
            setUserData(data);
            setRole(cookieRole!);
        };
        

        const fetchAllTasks = async ()=>{
            const data = await getAllTasks();
            setTasksList(data);
        }
        fetchUser();
        fetchAllTasks();
        
        
    }, [id]);

    if (!userData) return <LoadingScreen message="Fetching user data..." />;

    return (
        <main>
            <Navbar username={userData.username} role={role} />
            <TasksPage userId={id} tasks={tasksList}/> 
        </main>
    );
}