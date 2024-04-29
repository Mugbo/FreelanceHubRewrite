"use client"

import { trpc } from "@/trpc/client"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"


 interface WorkPaymentProps  {
  workId: string
}


const WorkPayment = ({workId}: WorkPaymentProps) => {

    const router = useRouter()

    const { mutate: createCheckoutSession } =
    trpc.pay.initiateSession.useMutation({
      onSuccess: ({ url }) => {
        if (url) router.push(url)
      },
    })

return(
    <Button
    onClick={() =>
      createCheckoutSession({ workId })
    }
    className='w-full'
    size='lg'>
    Pay the reward so it shows on WorkListings
  </Button>
)
}
export default WorkPayment