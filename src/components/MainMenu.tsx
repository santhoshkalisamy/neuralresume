import React from 'react'
import Link from "next/link";

const MainMenu = () => {
    return (
        <div className="hidden md:flex md:gap-x-6 text-gray-500">
            <Link href="/">Home</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/contact">Contact Us</Link>
        </div>
    )
}
export default MainMenu
