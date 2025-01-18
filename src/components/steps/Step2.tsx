import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Experience, ResumeData} from "@/app/actions/resume";
import * as z from 'zod';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import { Textarea } from "@/components/ui/textarea"

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
