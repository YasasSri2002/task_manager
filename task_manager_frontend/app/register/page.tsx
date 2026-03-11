import { UserRegistrationForm } from "./userRegistrationForm";
import DynamicIcon from "@/utill/DynamicIcon";

export default function UserRegistrationPage(){
    return(
       <div className="flex justify-center min-h-screen items-center ">
            <div className="grid gap-8 w-full md:w-md lg:w-xl px-5 sm:px-0">
                <header className="grid justify-items-center">
                    <DynamicIcon name="FiUserPlus" className="text-2xl md:text-5xl lg:text-8xl text-blue-600"/>
                    <h1 className="text-center text-lg md:text-2xl lg:text-3xl">Creat Account</h1>
                    <h1 className="text-center text-md md:text-xl lg:text-2xl text-gray-600">Sign up for new account</h1>
                </header>
                <UserRegistrationForm/>
            </div>
       </div>
    )
}