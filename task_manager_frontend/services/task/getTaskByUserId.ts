'use server'
import { AxiosError } from "axios";
import axios from "axios";
import { cookies } from "next/headers";

const BACKEND_URL = process.env.NEXT_PUBLIC_SPRING_BOOT_API_URL;

export async function getTaskByUserId(id: string) {
  if (!BACKEND_URL) throw new Error("Backend URL not configured");

  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;
  if (!token) throw new Error("No auth token found");

  try {
    const response = await axios.get(`${BACKEND_URL}/api/v1/task/by-user-id?userId=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;

  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const status = error.response?.status;
      if (status === 401) throw new Error("Unauthorized");
      if (status === 403) throw new Error("Access denied");
      if (status === 404) throw new Error("Task not Found");
      throw new Error("Something went wrong, please try again");
    }
    throw new Error("An unexpected error occurred");
  }
}