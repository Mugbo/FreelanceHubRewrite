"use client";
import { useEffect, useState } from "react";
import { Reply, Work } from "../payload-types";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { cn, pricingFormat } from "../lib/utils";
import { CATEGORIES } from "@/config";
import { ArrowDown, ArrowUp } from "lucide-react";
import MaxWidthWrapper from "./maxWidthWrapper";

interface ReplyListingProps {
  replyItem: Reply | null;
  index: number;
}

const ReplyListing = ({ replyItem, index }: ReplyListingProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hidePlaceholder, setHidePlaceholder] = useState(false);
  const [downVoteIsHighlighted, setDownVoteIsHighlighted] = useState(false);
  const [upVoteIsHighlighted, setUpVoteIsHighlighted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100);

    const placeholderTimer = setTimeout(() => {
      setHidePlaceholder(true);
    }, 5000); // 5000 milliseconds equals 5 seconds

    return () => {
      clearTimeout(timer);
      clearTimeout(placeholderTimer);
    };
  }, [index]);

  const toggleUpVoteHighlight = () => {
    setUpVoteIsHighlighted(!upVoteIsHighlighted);
    setDownVoteIsHighlighted(false);

  };
  const toggleDownVoteHighlight = () => {
    setDownVoteIsHighlighted(!downVoteIsHighlighted);
    setUpVoteIsHighlighted(false);

  };

    const toggleExpand = () => setIsExpanded(!isExpanded);

  if ((!replyItem || !isVisible) && !hidePlaceholder) {
    return <WorkPlaceHolder />;
  }

  if (isVisible && replyItem) {
    return (
      <div className="p-4 rounded shadow-md border border-black flex items-center justify-between mb-3 space-x-4 break-words">
        <div className="flex flex-col items-start justify-center pr-5 border-r border-gray-400">
          <div className="flex gap-2">
            <p className="text-lg text-green-600">0</p>
            <ArrowUp
              className={`transition duration-300 cursor-pointer ${
                upVoteIsHighlighted ? "text-green-500" : "text-gray-500"
              }`}
              onClick={toggleUpVoteHighlight}
            />
          </div>
          <p className="text-lg text-gray-600">votes</p>
          <div className="flex gap-2">
            <ArrowDown
              className={`transition duration-300 cursor-pointer ${
                downVoteIsHighlighted ? "text-red-500" : "text-gray-500"
              }`}
              onClick={toggleDownVoteHighlight}
            />
            <p className="text-md text-red-600">0</p>
          </div>
        </div>
        <div className="flex-grow pl-5">
          <Link href={`/workview/${replyItem.id}`} className="hover:underline">
            <h3 className="font-semibold text-lg text-red-900 py-1 mb-2">
              {replyItem.title}
            </h3>
          </Link>
          <p className="text-sm text-gray-600" style={{ maxWidth: "25rem" }}>
            {replyItem.description}
          </p>
        </div>
      </div>
    );
  }
};

const WorkPlaceHolder = () => {
  return (
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

export default ReplyListing;
