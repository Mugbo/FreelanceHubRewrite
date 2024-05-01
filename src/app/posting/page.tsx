"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PostDataValidator,
  TPostDataValidator,
} from "../../lib/validators/post-validator";
import { trpc } from "../../trpc/client";
import { ZodError } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CreateWorkPostProps {
  params: {
    userId: string;
  };
}

const FormPage = ({ params }: CreateWorkPostProps) => {
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
  });

  const onSubmit = ({
    title,
    description,
    price,
    category,
  }: TPostDataValidator) => {
    mutate({
      title,
      description,
      price,
      category,
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

      <div>
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <div className="mt-1 flex items-center rounded-md shadow-sm">
          <input
            type="number"
            {...register("price", {
              valueAsNumber: true,
            })}
            defaultValue={0}
            placeholder="Price"
            className="flex-1 min-w-0 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm "
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          {...register("category")}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          defaultValue={"unspecified"}
        >
          <option value="front">Front End</option>
          <option value="back">Back End</option>
          <option value="full">Full stack</option>
          <option value="unspecified">Unspecified</option>
        </select>
      </div>

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
