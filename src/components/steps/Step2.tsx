import { Button } from "@/components/ui/button";
import { Experience } from "@/app/actions/resume";
import React from "react";
import { ChevronLeft, ChevronRight, PlusSquare } from "lucide-react";
import ExperienceForm from "@/components/ExperienceForm";
import { useResume } from "@/components/ResumeContext";

interface Step2Props {
    goBack: () => void;
    nextStep: () => void;
}

const Step2 = ({ goBack, nextStep }: Step2Props) => {
    const { newResume, setNewResume } = useResume();

    function addExperience(experience: Experience) {
        setNewResume({
            ...newResume,
            experiences: [experience, ...newResume.experiences]
        });
    }

    function updateExperience(experience: Experience, id: string) {
        setNewResume({
            ...newResume,
            experiences: newResume.experiences.map((exp) => exp.id === id ? experience : exp)
        });
    }

    function randomString() {
        return (Math.random() * 1000000).toString(36).replace('.', '');
    }

    function deleteExperience(id: string) {
        const newExperiences = newResume.experiences.filter((exp) => exp.id !== id);
        setNewResume({
            ...newResume,
            experiences: newExperiences
        });
    }

    return (
        <div className="space-y-6 pb-4">
            <div className="flex flex-row justify-between">
                <h2 className="text-lg font-bold">Experience</h2>
                <Button type="button" variant="outline" onClick={() => {
                    addExperience({
                        id: randomString(),
                        company: 'Company' + newResume.experiences.length,
                        title: 'CompanyTitle' + newResume.experiences.length,
                        location: 'CompanyLocation' + newResume.experiences.length,
                        startDate: "2025-01-16",
                        endDate: "2025-01-16",
                        responsibilities: 'CompanyResponsibilitiesCompanyResponsibilitiesCompanyResponsibilitiesCompanyResponsibilitiesCompanyResponsibilitiesCompanyResponsibilities' + newResume.experiences.length
                    });
                }}>
                    <PlusSquare /> Add experience
                </Button>
            </div>
            {newResume.experiences.map((experience) => {
                return (
                    <ExperienceForm key={experience.id}
                                    experience={experience}
                                    deleteExperience={deleteExperience}
                                    updateExperience={updateExperience}
                    />
                );
            })}
            <div className="flex flex-row justify-between w-full">
                <Button type="button" variant="outline" className="bg-gray-400 text-white" onClick={() => goBack()}>
                    <ChevronLeft /> Back
                </Button>
                <Button type="button" onClick={nextStep}>
                    Next <ChevronRight />
                </Button>
            </div>
        </div>
    )
}
export default Step2;
