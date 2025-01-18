import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {ResumeData} from "@/app/actions/resume";
import * as z from 'zod';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

const Step1Schema = z.object({
    fullName: z.string().min(3), currentCompany: z.string().min(2), currentRole: z.string().min(5)
});

interface Step1Props {
    newResume: ResumeData;
    updateResume: (resume: ResumeData) => void;
    close: () => void;
    goBack: () => void;
}

type Step1FormData = z.infer<typeof Step1Schema>;

const Step3 = ({newResume, updateResume, close, goBack}: Step1Props) => {

    const {register, handleSubmit, formState: {errors}} = useForm<Step1FormData>({
        resolver: zodResolver(Step1Schema),
        defaultValues: {
            fullName: newResume.name,
            currentCompany: newResume.currentCompany,
            currentRole: newResume.currentRole
        }
    });

    const onSubmit = (data: Step1FormData) => {
        console.log(data);
        updateResumeAndGoToNextStep(data);
    }

    function updateResumeAndGoToNextStep(data: Step1FormData) {
        updateResume({
            ...newResume,
            name: data.fullName,
            currentCompany: data.currentCompany,
            currentRole: data.currentRole
        })
    }

    return (<div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6 pb-4">
                <h2 className="text-lg font-bold">Basic Information</h2>
                {/* Step 1 Form */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                            {...register('fullName')}
                            id="fullName"
                            name="fullName"
                            placeholder="John Doe"
                            required={true}
                        />
                        <p className="text-red-500 text-sm">{errors.fullName?.message}</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="currentCompany">Current Company</Label>
                        <Input
                            {...register('currentCompany')}
                            id="currentCompany"
                            name="currentCompany"
                            placeholder="Company Name"
                            required={true}
                        />
                        <p className="text-red-500 text-sm">{errors.currentCompany?.message}</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="currentRole">Current Role</Label>
                        <Input
                            {...register('currentRole')}
                            id="currentRole"
                            name="currentRole"
                            placeholder="Senior Software Engineer"
                            required={true}
                        />
                        <p className="text-red-500 text-sm">{errors.currentRole?.message}</p>
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
export default Step3
