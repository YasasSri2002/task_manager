'use client';
import { FormEvent, useState } from "react";

import DynamicIcon from "@/utill/DynamicIcon";

export function UserRegistrationForm(){

    const[isPasswordShowing,setIsPasswordShowing] = useState(false);

    function formSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault()
        const formData = new FormData(event.currentTarget);
        console.log(formData);
    }

    return(
        <div className="flex justify-center">
            <form className="grid gap-4 w-full sm:w-md md:w-lg" onSubmit={formSubmit}>
                    <div className="grid md:flex md:justify-between md:gap-5 w-full gap-4">
                        <div className="grid gap-1 md:w-full">
                            <label  htmlFor={"firstName"}>First name</label>
                            <input type="text" name="firstName"
                                className=" border border-gray-600 rounded-md px-2   h-8 sm:h-10  " 
                                placeholder="Ayrton"
                                />
                        </div>
                        <div className="grid gap-1 md:w-full">
                            <label  htmlFor={"lastName"}>Last name</label>
                            <input type="text" name="lastName"
                                className=" border border-gray-600 rounded-md px-2  h-8  sm:h-10  " 
                                placeholder="senna"
                                />
                        </div>
                    </div>

                    <div className="grid gap-1">
                        <label  htmlFor={"email"}>Email</label>
                        <input type="text" name="email"
                            className=" border border-gray-600 rounded-md px-2  h-8  sm:h-10  " 
                            placeholder="you@example.com"
                            />
                    </div>
                    <div className="grid gap-1">
                        <label  htmlFor={"username"}>User name</label>
                        <input type="text" name="username"
                            className=" border border-gray-600 rounded-md px-2  h-8  sm:h-10  " 
                            placeholder="Ayrton_Senna_de_silva"
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
                        Register
                    </button>
                </form>
        </div>
    )
}