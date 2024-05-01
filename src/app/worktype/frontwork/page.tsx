import HomeMainbar from "../../../components/HomeMainbar"
import MaxWidthWrapper from "../../../components/maxWidthWrapper"

const Page = () =>{
    return(

    <MaxWidthWrapper>
      <HomeMainbar title="Front-end" sub="Help others and earn simultaneously" query={{sort: "desc"}} limit={20} type="front"/>
      
      </MaxWidthWrapper>
    )
}

export default Page