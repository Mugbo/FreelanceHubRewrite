import HomeMainbar from "../../components/HomeMainbar"
import MaxWidthWrapper from "../../components/maxWidthWrapper"

const Page = () =>{
    return(

    <MaxWidthWrapper>
      <HomeMainbar title="newest" sub="Help others and earn simultaneously" query={{sort: "desc"}} limit={20}/>
      
      </MaxWidthWrapper>
    )
}

export default Page