'use server'
import { cookies } from "next/headers";
export async function logout(){
    const cookieStore = await cookies();
    const cookieListToClear = [
        "auth-token",
        "x-user-id",
        "x-user-role"
    ]
    cookieListToClear.map((cookie)=> cookieStore.delete(cookie));
}