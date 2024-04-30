import HomeMainbar from "@/components/HomeMainbar";
import MaxWidthWrapper from "@/components/maxWidthWrapper";

const Page = () => {
  return (
    <MaxWidthWrapper>
      <HomeMainbar
        title="All"
        sub="Take your pick"
        query={{ sort: "desc", limit: 100 }}
      />
    </MaxWidthWrapper>
  );
};

export default Page;
