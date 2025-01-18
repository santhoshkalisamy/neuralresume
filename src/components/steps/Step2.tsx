import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Experience, ResumeData} from "@/app/actions/resume";
import * as z from 'zod';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import { Textarea } from "@/components/ui/textarea"
import {Collapsible, CollapsibleContent } from "@radix-ui/react-collapsible";
import {CollapsibleTrigger} from "@/components/ui/collapsible";
import {ChevronsUpDown, Trash} from "lucide-react";

const Step2ExperienceSchema = z.object({
    company: z.string().min(2),
    startDate: z.string(),
    endDate: z.string(),
    title: z.string().min(2),
    location: z.string().min(2),
    responsibilities: z.string().min(20)
});

interface Step2Props {
    newResume: ResumeData;
    updateResume: (resume: ResumeData) => void;
    close: () => void;
    goBack: () => void;
}

type Step2FormData = z.infer<typeof Step2ExperienceSchema>;

const Step2 = ({newResume, updateResume, close, goBack}: Step2Props) => {

    const [isOpen, setIsOpen] = useState<boolean[]>([]);

    const [experiences, setExperiences] = useState<Experience[]>(newResume.experiences);

    const {register, handleSubmit, formState: {errors}} = useForm<Step2FormData>({
        resolver: zodResolver(Step2ExperienceSchema),
        defaultValues: {
            company: newResume.experiences[0]?.company,
            startDate: newResume.experiences[0]?.startDate,
            endDate: newResume.experiences[0]?.endDate,
            title: newResume.experiences[0]?.title,
            location: newResume.experiences[0]?.location,
            responsibilities: newResume.experiences[0]?.responsibilities
        }
    });

    const onSubmit = (data: Step2FormData) => {
        console.log(data);
        updateResumeAndGoToNextStep(data);
    }

    function addExperience(experience: Experience) {
        setExperiences([...experiences, experience]);
    }

    function updateResumeAndGoToNextStep(data: Step2FormData) {
        updateResume({
            ...newResume,
            experiences: experiences
        })
    }

    return (<div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6 pb-4">
                <h2 className="text-lg font-bold">Experience</h2>
                {/* Step 1 Form */}
                <div>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => addExperience({
                            company: 'Company',
                            title: '',
                            location: '',
                            startDate: '',
                            endDate: '',
                            responsibilities: ''
                        })}
                    >
                        Add Experience
                    </Button>
                </div>
                { experiences.map((experience, index) =>
                <Collapsible key={index}
                    open={isOpen[index]}
                    onOpenChange={open => setIsOpen([])}
                    className="w-[350px] space-y-2"
                >
                    <div className="flex items-center justify-between space-x-4 px-4">
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm">
                                Experience {index + 1} {experience.company}
                                <ChevronsUpDown className="h-4 w-4"/>
                                <span className="sr-only">Experience 1</span>
                            </Button>
                        </CollapsibleTrigger>
                        <button type="button"
                                onClick={() => setExperiences(experiences.filter((_, i) => i !== index))}>
                            <span className="sr-only">Remove</span>
                            <Trash className="h-4 w-4 text-red-500"/>
                        </button>
                    </div>
                    {/*<div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
                        @radix-ui/primitives
                    </div>*/}
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
                                />
                                <p className="text-red-500 text-sm">{errors.responsibilities?.message}</p>
                            </div>
                        </div>
                    </CollapsibleContent>
                </Collapsible> )}

                <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => close()}>
                        Cancel
                    </Button>
                    <Button type="button" variant="outline" onClick={() => goBack()}>
                        Back
                    </Button>
                    <Button type="submit">
                        Next
                    </Button>
                </div>
            </div>
        </form>
    </div>)
}
export default Step2
