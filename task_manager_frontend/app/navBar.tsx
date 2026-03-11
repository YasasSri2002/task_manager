'use client'
import DynamicIcon from "@/utill/DynamicIcon"

export function Navbar({username}:{username: string}){
    return(
        <div>
            <div className="flex justify-between items-center px-2 h-20 shadow-xl bg-white">
                <header className="grid">
                    <h1 className="text-md md:text-lg lg:text-xl">Task management</h1>
                    <h1 className="text-sm md:text-md lg:text-lg text-gray-600">Welcome, {username}</h1>
                </header>
                <button className=" flex gap-1 items-center text-md md:text-lg lg:text-2xl">
                    <DynamicIcon name="CiLogout" className="text-lg md:text-xl lg:text-3xl"/>
                    logout
                </button>
            </div>
        </div>
    )
}