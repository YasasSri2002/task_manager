'use server'
import { UserRequestDto } from "@/dto/user";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

const BACKEND_URL = process.env.NEXT_PUBLIC_SPRING_BOOT_API_URL;



export async function registerNewAdmin(data : UserRequestDto) {
  if (!BACKEND_URL) throw new Error("Backend URL not configured");

  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;
  if (!token) window.location.replace('/login');

  try {
    const response = await axios.post(`${BACKEND_URL}/api/v1/user/register/admin`, data,{
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response.data;
    

  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const status = error.response?.status;
      if (status === 401) throw new Error("Invalid username or password");
      if (status === 404) throw new Error("User not found");
      if (status === 403) throw new Error("Access denied");

      const message = error.response?.data.message;
      if(message) throw new Error(message);

      throw new Error(error.message);
    }
    throw new Error("An unexpected error occurred");
  }
}