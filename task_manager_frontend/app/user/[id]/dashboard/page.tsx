'use client'
import { Navbar } from "@/app/navBar";
import LoadingScreen from "@/components/loadingScreen";
import { UserResponseDto } from "@/dto/user";
import { getUserById } from "@/services/user/getByid";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { TaskResponseDto } from "@/dto/taskDto";
import TasksPage from "@/app/task/TaskPage";
import { getTaskByUserId } from "@/services/task/getTaskByUserId";
import Cookies from "js-cookie";

export default function UserDashboardPage() {
    const [userData, setUserData] = useState<UserResponseDto>();
    const[taskList, setTaskList] =useState<TaskResponseDto[]>([]);
    const[role,setRole] = useState("USER");
    const params = useParams();
    const id = params.id as string;

    useEffect(() => {
        const fetchUser = async () => {
            const cookieRole = Cookies.get('x-user-role');
            const data = await getUserById(id);
            setUserData(data);
            setRole(cookieRole!);
        };
        const fetchTaskList = async () =>{
            const data = await getTaskByUserId(id);
            setTaskList(data);
        }
        fetchUser();
        fetchTaskList();
        
    }, [id]);

    if (!userData) return <LoadingScreen message="Fetching user data..." />;

    return (
        <main>
            <Navbar username={userData.username} role={role} />
            <TasksPage userId={id} tasks={taskList}/>
        </main>
    );
}