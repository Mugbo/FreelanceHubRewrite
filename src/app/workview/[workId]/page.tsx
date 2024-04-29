import MaxWidthWrapper from "../../../components/maxWidthWrapper";
import { getPayloadClient } from "../../../get-payload";
import { notFound, useRouter } from "next/navigation";
import FileViewer from "../../../components/FileViewer";
import { Work, WorkFile } from "../../..//payload-types";
import WorkListings from "../../..//components/WorkListings";
import Replies from "../../..//components/Replies";
import { useState } from "react";
import ViewReplies from "../../..//components/ViewReplies";
import React from "react";
import { trpc } from "@/trpc/client";
import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import WorkPayment from "@/components/WorkPayment";

interface WorkViewPageProps {
  params: {
    workId: string;
  };
}

interface User {
  id: string;
}

const Page = async ({ params }: WorkViewPageProps) => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  const { workId } = params;

  const payload = await getPayloadClient();

  const { docs: work } = await payload.find({
    collection: "work",
    limit: 1,
    where: {
      id: {
        equals: workId,
      },
    },
  });

  const [workView] = work;

  let userId: string | undefined;

  if (workView.user && typeof workView.user !== "string") {
    userId = workView.user.id;
  }

  function checkOwnership(
    userId: string | undefined,
    currentUserId: string | undefined
  ) {
    return userId === currentUserId;
  }

  const isOwner = checkOwnership(userId, user?.id);

  function hasWorkFiles(
    workFiles: (string | WorkFile)[] | null | undefined
  ): boolean {
    return !!workFiles && workFiles.length > 0;
  }

  const WorkFilesDisplay = (work: (string | WorkFile)[]): JSX.Element => {
    return (
      <>
        <div className="max-h-[800px] overflow-y-auto border border-gray-300 rounded-lg p-2">
          {work.map((file, index) => {
            if (typeof file === "object" && "url" in file) {
              return (
                <div key={index} className="pt-3">
                  <FileViewer fileUrl={file.url} fileName={file.filename} />
                </div>
              );
            }
            return null;
          })}
        </div>
      </>
    );
  };

  if (!workView) {
    return notFound();
  }

  return (
    <MaxWidthWrapper>
      {isOwner &&
      workView.approved !== "approved" &&
      workView.approved !== "rejected" ? (
        <WorkPayment workId={workId}></WorkPayment>
      ) : null}
      <div className="relative w-full pt-5">
        <WorkListings workItem={workView} index={1} key={`workItem-${1}`} />
      </div>
      <div className="pb-3">
        {hasWorkFiles(workView.workFiles) &&
          WorkFilesDisplay(workView.workFiles || [])}
      </div>

      <Replies params={{ userId: userId || "", workId: workId }}></Replies>
      <ViewReplies query={{ workId: workId }}></ViewReplies>
    </MaxWidthWrapper>
  );
};

export default Page;
