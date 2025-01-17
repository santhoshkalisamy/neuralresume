import React from 'react'
import Logo from "@/components/Logo";
import MainMenu from "@/components/MainMenu";
import AuthSection from "@/components/AuthSection";

const Header = () => {
    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav className="relative z-50 flex justify-between">
                <div className="flex items-center md:gap-x-12">
                    <Logo />
                </div>
                <div>
                    <MainMenu />
                </div>
                <div>
                    <AuthSection />
                </div>
            </nav>
        </div>
    )
}
export default Header
