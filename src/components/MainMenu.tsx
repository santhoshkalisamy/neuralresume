import React from 'react';
import Link from "next/link";

const MainMenu = () => {
    return (
        <div className="hidden md:flex md:gap-x-6 text-gray-500">
            <Link href="/" className="hover:text-teal-700">Home</Link>
            <Link href="/dashboard" className="hover:text-teal-700">Dashboard</Link>
            <Link href="/contact" className="hover:text-teal-700">Contact Us</Link>
        </div>
    );
}
export default MainMenu;
