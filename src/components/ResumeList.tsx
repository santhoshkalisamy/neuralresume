import React, {useEffect, useState} from 'react';
import {FileText, ExternalLink, Trash2} from 'lucide-react';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {getResumes, ResumeData} from "@/app/actions/resume";
import ResumeCreationModal from "@/components/ResumeCreatorModal";

export type Resume = {
    content: ResumeData;
    id: string;
    createdAt: Date;
    userId: string;
    title: string;
    lastUpdated: Date;
}

const ResumeList = () => {

    const [resumes, setResumes] = useState<Resume[] | [] | null>([]);
    const [loading, setLoading] = useState(false);

    async function loadResumes() {
        try {
            const resumes:Resume[] = await getResumes();
            setResumes(resumes);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        setLoading(true);
        loadResumes().then(() => { console.log("Resumes loaded"); setLoading(false); });
    }, []);


    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">My Resumes</h1>
                    <ResumeCreationModal />
                {/*<CreateResumeForm />*/}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resumes?.map((resume) => (
                    <Card key={resume.id} className="flex flex-col">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="w-5 h-5"/>
                                {resume.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-500">
                                Last updated: {new Date(resume.lastUpdated)?.toLocaleDateString()}
                            </p>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2 mt-auto">
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                                <ExternalLink className="w-4 h-4"/>
                                Edit
                            </Button>
                            <Button variant="destructive" size="sm" className="flex items-center gap-1">
                                <Trash2 className="w-4 h-4"/>
                                Delete
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {resumes?.length === 0 && (
                <div className="text-center py-12">
                    <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4"/>
                    <h3 className="text-xl font-semibold mb-2">No resumes yet</h3>
                    <p className="text-gray-500 mb-4">Create your first resume to get started</p>
                </div>
            )}
        </div>
    );
};

export default ResumeList;
