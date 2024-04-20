"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PostDataValidator,
  TPostDataValidator,
} from "../../lib/validators/post-validator";
import { trpc } from "@/trpc/client"; // Ensure this import points to your configured TRPC client
import { ZodError } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CreateWorkPostProps {
    params: {
      userId: string;
    };
  }

const FormPage = ({params}:CreateWorkPostProps) => {
    const { userId } = params;
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<TPostDataValidator>({
    resolver: zodResolver(PostDataValidator),
  });

  const router = useRouter();

  const { mutate } = trpc.work.createWorkPosting.useMutation({
    onError: (err) => {
      if (err instanceof ZodError) {
        toast.error(err.issues[0].message);
      }
      toast.error("Error posting work, Please try again!");
    },

    onSuccess: () => {
      router.push(`/work`);
    },
  }); // Correct usage of TRPC mutation

  const onSubmit = ({ title, description, workFiles, user }: TPostDataValidator) => {
    const filesArray = workFiles ? Array.from(workFiles).map(file => (file as File).name) : [];

    mutate({
      title,
      description,
      workFiles: filesArray,
      user: userId,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto mt-10 space-y-4"
    >
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
  {/* <input
        type="file"
        multiple
        onChange={(event) => {
          // When files are selected, manually update the form field
          const files = event.target.files;
          if (files) {
            const fileNames = Array.from(files).map(file => (file as File).name);
            setValue("workFiles", fileNames, { shouldValidate: true });
          }
        }}
        className="file:bg-blue-50 file:border file:border-blue-500 file:px-4 file:py-2 file:rounded-md file:text-blue-700 file:cursor-pointer hover:file:bg-blue-100"
      /> */}

<input
  type="file"
  multiple
  onChange={(event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileNames = Array.from(files).map(file => (file as File).name); // or whatever file data you need to send
      setValue("workFiles", fileNames, { shouldValidate: true });
    } else {
      setValue("workFiles", [], { shouldValidate: true }); // Explicitly setting an empty array if no files selected
    }
  }}
  className="file:bg-blue-50 file:border file:border-blue-500 file:px-4 file:py-2 file:rounded-md file:text-blue-700 file:cursor-pointer hover:file:bg-blue-100"
/>


      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition duration-300"
      >
        Create Work Posting
      </button>
      {errors.title && (
        <span className="text-red-500">{errors.title.message as string}</span>
      )}
      {errors.description && (
        <span className="text-red-500">
          {errors.description.message as string}
        </span>
      )}
    </form>
  );
};

export default FormPage;
