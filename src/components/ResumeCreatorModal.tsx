import React from 'react';
import { useState } from 'react';
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
import {ResumeData} from "@/app/actions/resume";
import Step2 from "@/components/steps/Step2";
import Step3 from "@/components/steps/Step3";
import {cn} from "@/lib/utils";

const ResumeCreationModal = () => {
    const [open, setOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const [newResume, setNewResume] = useState<ResumeData>({
        name: '',
        currentCompany: '',
        currentRole: '',
        experiences: [],
        skills: [],
        educations: [],
        certifications: [],
        email: '',
        phone: '',
        address: '',
        summary: ''
    });

    function updateResumeAndGoToNextStep(resume: ResumeData) {
        setNewResume(resume);
        console.log("New Resume:", resume);
        console.log("Current Step:", currentStep);
        setCurrentStep(currentStep + 1);
    }

    function goBack() {
        setCurrentStep(currentStep - 1);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    <p className="hidden md:block">Create New Resume</p>
                </Button>
            </DialogTrigger>
            <DialogContent className="min-w-fit">
                <DialogHeader>
                    <DialogTitle>Create New Resume</DialogTitle>
                    <DialogDescription>
                        Let&#39;s start with some basic information about you.
                    </DialogDescription>
                </DialogHeader>
                {/* Progress Indicator */}
                <div className="flex items-center gap-2">
                    <div className={cn("h-2 w-full rounded-full", (currentStep === 1 ? "bg-blue-600" : "bg-gray-200"))} />
                    <div className={cn("h-2 w-full rounded-full", (currentStep === 2 ? "bg-blue-600" : "bg-gray-200"))}/>
                    <div className={cn("h-2 w-full rounded-full", (currentStep === 3 ? "bg-blue-600" : "bg-gray-200"))}/>
                </div>
                {currentStep === 1 &&
                    <Step1 updateResume={updateResumeAndGoToNextStep}
                           newResume={newResume} goBack={goBack} close={() => setOpen(false)} />}
                {currentStep === 2 &&
                    <Step2 updateResume={updateResumeAndGoToNextStep}
                           newResume={newResume} goBack={goBack} close={() => setOpen(false)} />}
                {currentStep === 3 &&
                    <Step3 updateResume={updateResumeAndGoToNextStep}
                           newResume={newResume} goBack={goBack} close={() => setOpen(false)} />}
            </DialogContent>
        </Dialog>
    );
};

export default ResumeCreationModal;
