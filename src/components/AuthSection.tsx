import React from 'react'
import {Button} from "@/components/ui/button";

const AuthSection = () => {
    return (
        <>
            <div className="flex items-center gap-x-5 md:gap-x-8">
                <Button variant="default" size="lg" className="bg-teal-600 hover:bg-teal-500 text-white font-semibold px-2 py-1 rounded-md">Sign In</Button>
                <Button variant="default" size="lg" className=" bg-teal-600 hover:bg-teal-500 text-white font-semibold px-2 py-1 rounded-md">Sign Up</Button>
            </div>
        </>
    )
}
export default AuthSection
