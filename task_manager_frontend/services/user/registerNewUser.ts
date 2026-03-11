
import { UserRequestDto } from "@/dto/user";
import axios, { AxiosError } from "axios";


const BACKEND_URL = process.env.NEXT_PUBLIC_SPRING_BOOT_API_URL;



export async function registerNewUser(data : UserRequestDto) {
  if (!BACKEND_URL) throw new Error("Backend URL not configured");


  try {
    const response = await axios.post(`${BACKEND_URL}/api/v1/user/persist`, data);

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