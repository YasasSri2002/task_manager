import { LoginRequestDto, LoginResponseDto } from "@/dto/login";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

const BACKEND_URL = process.env.NEXT_PUBLIC_SPRING_BOOT_API_URL;



export async function login(loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
  if (!BACKEND_URL) throw new Error("Backend URL not configured");

  try {
    const response = await axios.post(`${BACKEND_URL}/authenticate/login`, loginRequestDto);

    if (response.status === 200) {
      let { jwtToken} = response.data;
      const {userId} = response.data;

      if (!jwtToken || !userId) {
        throw new Error("Login failed: missing token or userId");
      }

      // Remove Bearer prefix if exists
      if (jwtToken.startsWith("Bearer ")) {
        jwtToken = jwtToken.substring(7);
      }

      // Set cookies
      Cookies.set("auth-token", jwtToken);
      Cookies.set("x-user-id", userId);

      return { token: jwtToken, userId };
    }

    // Explicit throw for any other status
    throw new Error(`Login failed with status ${response.status}`);

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