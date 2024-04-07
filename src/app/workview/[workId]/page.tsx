import MaxWidthWrapper from "@/components/maxWidthWrapper";
import { getPayloadClient } from "../../../get-payload";
import { notFound } from "next/navigation";
import FileViewer from "../../../components/FileViewer";
import { WorkFile } from "@/payload-types";

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
  if (!workView){
    return notFound()
  }

  return (
    <MaxWidthWrapper>
      <div className="relative w-full">
        <div>{workView.title}</div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
