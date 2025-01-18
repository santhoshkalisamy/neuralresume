'use client';
import React from 'react'
import {cn} from "@/lib/utils";
import DashboardFooter from "@/components/DashboardFooter";
import DashboardSidebar from "@/components/DashboardSidebar";

const DashboardLayout = ({children}: {children: React.ReactNode}) => {
    const [isOpen, setIsOpen] = React.useState(true);
    return (
        <div>
            <DashboardSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            <main
                className={cn(
                    "min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
                    (!isOpen ? "lg:ml-[90px]" : "lg:ml-64"))}
            >
                {children}
            </main>
            <footer
                className={cn(
                    "transition-[margin-left] ease-in-out duration-300",
                    (!isOpen ? "lg:ml-[90px]" : "lg:ml-64")
                )}
            >
                <DashboardFooter/>
            </footer>
        </div>
    )
}
export default DashboardLayout
