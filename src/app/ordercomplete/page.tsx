import MaxWidthWrapper from "@/components/maxWidthWrapper";
import { getPayloadClient } from "../../get-payload";
import { string } from "zod";
import { Work } from "@/payload-types";
import { trpc } from "@/trpc/client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface OrderCompleteProps {
  params: {
    OrderId: string;
  };
}

const OrderComplete = async ({ params }: OrderCompleteProps) => {
  const router = useRouter()

  const OrderId = params.OrderId;

  const payload = await getPayloadClient();

  const { docs: workOrderArray } = await payload.find({
    collection: "workOrder",
    where: {
      // approved: {
      //   equals: "approved",
      // },
    },
    depth: 1,
    limit: 1,
  });
  const [workOrder] = workOrderArray;

const workObject = workOrder.work as Work;


  const { docs: work } = await payload.find({
    collection: "work",
    where: {
      id: {
        equals: workObject.id,
      },
    },
  });
  const [workpaidfor] = work;

  const { data } = trpc.pay.checkOrderStatus.useQuery(
    { orderId: workpaidfor.id },
    {
      enabled: workOrder._isPaid === false,
      refetchInterval: (data) =>
        data?.isPaid ? false : 1000,
    }
  )



  useEffect(() => {
    if (data?.isPaid) router.refresh()
  }, [data?.isPaid, router])

  return (
    <MaxWidthWrapper>
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto mt-10">
        <div className="text-green-600 font-semibold text-lg">
          You have successfully paid for
        </div>
        <div className="text-xl font-bold text-gray-800 mt-2">
          {workpaidfor.title}
        </div>
        <div className="text-gray-600 mt-4">
          It will now show up in the marketplace for users.
        </div>
        <div className="text-gray-500 mt-2">
          Approval status now:{" "}
          <span className="text-gray-900 font-medium">
            {workpaidfor.approved}
          </span>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};
export default OrderComplete;
