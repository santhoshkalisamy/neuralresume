import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ResumeData } from '@/app/actions/resume';

type ResumeContextType = {
    newResume: ResumeData;
    setNewResume: React.Dispatch<React.SetStateAction<ResumeData>>;
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
    const [newResume, setNewResume] = useState<ResumeData>({
        name: "",
        currentCompany: "",
        currentRole: "",
        experiences: [],
        skills: [],
        educations: [],
        certifications: [],
        email: "",
        phone: "",
        address: "",
        summary: "",
    });

    return (
        <ResumeContext.Provider value={{ newResume, setNewResume }}>
            {children}
        </ResumeContext.Provider>
    );
};

export const useResume = () => {
    const context = useContext(ResumeContext);
    if (!context) {
        throw new Error('useResume must be used within a ResumeProvider');
    }
    return context;
};
