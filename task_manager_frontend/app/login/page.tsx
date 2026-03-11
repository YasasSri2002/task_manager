'use client'
import Link from "next/link";
import Image from "next/image";
import { FormEvent, useState } from "react";
import DynamicIcon from "@/utill/DynamicIcon";
import { login } from "@/services/login/loginService";
import { LoginRequestDto, LoginResponseDto } from "@/dto/login";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../types/decodedToken";
import { useRouter } from "next/navigation";

export default function LoginPage(){

    const[isPasswordShowing,setIsPasswordShowing] =useState(false);
    const[errorMessage,setErrorMessage] = useState<string|null>(null);
    const router = useRouter();

    async function loginFormSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const data: LoginRequestDto ={
            username: formData.get('email') as string,
            password: formData.get('password') as string
        }

        try{
            setErrorMessage(null)
            const result: LoginResponseDto = await login(data);
            let { token} = result;
            const{ userId} =result;

             if (!token) throw new Error("No jwtToken returned");

            // Remove "Bearer " prefix if present
            if (token.startsWith("Bearer ")) {
                token = token.substring(7);
            }

            // Decode JWT to get roles
            const decoded: DecodedToken = jwtDecode(token);
            const roles = decoded.authorities.split(",").map(r => r.trim());

            // Redirect based on role
            if (roles.includes("ROLE_SUPER_ADMIN")) {
                router.push(`/super-admin/dashboard/${userId}`);
            } else if (roles.includes("ROLE_USER")) {
                router.push(`/user/${userId}/dashboard/`);
            } else {
                router.push("/unauthorized");
            }


        }catch(error : unknown){
             if (error instanceof Error) {
                setErrorMessage(error.message);
            }
        }

        
    }


    return(
        <div className="grid justify-items-center content-center h-dvh">
        <div className="grid justify-items-center w-[18em] md:w-3xl lg:4xl sm:min-w-xl  max-w-7xl  gap-5">
            <header>
                <div className="flex items-center justify-center">
                    <Image src={"/logo.png"}
                        width={200}
                        height={100}
                         alt="logo"
                        />
                </div>
                
                <h1 className="text-center text-md  md:text-2xl">
                    Welcome to Task Forge
                </h1>
                <h2 className="text-center text-sm md:text-md text-gray-500">
                    Sign in to your account
                </h2>
            </header>
            
                <form className="grid gap-4 w-full sm:w-md md:w-lg" onSubmit={loginFormSubmit}>
                   <div className="flex justify-center">
                     {errorMessage && 
                        <p className="w-fit px-4 py-1 text-red-600 text-center text-sm bg-red-200 border-rose-500 rounded-sm">
                        {errorMessage}
                        </p>}
                   </div>
                    <div className="grid gap-1">
                        <label  htmlFor={"email"}>Email</label>
                        <input type="text" name="email"
                            className=" border border-gray-600 rounded-md px-2  h-8  sm:h-10  " 
                            placeholder="you@example.com"
                            />
                    </div>
                    <div className="grid gap-1">
                        <label htmlFor={"password"}>Password</label>
                        <div className="relative flex items-center w-full">
                            <input
                                type={isPasswordShowing ? "text" : "password"}
                                name="password"
                                id="password"
                                className="border border-gray-600 rounded-md px-2 pr-10 w-full h-8 sm:h-10"
                                placeholder="*****"
                            />
                            <button
                                type="button"
                                className="absolute right-3 flex items-center text-gray-500 hover:text-gray-800"
                                onClick={() => setIsPasswordShowing(!isPasswordShowing)}
                            >
                                {isPasswordShowing ?
                                    <DynamicIcon name="FaRegEye" /> : <DynamicIcon name="FaRegEyeSlash" />
                                }
                            </button>
                        </div>
                    </div>
                    <button type="submit" 
                        className="w-full border border-blue-600 bg-blue-600 py-1 px-4 rounded-md text-white 
                        active:scale-75">
                        Sign in
                    </button>
                </form>

            <div>
                <h1>Don&apos;t have an account? 
                    <span><Link href="/register" 
                            className="text-blue-700"> Sign up
                            </Link>
                    </span></h1>
            </div>
        </div>
        </div>
    );
}