import MaxWidthWrapper from "../../../components/maxWidthWrapper";
import { getPayloadClient } from "../../../get-payload";
import { notFound } from "next/navigation";
import FileViewer from "../../../components/FileViewer";
import { Work, WorkFile } from "../../..//payload-types";
import WorkListings from "../../..//components/WorkListings";
import Replies from "../../..//components/Replies";
import { useState } from "react";
import ViewReplies from "../../..//components/ViewReplies";
import React from "react";

interface WorkViewPageProps {
  params: {
    workId: string;
  };
}

interface User {
  id: string;
  // other properties of User
}

const Page = async ({ params }: WorkViewPageProps) => {
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

  // const userId = workView.user!.id

  let userId: string | undefined;

  if (workView.user && typeof workView.user !== 'string') {
    userId = workView.user.id;
  }




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
      <div className="relative w-full pt-5">
        <WorkListings workItem={workView} index={1} key={`workItem-${1}`} />
      </div>
      <div className="pb-3">
      {hasWorkFiles(workView.workFiles) && WorkFilesDisplay(workView.workFiles|| [])}
      </div>

       <Replies params= {{userId: userId || "", workId: workId}}>

        </Replies>
        <ViewReplies query ={{workId:workId}}></ViewReplies>
    </MaxWidthWrapper>
  );
};

export default Page;
