'use client'
import { Navbar } from "@/app/navBar";
import LoadingScreen from "@/components/loadingScreen";


import { useParams } from "next/navigation";

import TasksPage from "@/app/task/TaskPage";

import Cookies from "js-cookie";

import { useGetTasksByUserId } from "@/hooks/useTasks";

import { useUserData } from "@/hooks/useUser";





function UserDashboardPageContent() {
    
    
    const params = useParams();
    const id = params.id as string;

    //api hooks
    const{data: TaskResponseDtolist} = useGetTasksByUserId();
    
    const role = Cookies.get('x-user-role') ?? "";

   

    const {data:userData} = useUserData();
    

    

    if (!userData) return <LoadingScreen message="Fetching user data..." />;

    return (
        
    
        <main>
            <Navbar username={userData.username} role={role} />     
            <TasksPage userId={id} tasks={TaskResponseDtolist ?? []}/>
        </main>
    );
}

export default function UserDashboardPage() {
  return (
    
      <UserDashboardPageContent />
  );
}