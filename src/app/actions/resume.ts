'use server';

import {currentUser} from "@clerk/nextjs/server";
import {prisma} from "@/lib/prisma";
import {Resume} from "@/components/ResumeList";

export type ResumeData = {
    id?: string;
    name: string;
    email: string;
    currentCompany:string;
    currentRole:string;
    phone: string;
    address: string;
    summary: string;
    socials?: Social[];
    experiences: Experience[];
    educations: Education[];
    skills: Skill[];
    languages?: Language[];
    certifications?: Certification[];
    projects?: Project[];
    hobbies?: Hobby[];
}

export type Social = {
    id: string;
    name: string;
    url: string;
}

export type Project = {
    id: string;
    name: string;
    description: string;
    role: string;
    startDate: string;
    endDate: string;
}

export type Certification = {
    id: string;
    title: string;
    description: string;
    provider: string;
    certificationNumber: string;
    startDate: string;
    endDate: string;
}

export type Experience = {
    id?: string;
    title: string;
    company: string;
    location: string;
    responsibilities: string;
    startDate: string;
    endDate: string;
}

export type Education = {
    id: string;
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
    description: string;
}

export type Skill = {
    id: string;
    name: string;
    level: string;
}

export type Language = {
    id: string;
    name: string;
    level: string;
}

export type Hobby = {
    id: string;
    name: string;
}

export async function getResume(id: string) {
    const resume = await prisma.resume.findUnique({
        where: { id },
        include: {
            user: true,
        },
    });

    if (!resume) throw new Error("Not found");

    return resume;
}

export async function getResumes(): Promise<Resume[]> {
    const loggedInUser = await currentUser();

    if (!loggedInUser) throw new Error("Unauthorized");

    const userId = loggedInUser.id;

    const user =
        await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
        console.error("User not found");
        return [];
    }

    console.log("User found:", user);

    const result =  await prisma.resume.findMany({
        where: {userId: user.id},
    });

    const newResult = result.map((resume) => {
        const resumeData = resume.content as ResumeData;
        resume.content = resumeData;
        return {...resume, content: resumeData};
    });

    return newResult;
}

export async function createResume(title:string, data: ResumeData) {
    const loggedInUser = await currentUser();

    if (!loggedInUser) throw new Error("Unauthorized");

    const userId = loggedInUser.id;
    const email = loggedInUser.emailAddresses[0].emailAddress;
    const name = loggedInUser.fullName;

    let user =
        await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
        console.error("User not found, creating new user");
        user = await prisma.user.create({ data: { clerkId: userId, email, name } });
    }

    console.log("User found:", user);

    const resume = await prisma.resume.create({
        data: { userId: user.id, title, content: JSON.stringify(data) },
    });

    return resume;
}
