'use client'
import { UserRequestDto } from "@/dto/user";
import { UserRegistrationForm } from "./userRegistrationForm";
import DynamicIcon from "@/utill/DynamicIcon";
import { registerNewUser } from "@/services/user/registerNewUser";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function UserRegistrationPage(){

    const router = useRouter();

    async function handleUserRegister(data: UserRequestDto){
         Swal.fire({
            title: 'Registering...',
            text: 'Please wait while we process your registration',
            allowOutsideClick: false,
            background: '#fff',
            color: '#000000',
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try{
            const response = await registerNewUser(data)

            Swal.close();
            
            // Show success (adjust this based on your API response)
            await Swal.fire({
            icon: 'success',
            title: 'Registration Successful!',
            text: 'Welcome to Task Forge. Redirecting to login...',
            background: '#fff',
            color: '#000000',
            confirmButtonColor: '#dc2626',
            confirmButtonText: 'Go to Login',
            timer: 2500,
            timerProgressBar: true,
            customClass: {
                popup: 'border border-gray-700'
            }
            });
            
            router.push('/login');
            
        }catch(err: unknown){
            console.log(err)
            Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
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

    return(
       <div className="flex justify-center min-h-screen items-center ">
            <div className="grid gap-8 w-full md:w-md lg:w-xl px-5 sm:px-0">
                <header className="grid justify-items-center">
                    <DynamicIcon name="FiUserPlus" className="text-2xl md:text-5xl lg:text-8xl text-blue-600"/>
                    <h1 className="text-center text-lg md:text-2xl lg:text-3xl">Creat Account</h1>
                    <h1 className="text-center text-md md:text-xl lg:text-2xl text-gray-600">Sign up for new account</h1>
                </header>
                <UserRegistrationForm onSubmit={handleUserRegister}/>
            </div>
       </div>
    )
}