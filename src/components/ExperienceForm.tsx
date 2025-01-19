import React, { useState } from 'react';
import { Collapsible, CollapsibleContent } from "@radix-ui/react-collapsible";
import { CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash } from "lucide-react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Experience } from "@/app/actions/resume";

type ExperienceFormProps = {
    experience: Experience,
    deleteExperience: (id: string) => void,
    updateExperience: (experience: Experience, id: string) => void
}

const ExperienceFormSchema = z.object({
    company: z.string().min(2),
    startDate: z.string(),
    endDate: z.string(),
    title: z.string().min(2),
    location: z.string().min(2),
    responsibilities: z.string().min(20),
    experienceId: z.string()
});

type ExperienceFormType = z.infer<typeof ExperienceFormSchema>;

const ExperienceForm = ({
                            experience, deleteExperience, updateExperience
                        }: ExperienceFormProps) => {

    const [expanded, setExpanded] = useState(true);

    const { register, handleSubmit, formState: { errors } } = useForm<ExperienceFormType>({
        resolver: zodResolver(ExperienceFormSchema), defaultValues: {
            company: experience.company,
            startDate: experience.startDate,
            endDate: experience.endDate,
            title: experience.title,
            location: experience.location,
            responsibilities: experience.responsibilities,
        }
    });

    const onSubmit = (data: ExperienceFormType) => {
        console.log("onsubmit", data);
        autoSave(data);
    }

    function autoSave(data: ExperienceFormType) {
        console.log("autosave", data);
        experience = {
            company: data.company,
            startDate: data.startDate,
            endDate: data.endDate,
            title: data.title,
            location: data.location,
            responsibilities: data.responsibilities,
            id: data.experienceId
        }
        console.log("autosave", experience);
        updateExperience(experience, experience.id!);
    }

    return (
        <form key={experience.id} onSubmit={handleSubmit(onSubmit)}>
            <Collapsible key={experience.id}
                         open={expanded}
                         onOpenChange={open => setExpanded(open)}
                         className="w-full md:w-[350px] space-y-2"
            >
                <div className="flex items-center justify-between space-x-4 -ml-2">
                    <CollapsibleTrigger asChild>
                        <div className="flex flex-row justify-between text-center items-center">
                            <Button variant="ghost" size="sm">
                                {experience.title} @ {experience.company}, {experience.location} -
                                ({new Date(experience.startDate).toLocaleDateString('en-US', {
                                month: '2-digit',
                                year: 'numeric'
                            })} to {new Date(experience.endDate).toLocaleDateString('en-US', {
                                month: '2-digit',
                                year: 'numeric'
                            })}) {expanded ? '▲' : '▼'}
                                <span className="sr-only">Experience 1</span>
                            </Button>
                            <Trash className="h-4 w-4 text-red-500 hover:cursor-pointer" onClick={() => deleteExperience(experience.id!)} />
                        </div>
                    </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="space-y-2">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Company name</Label>
                            <Input
                                {...register('company')}
                                id="company"
                                name="company"
                                placeholder="Google"
                                required={true}
                                onBlur={handleSubmit(onSubmit)}
                            />
                            <p className="text-red-500 text-sm">{errors.company?.message}</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                {...register('title')}
                                id="title"
                                name="title"
                                placeholder="Software Engineer"
                                required={true}
                                onBlur={handleSubmit(onSubmit)}
                            />
                            <p className="text-red-500 text-sm">{errors.title?.message}</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                {...register('location')}
                                id="location"
                                name="location"
                                placeholder="Mountain View, CA"
                                required={true}
                                onBlur={handleSubmit(onSubmit)}
                            />
                            <p className="text-red-500 text-sm">{errors.location?.message}</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="startDate">Start Date</Label>
                            <Input
                                {...register('startDate')}
                                id="startDate"
                                name="startDate"
                                type="date"
                                required={true}
                                onBlur={handleSubmit(onSubmit)}
                            />
                            <p className="text-red-500 text-sm">{errors.startDate?.message}</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="endDate">End Date</Label>
                            <Input
                                {...register('endDate')}
                                id="endDate"
                                name="endDate"
                                type="date"
                                required={true}
                                onBlur={handleSubmit(onSubmit)}
                            />
                            <p className="text-red-500 text-sm">{errors.endDate?.message}</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="responsibilities">Responsibilities</Label>
                            <Textarea
                                {...register('responsibilities')}
                                id="responsibilities"
                                name="responsibilities"
                                placeholder="List your responsibilities"
                                required={true}
                                onBlur={handleSubmit(onSubmit)}
                            />
                            <p className="text-red-500 text-sm">{errors.responsibilities?.message}</p>
                        </div>
                        <input {...register("experienceId")} type="hidden" name="experienceId"
                               id="experienceId" value={experience.id} />
                        <div className="flex justify-end gap-5">
                        </div>
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </form>
    )
}
export default ExperienceForm;
