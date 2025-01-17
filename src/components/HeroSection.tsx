import * as motion from "motion/react-client"
import React from 'react'
import {Button} from "@/components/ui/button";
import Image from "next/image";

const HeroSection = () => {
    return (
        <div className="mx-auto max-w-7xl text-center pt-20 lg:pt-32 px-4 sm:px-6 lg:px-8 pb-16 ">
            <motion.h1 className="mx-auto max-w-4xl text-5xl sm:text-7xl font-medium text-slate-600"
                       initial={{opacity: 0, y: -50}}
                       animate={{opacity: 1, y: 0}}
                       transition={{duration: 1}}
            >
                Build Your <span className="relative  whitespace-nowrap text-teal-500">Perfect Resume</span> in Minutes
            </motion.h1>
            <motion.p initial={{opacity: 0}}
                      animate={{opacity: 1}}
                      transition={{duration: 1, delay: 0.5}} className="mx-auto max-w-2xl mt-5 text-lg text-slate-700">
                AI-powered resume builder to create professional resumes effortlessly.
            </motion.p>
            <motion.div initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 1, delay: 0}}
                        className="mt-10 flex justify-center gap-x-6">
                <Button size="lg" variant="default" className="bg-teal-600 mt-8 font-bold hover:text-md hover:bg-teal-500">Get Started for Free</Button>
            </motion.div>
            <motion.div
                initial={{opacity: 0, y: 50}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 1, delay: 0}}
                className="mt-36"><p className="font-display text-base text-slate-900">
                Get Placed in your dream companies
            </p>
                <ul role="list"
                    className="mt-8 flex items-center justify-center gap-x-8 sm:flex-col sm:gap-x-0 sm:gap-y-10 xl:flex-row xl:gap-x-12 xl:gap-y-0">
                    <li>
                        <ul role="list"
                            className="flex flex-col items-center gap-y-8 sm:flex-row sm:gap-x-12 sm:gap-y-0">
                            <li className="flex"><Image alt="google" loading="lazy" width="96" height="96"
                                                        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg"/>
                            </li>
                            <li className="flex"><Image alt="google" loading="lazy" width="96" height="96"
                                                        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/facebook/facebook-original.svg"/>
                            </li>
                            <li className="flex"><Image alt="google" loading="lazy" width="96" height="96"
                                                        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"/>
                            </li>
                            <li className="flex"><Image alt="google" loading="lazy" width="96" height="96"
                                                        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg" />
                            </li>
                        </ul>
                    </li>
                </ul>
            </motion.div>
        </div>
    )
}
export default HeroSection
