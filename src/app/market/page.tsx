import HomeMainbar from "@/components/HomeMainbar";
import MaxWidthWrapper from "@/components/maxWidthWrapper";

const Page = () => {
  return (
    <MaxWidthWrapper>
      <HomeMainbar
        title="jhon"
        sub="Star app is looking sweet"
        href="/jhonson"
        query={{ sort: "desc", limit: 10 }}
      />
    </MaxWidthWrapper>
  );
};

export default Page;
