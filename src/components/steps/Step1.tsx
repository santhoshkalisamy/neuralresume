import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import * as z from 'zod';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ChevronRight} from "lucide-react";
import {useResume} from "@/components/ResumeContext";

const Step1Schema = z.object({
    fullName: z.string().min(3), currentCompany: z.string().min(2), currentRole: z.string().min(5)
});


type Step1FormData = z.infer<typeof Step1Schema>;

interface Step1Props {
    nextStep: () => void
}

const Step1 = ({nextStep}: Step1Props) => {

    const {newResume, setNewResume} = useResume();

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
        setNewResume({
            ...newResume,
            name: data.fullName,
            currentCompany: data.currentCompany,
            currentRole: data.currentRole
        })
        nextStep();
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
                    <Button type="submit">
                        Next <ChevronRight/>
                    </Button>
                </div>
            </div>
        </form>
    </div>)
}
export default Step1
