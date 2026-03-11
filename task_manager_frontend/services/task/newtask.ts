'use server'
import { TaskRequestDto } from "@/dto/taskDto";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

const BACKEND_URL = process.env.NEXT_PUBLIC_SPRING_BOOT_API_URL;



export async function newTask(data : TaskRequestDto) {
  if (!BACKEND_URL) throw new Error("Backend URL not configured");

    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;
    if (!token) throw new Error("No auth token found");

  try {
    const response = await axios.post(`${BACKEND_URL}/api/v1/task/persist`, data,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return response.data;
    

  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const status = error.response?.status;
      if (status === 401) throw new Error("Invalid username or password");
      if (status === 404) throw new Error("User not found");
      if (status === 403) throw new Error("Access denied");
      throw new Error("Something went wrong, please try again");
    }
    throw new Error("An unexpected error occurred");
  }
}