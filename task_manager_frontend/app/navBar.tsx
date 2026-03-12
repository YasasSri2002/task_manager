'use client'
import { logout } from "@/services/auth/logout/logoutService"
import DynamicIcon from "@/utill/DynamicIcon"
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";


export function Navbar({username,role}:{username: string, role: string}){
    const router = useRouter();

    async function handleLogOut(){
        
        try{
            await logout();
           
            await Swal.fire({
                icon: 'success',
                title: 'Logged Out!',
                text: "Successfully logged out",
                background: '#fff',
                color: '#000000',
                timer: 3500,
                timerProgressBar: true,
                customClass: {
                    popup: 'border border-gray-700'
                    }
                });
                router.push('/login');

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

    return(
        <div>
            <div className="flex justify-between items-center px-2 h-20 shadow-xl bg-white">
                <header className="grid">
                    <h1 className="text-md md:text-lg lg:text-xl">Task management</h1>
                    <h1 className="text-sm md:text-md lg:text-lg text-gray-600">Welcome, {username} ({role})</h1>
                </header>
                <button className=" flex gap-1 items-center text-md md:text-lg lg:text-2xl rounded-md active:scale-95
                 active:bg-gray-100 " 
                    onClick={handleLogOut}>
                    <DynamicIcon name="CiLogout" className="text-lg md:text-xl lg:text-3xl"/>
                    logout
                </button>
            </div>
        </div>
    )
}