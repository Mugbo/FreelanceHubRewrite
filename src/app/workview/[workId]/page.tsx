import MaxWidthWrapper from "@/components/maxWidthWrapper";
import { getPayloadClient } from "../../../get-payload";
import { notFound } from "next/navigation";
import FileViewer from "../../../components/FileViewer";
import { Work, WorkFile } from "@/payload-types";
import WorkListings from "@/components/WorkListings";

interface WorkViewPageProps {
  params: {
    workId: string;
  };
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

  const WorkFilesDisplay = (work: (string | WorkFile)[]): JSX.Element => {
    return (<>
      <div className="max-h-[800px] overflow-y-auto border border-gray-300 p-2">
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
      <div>
        testsvstvsgy
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
      {WorkFilesDisplay(workView.workFiles)}
    </MaxWidthWrapper>
  );
};

export default Page;
