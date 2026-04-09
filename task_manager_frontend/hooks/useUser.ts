import { UserRequestDto } from "@/dto/user";
import { userDataQueryOption } from "@/queryOptions/userQueryOptions"
import { registerNewAdmin } from "@/services/adminRegistration";
import { useMutation, useQuery } from "@tanstack/react-query"
import Swal from "sweetalert2";

export const useUserData = (id:string) =>{
    return useQuery(userDataQueryOption(id));
}

export const useRegisterAdmin =() =>{
    return useMutation({
        mutationFn: async (data:UserRequestDto) =>{
            await registerNewAdmin(data); 
        },onSuccess: ()=>{
            Swal.fire({
                icon: 'success',
                title: 'Registration Successful!',
                background: '#fff',
                color: '#000000',
                confirmButtonColor: '#dc2626',
                confirmButtonText: 'Go to Login',
                timer: 2500,
                timerProgressBar: true,
                customClass: { popup: 'border border-gray-700' }
            });
        },onError(err){
            Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: err instanceof Error ? err.message : 'An unexpected error occurred.',
            background: '#fff',
            color: '#000000',
            confirmButtonColor: '#dc2626',
            customClass: { popup: 'border border-gray-700' }
        });
        }
    })
}