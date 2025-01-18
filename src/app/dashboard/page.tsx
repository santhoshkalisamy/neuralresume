'use client';
import React, {useState} from 'react'
import { useUser } from '@clerk/clerk-react'
import {ContentLayout} from "@/components/content-layout";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import {createResume} from "@/app/actions/resume";
import ResumeList from "@/components/ResumeList";

const Page = () => {
    const user = useUser();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    async function handleCreate() {
        try {
            const response = await createResume(title, JSON.parse(content));
            console.log("Resume Created:", response);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <ContentLayout title={`${user?.user?.firstName ? 'Welcome ' + user?.user?.firstName : ''}`} >
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">Home</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Dashboard</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <section>
                <div className="p-10">
                    <h1 className="text-2xl font-bold">Create Resume</h1>
                    <input
                        type="text"
                        placeholder="Title"
                        className="border p-2 mt-2 w-full"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Content (JSON format)"
                        className="border p-2 mt-2 w-full"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <button
                        onClick={handleCreate}
                        className="bg-blue-600 text-white px-4 py-2 mt-4"
                    >
                        Save Resume
                    </button>
                </div>
            </section>
            <section>
                <ResumeList />
            </section>
        </ContentLayout>
    )
}
export default Page
