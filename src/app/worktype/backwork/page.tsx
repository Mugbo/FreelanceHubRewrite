import HomeMainbar from "../../../components/HomeMainbar"
import MaxWidthWrapper from "../../../components/maxWidthWrapper"

const Page = () =>{
    return(

    <MaxWidthWrapper>
      <HomeMainbar title="Back-end" sub="Help others and earn simultaneously" query={{sort: "desc"}} limit={20} type="back"/>
      
      </MaxWidthWrapper>
    )
}

export default Page