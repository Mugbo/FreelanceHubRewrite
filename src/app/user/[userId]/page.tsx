import FileViewer from "../../../components/FileViewer";
import HomeMainbar from "../../..//components/HomeMainbar";
import UserWork from "../../..//components/UserWork";
import MaxWidthWrapper from "../../..//components/maxWidthWrapper";
import { Button } from "../../..//components/ui/button";
import { getPayloadClient } from "../../..//get-payload";
import { User, WorkFile } from "../../..//payload-types";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import StripeAccountSetup from "../../../components/StripeAccountSetup";
import StripeLink from "@/components/StripeLink";
import StripeOnboardingLink from "@/components/StripeOnboardingLink";

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
      <div className=" mt-10 z-10 bg-white shadow-md border border-gray-100 rounded-3xl">
        <div className="px-4 py-5 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-start space-x-6">
            {" "}
            {/* Adjusted for horizontal layout */}
            {/* Image on the left */}
            <Image
              src={imageUrl}
              alt="User Profile"
              width={300}
              height={300}
              className="flex-shrink-0 rounded-lg"
            />
            {/* Text content on the right */}
            <div className="flex flex-col space-y-4">
              {" "}
              {/* Adjusted for vertical layout of text */}
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {user.email}
              </h1>
              <p className="text-lg text-gray-500">{user.biography}</p>
            </div>
          </div>
        </div>
      </div>
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
        query={{ sort: "desc", limit: 4, userId: userId }}
      />
    </MaxWidthWrapper>
  );
};

export default Page;
