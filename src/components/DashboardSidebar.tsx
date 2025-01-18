'use client';
import React from 'react'
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {FileUserIcon} from "lucide-react";
import {Menu} from "@/components/menu";
import {SidebarToggle} from "@/components/sidebar-toggle";

type SidebarToggleProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const DashboardSidebar = (props:SidebarToggleProps) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isHover, setIsHover] = React.useState(false);
    return (
        <aside
            className={cn(
                "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
                !props.isOpen ? "w-[90px]" : "w-64",
            )}
        >
            <SidebarToggle isOpen={props.isOpen} setIsOpen={() => props.setIsOpen(!props.isOpen)}/>
            <div
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800"
            >
                <Button
                    className={cn(
                        "transition-transform ease-in-out duration-300 mb-1",
                        !props.isOpen ? "translate-x-1" : "translate-x-0"
                    )}
                    variant="link"
                    asChild
                >
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <FileUserIcon className="w-8 h-8 mr-1"/>
                        <h1
                            className={cn(
                                "font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
                                !props.isOpen
                                    ? "-translate-x-96 opacity-0 hidden"
                                    : "translate-x-0 opacity-100"
                            )}
                        >
                            NeuralResume
                        </h1>
                    </Link>
                </Button>
                <Menu isOpen={props.isOpen}/>
            </div>
        </aside>
    )
}
export default DashboardSidebar
