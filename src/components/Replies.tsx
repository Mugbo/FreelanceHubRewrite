"use client"
import React, { useState } from 'react';
import { ReplyDataValidator, TReplyDataValidator } from "@/lib/validators/reply-validator";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ZodError } from "zod";

interface CreateReplyProps {
    params: {
      userId: string;
      workId: string;
    };
}

const Replies = ({params}: CreateReplyProps) => {
    const { userId, workId } = params;
    const [showForm, setShowForm] = useState(false); // State to toggle the form
    const utils = trpc.useUtils();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<TReplyDataValidator>({
        resolver: zodResolver(ReplyDataValidator)
    });

    const router = useRouter();

    const { mutate } = trpc.reply.createWorkreply.useMutation({
        onError: (err) => {
            if (err instanceof ZodError) {
                toast.error(err.issues[0].message);
            }
            toast.error("Error posting reply, Please try again!");
        },
        onSuccess: () => {
            toggleForm();
            reset({ title: '', description: '' });
            utils.reply.getAllRepliesOnWork.invalidate();
        },
    });

    const onSubmit = ({ title, description, workFiles, user }: TReplyDataValidator) => {
        const filesArray = workFiles ? Array.from(workFiles).map(file => (file as File).name) : [];
        mutate({
            title,
            description,
            workFiles: filesArray,
            user: userId,
            work: workId,
        });
    };

    const toggleForm = () => {
        setShowForm(!showForm); // Toggle the visibility of the form
    };

    return (
        <>
            <button
                onClick={toggleForm}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition duration-300"
            >
                {showForm ? 'Cancel Reply' : 'Create Reply'}
            </button>

            {showForm && (
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto mt-10 space-y-4">
                    <input
                        {...register("title")}
                        placeholder="Title"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-300"
                    />
                    <textarea
                        {...register("description")}
                        placeholder="Description"
                        className="w-full h-32 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-300 resize-none"
                    />
                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition duration-300">
                        Submit Reply
                    </button>
                    {errors.title && <span className="text-red-500">{errors.title.message}</span>}
                    {errors.description && <span className="text-red-500">{errors.description.message}</span>}
                </form>
            )}
        </>
    );
};

export default Replies;
