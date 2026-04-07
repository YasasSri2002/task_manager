'use client'
import { Navbar } from "@/app/navBar";
import LoadingScreen from "@/components/loadingScreen";

import { getUserById } from "@/services/user/getByid";
import { useParams } from "next/navigation";

import TasksPage from "@/app/task/TaskPage";
import { getTaskByUserId } from "@/services/task/getTaskByUserId";
import Cookies from "js-cookie";
import {  useQuery } from "@tanstack/react-query";





function UserDashboardPageContent() {
    
    
    const params = useParams();
    const id = params.id as string;
    
    const role = Cookies.get('x-user-role') ?? "USER";

    const {data:TaskResponseDtolist = []} =useQuery({queryKey: ['tasks',id],
            queryFn:   async() =>{
            const data = await getTaskByUserId(id);
            return data
        }
        })

    const {data:userData} = useQuery({
        queryKey: ['user', id],
        queryFn: async () => {  
            const data=  await getUserById(id);   
            return data 
        }
    })
    


    

    if (!userData) return <LoadingScreen message="Fetching user data..." />;

    return (
        
    
        <main>
            <Navbar username={userData.username} role={role} />     
            <TasksPage userId={id} tasks={TaskResponseDtolist}/>
        </main>
    );
}

export default function UserDashboardPage() {
  return (
    
      <UserDashboardPageContent />
  );
}