"use client";

import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface IsPaidProps {
  orderId: string;
  isPaid: boolean;
}

const IsPaid = ({ orderId, isPaid }: IsPaidProps) => {
  const router = useRouter();

  const { data } = trpc.pay.checkOrderStatus.useQuery(
    { orderId },
    {
      enabled: isPaid === false,
      refetchInterval: (data) => (data?.isPaid ? false : 1000),
    }
  );

  useEffect(() => {
    if (data?.isPaid) router.refresh();
  }, [data?.isPaid, router]);

  return(
    <div className="text-gray-500 mt-2">
          Payment status now:{" "}
          <span className="text-gray-900 font-medium">
            {isPaid}
          </span>
        </div>
  )
};

export default IsPaid;
