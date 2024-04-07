import MaxWidthWrapper from "@/components/maxWidthWrapper";
import { Button } from "@/components/ui/button";
import { getPayloadClient } from "@/get-payload";
import { User } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface UserPageProps {
  params: {
    userId: string;
  };
}

const Page = async ({ params }: UserPageProps) => {
  const { userId } = params;

  const payload = await getPayloadClient();

  const { docs: users } = await payload.find({
    collection: "users",
    limit: 1,
    where: {
      id: {
        equals: userId,
      },
    },
  });

  const [user] = users;

  if (!user) {
    return notFound();
  }

  const image = user.ProfilePicture;

  const imageUrl = typeof image === "string" ? image : image?.url || "";
  console.log(imageUrl);

  return (
    <MaxWidthWrapper>
      <div>
        <div className="relative w-full">
          <div>{user.email}</div>
        </div>
        <div className="mt-20 mx-auto text-centre flex flex-col items-center max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-black-900">
            {user.email}
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            {user.biography}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6 border border-black">
            <Image src={imageUrl} alt="" width={300} height={300}></Image>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
