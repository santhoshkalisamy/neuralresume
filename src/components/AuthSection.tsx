import React from 'react'
import {SignedIn, SignedOut, SignInButton, SignUpButton, UserButton} from "@clerk/nextjs";
import {neobrutalism} from "@clerk/themes";

const AuthSection = () => {
    return (
        <>
            <div className="flex items-center gap-x-5 md:gap-x-8">
                <SignedIn>
                    <UserButton appearance={
                        {
                            baseTheme: neobrutalism,
                        }
                    }/>
                </SignedIn>
                <SignedOut>
                   {/* <Button asChild variant="default" size="lg"
                            className="bg-teal-600 hover:bg-teal-500 text-white font-semibold px-2 py-1 rounded-md">
                        <SignInButton mode="modal" withSignUp={true} fallbackRedirectUrl="/">Sign In</SignInButton>
                    </Button>
                    <Button asChild variant="default" size="lg"
                            className=" bg-teal-600 hover:bg-teal-500 text-white font-semibold px-2 py-1 rounded-md">
                        <SignUpButton mode="modal" fallbackRedirectUrl="/" forceRedirectUrl="/">Sign Up</SignUpButton>
                    </Button>*/}
                    <SignInButton mode="modal" withSignUp={true} fallbackRedirectUrl="/">Sign In</SignInButton>
                    <SignUpButton mode="modal" fallbackRedirectUrl="/" forceRedirectUrl="/">Sign Up</SignUpButton>
                </SignedOut>

            </div>
        </>
    )
}
export default AuthSection
