'use client';
import { FormEvent, useState } from "react";

import DynamicIcon from "@/utill/DynamicIcon";
import { UserRegisterFormErrors, userRegistrationFormValidationSchema } from "@/lib/schema/userRegisterFromValidationSchema";
import { UserRequestDto } from "@/dto/user";

import Swal from "sweetalert2";
import { registerNewUser } from "@/services/user/registerNewUser";
import { useRouter } from "next/navigation";

export function UserRegistrationForm({onSubmit}: {onSubmit: (data: UserRequestDto) => Promise<void> }){

    const router = useRouter();
    const[error,setError]=useState("");
    const[isPasswordShowing,setIsPasswordShowing] = useState(false);
    const[inputValidationErrors, setInpuValidationErrors] =useState<UserRegisterFormErrors>({})

     async function formSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        const data = new FormData(event.currentTarget) 
       
        const formValues ={
        firstName: data.get("firstName") as string,
        lastName: data.get("lastName") as string,
        username: data.get("username") as string,
        email: data.get("email") as string,
        password: data.get("password") as string,
        };

        const result = userRegistrationFormValidationSchema.safeParse(formValues)

        if (!result.success) {
        setInpuValidationErrors(result.error.flatten().fieldErrors);
        return; // Stop here, don't call the API
        }

        setInpuValidationErrors({})

        const userData: UserRequestDto = {
        firstName: result.data.firstName,
        lastName: result.data.lastName,
        username: result.data.username,
        email: result.data.email,
        password: result.data.password,
        };

        try {
            await onSubmit(userData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to save task');
        } 

    }

    return(
        <div className="flex justify-center">
            <form className="grid gap-4 w-full sm:w-md md:w-lg" onSubmit={formSubmit}>
                    <div className="grid md:flex md:justify-between md:gap-5 w-full gap-4">
                        {error && (<p className="text-red-500 text-sm pl-1">{error}</p>)}
                        <div className="grid gap-1 md:w-full">
                            <label  htmlFor={"firstName"}>First name</label>
                            <input type="text" name="firstName"
                                className=" border border-gray-600 rounded-md px-2   h-8 sm:h-10  " 
                                placeholder="Ayrton"
                                />
                                {inputValidationErrors.firstName && 
                                    <p className="text-red-500 text-sm pl-1">{inputValidationErrors.firstName[0]}</p>}
                        </div>
                        <div className="grid gap-1 md:w-full">
                            <label  htmlFor={"lastName"}>Last name</label>
                            <input type="text" name="lastName"
                                className=" border border-gray-600 rounded-md px-2  h-8  sm:h-10  " 
                                placeholder="senna"
                                />
                                {inputValidationErrors.lastName && 
                                    <p className="text-red-500 text-sm pl-1">{inputValidationErrors.lastName[0]}</p>}
                        </div>
                    </div>

                    <div className="grid gap-1">
                        <label  htmlFor={"email"}>Email</label>
                        <input type="text" name="email"
                            className=" border border-gray-600 rounded-md px-2  h-8  sm:h-10  " 
                            placeholder="you@example.com"
                            />
                            {inputValidationErrors.email && 
                                    <p className="text-red-500 text-sm pl-1">{inputValidationErrors.email[0]}</p>}
                    </div>
                    <div className="grid gap-1">
                        <label  htmlFor={"username"}>User name</label>
                        <input type="text" name="username"
                            className=" border border-gray-600 rounded-md px-2  h-8  sm:h-10  " 
                            placeholder="Ayrton_Senna_de_silva"
                            />
                            {inputValidationErrors.username && 
                                    <p className="text-red-500 text-sm pl-1">{inputValidationErrors.username[0]}</p>}
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
                        {inputValidationErrors.password && 
                                    <p className="text-red-500 text-sm pl-1">{inputValidationErrors.password[0]}</p>}
                    </div>
                    <button type="submit" 
                        className="w-full border border-blue-600 bg-blue-600 py-1 px-4 rounded-md text-white 
                        active:scale-75">
                        Register
                    </button>
                </form>
        </div>
    )
}