import UserMainBar from "@/components/UserMainBar"
import MaxWidthWrapper from "@/components/maxWidthWrapper"

const Page = () => {
return(
    <MaxWidthWrapper>
        <UserMainBar title="Fullstack" sub="Help others and earn simultaneously" query={{sort: "desc"}} limit={20} type="none"></UserMainBar>
    </MaxWidthWrapper>
)
}

export default Page