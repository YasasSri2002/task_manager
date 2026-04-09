import { LoginRequestDto } from "@/dto/login"
import { login } from "@/services/auth/login/loginService"
import { useMutation } from "@tanstack/react-query"
import Swal from "sweetalert2"

export const useLogin= ()=>{
    return useMutation({
        mutationFn: (data: LoginRequestDto)=>login(data),
        onError:(error)=>{
            Swal.fire({
                icon: "error",
                title: "ERROR",
                text: `${error.message}`
            })
        }
    })
}