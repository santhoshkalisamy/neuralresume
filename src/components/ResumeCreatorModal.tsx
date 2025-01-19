import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Plus} from "lucide-react";
import Step1 from "@/components/steps/Step1";
import Step2 from "@/components/steps/Step2";
import Step3 from "@/components/steps/Step3";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ResumeData } from "@/app/actions/resume";
import {useResume} from "@/components/ResumeContext";

const ResumeCreationModal = () => {
    const [open, setOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const {newResume, setNewResume} =  useResume();

    function updateResumeAndGoToNextStep(resume: ResumeData) {
        console.log(resume);
        setNewResume(resume);
        if(currentStep < 3) setCurrentStep((prevStep) => prevStep + 1);
    }

    function goBack() {
        if (currentStep > 1) setCurrentStep((prevStep) => prevStep - 1);
    }

    function nextStep() {
        if (currentStep < 3) setCurrentStep((prevStep) => prevStep + 1);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {/* Modal Trigger Button */}
            <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    <p className="hidden md:block">Create New Resume</p>
                </Button>
            </DialogTrigger>

            {/* Full-Screen Dialog Content */}
            <DialogContent
                className="fixed min-w-3/4 min-h-2/4 max-h-[900px] bg-white p-8 shadow-lg z-50 overflow-y-auto flex flex-col items-center"
            >
                <DialogHeader className="w-full max-w-2xl">
                    <DialogTitle className="text-3xl font-bold text-center">Create New Resume</DialogTitle>
                    <DialogDescription className="text-center">
                        Let&#39;s start with some basic information about you.
                    </DialogDescription>
                </DialogHeader>

                {/* Progress Indicator */}
                <div className="flex justify-center gap-2 my-4">
                    {[1, 2, 3].map((step) => (
                        <div
                            key={step}
                            className={cn(
                                "h-2 w-12 md:w-20 rounded-full transition-all",
                                currentStep >= step ? "bg-blue-600" : "bg-gray-200"
                            )}
                        />
                    ))}
                </div>

                {/* Step Transition Animations */}
                <div className="w-full max-w-2xl">
                    <AnimatePresence mode="wait">
                        {currentStep === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Step1 nextStep={nextStep} />
                            </motion.div>
                        )}

                        {currentStep === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Step2  nextStep={nextStep} goBack={goBack} />
                            </motion.div>
                        )}

                        {currentStep === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Step3 updateResume={updateResumeAndGoToNextStep} newResume={newResume} goBack={goBack} close={() => setOpen(false)} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ResumeCreationModal;
