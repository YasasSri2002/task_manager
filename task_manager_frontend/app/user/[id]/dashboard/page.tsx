'use client';
import { useParams } from "next/navigation";
import { Navbar } from "@/app/navBar";

export default function UserDashboardPage(){

    

    return(
        <main>
            <Navbar username={"username"}/>
        </main>
    )
}