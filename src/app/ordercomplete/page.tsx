import { string } from "zod"

interface OrderCompleteProps {
    params: {
        workId: string
    }
}

const OrderComplete = ({params}: OrderCompleteProps) => {

    const WorkId = params.workId


}
export default OrderComplete