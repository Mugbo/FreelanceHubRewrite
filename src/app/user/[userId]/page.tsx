import MaxWidthWrapper from "../../..//components/maxWidthWrapper";
import { getPayloadClient } from "../../..//get-payload";
import { notFound } from "next/navigation";
import React from "react";
import StripeAccountSetup from "../../../components/StripeAccountSetup";
import StripeLink from "@/components/StripeLink";
import StripeOnboardingLink from "@/components/StripeOnboardingLink";
import UserWork from "@/components/UserWork";
import Image from "next/image";
import UserContain from "@/components/UserContain";

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

  return (
    <MaxWidthWrapper>
      <UserContain imageUrl={imageUrl} user={user}/>
      <div className="flex justify-center pt-2">
        {!user.stripePayoutId ? (
          <StripeAccountSetup />
        ) : user.onboardedStripe === "verified" ? (
          <StripeLink stripePayoutId={user.stripePayoutId}></StripeLink>
        ) : (
          <StripeOnboardingLink
            stripePayoutId={user.stripePayoutId}
          ></StripeOnboardingLink>
        )}
      </div>
      <UserWork
        title=""
        sub={"Post History"}
        query={{ sort: "desc", limit: 100, userId: userId }}
      />
    </MaxWidthWrapper>
  );
};

export default Page;
