"use client";

import Link from "next/link";
import stripe from "../stripeClient";
import { Button } from "./ui/button";
import { trpc } from "../trpc/client";
import { toast } from "sonner";
import React from "react";
import { string } from "zod";
import { useRouter } from "next/navigation";

interface StripeLink {
  stripePayoutId: string;
}

const StripeOnboardingLink = ({ stripePayoutId }: StripeLink) => {
  const router = useRouter();
  const { mutate, isLoading } = trpc.pay.generateStripeOnboardingLink.useMutation({
    onSuccess: (data) => {
      toast.message("created onboarding link, sending you to stripe!");
      router.push(data.link.url);
    },
    onError: (error) => {
      toast.error(
        `Failed to retrieve Stripe login link. Please try again!`
      );
    },
  });

  const handleAccessStripeDashboard = () => {
    mutate({ accountId: stripePayoutId });
  };

  return (
    <div>
      <Button onClick={handleAccessStripeDashboard} disabled={isLoading}>
        Access Stripe Onboarding
      </Button>
    </div>
  );
};
export default StripeOnboardingLink;
