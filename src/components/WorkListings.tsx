"use client";
import { useEffect, useState } from "react";
import { Work } from "../payload-types";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { cn, pricingFormat } from "../lib/utils";
import { CATEGORIES } from "@/config";

interface WorkListingsProps {
  workItem: Work | null;
  index: number;
}

const WorkListings = ({ workItem, index }: WorkListingsProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100);

    return () => clearTimeout(timer); 
  }, [index]);

  if (!workItem || !isVisible) {
    return <WorkPlaceHolder />;
  }

  const category = CATEGORIES.find(
    ({ value }) => value === workItem.category
  )?.label;

  if (isVisible && workItem) {
    return (
      <Link
        className={cn(
          "invisible h-full w-full cursor-pointer group/main",
          {
            "visible animate-in fade-in-5": isVisible,
          }
          
        )}
        href={`/workview/${workItem.id}`}
      >
        <div className="p-4  rounded shadow-md border border-black flex items-center justify-between mb-3">
          <div>
            <h3 className="font-semibold text-lg text-red-900 py-1 px-2 rounded mb-2">
              {workItem.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2">{workItem.description}</p>
          </div>
          <div className="text-right">
            <p>Reward</p>
            <p className="text-base font-semibold text-gray-800">
              {pricingFormat(workItem.price)}
            </p>
            <p
              className="text-base text-gray-700"
              style={{ minWidth: "10rem" }}
            >
              {category}
            </p>
          </div>
        </div>
      </Link>
    );
  }
};

const WorkPlaceHolder = () => {
  return (
    // <div className="flex flex-col w-full">
    //     <div>
    //         <Skeleton/>
    //     </div>
    //     <Skeleton />
    //     <Skeleton />
    //     <Skeleton />
    // </div>
    <div className="p-4 bg-white rounded shadow-md">
      <div className="mb-4">
        <Skeleton className="h-2 w-3/4 rounded-full" />
      </div>
      <div className="mb-2">
        <Skeleton className="h-2 w-full rounded" style={{ height: "0.5rem" }} />
      </div>
      <div className="mb-2">
        <Skeleton className="h-2 w-full rounded" style={{ height: "0.5rem" }} />
      </div>
      <div className="mb-2">
        <Skeleton className="h-2 w-full rounded" style={{ height: "0.5rem" }} />
      </div>
    </div>
  );
};

export default WorkListings;
