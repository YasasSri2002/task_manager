import { LoginRequestDto } from "@/dto/login";
import axios, { AxiosError } from "axios";
import Cookies from 'js-cookie';

const BACKEND_URL = process.env.NEXT_PUBLIC_SPRING_BOOT_API_URL;

export async function login(loginRequestDto: LoginRequestDto){

    if(!BACKEND_URL){
        console.log("Backend is not set up properly")
    }

   try {
        const response = await axios.post(`${BACKEND_URL}/authenticate/login`, loginRequestDto);
        
        if(response.status === 200){
            const { userId, jwtToken } = response.data;
            Cookies.set("auth-token", jwtToken);
            Cookies.set("x-user-id", userId);
            return;
        }


    } catch (error: unknown) {

         if (error instanceof AxiosError) {
            const status = error.response?.status;

            if (status === 401) {
                throw new Error("Invalid username or password");
            } else if (status === 404) {
                throw new Error("User not found");
            } else if (status === 403) {
                throw new Error("Access denied");
            } else {
                throw new Error("Something went wrong, please try again");
            }
        }
        throw new Error("An unexpected error occurred");
        
    }



}