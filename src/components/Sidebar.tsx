import React from 'react'
import {ChevronFirst} from "lucide-react";
import logo from "@/images/logoipsum-343.svg";
import Image from "next/image";
import SidebarItem from "@/components/SidebarItem";

const Sidebar = () => {
    return (
        <aside className="h-screen w-64 fixed">
                <nav className="bg-white flex flex-col h-full border-r shadow-sm">
                    <div className="pb-2 p-4 flex justify-between items-center border-b">
                        <Image src={logo} alt="logo" width={48} className="w-32"/>
                        <button className="cursor-pointer p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100" >
                            <ChevronFirst />
                        </button>
                    </div>
                    <ul className="flex flex-1 p-3">
                        <SidebarItem title="My Resumes" active={true} link={"/dashboard"}></SidebarItem>
                    </ul>
                </nav>
        </aside>
    )
}
export default Sidebar
