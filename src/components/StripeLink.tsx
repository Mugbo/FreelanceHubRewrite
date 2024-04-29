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

const StripeLink = ({ stripePayoutId }: StripeLink) => {
  const router = useRouter();
  const { mutate, isLoading } = trpc.pay.generateStripeLoginLink.useMutation({
    onSuccess: (data) => {
      toast.message("sending you to stripe!");
      router.push(data.url);

      console.log(data);
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
        Access Stripe Dashboard
      </Button>
    </div>
  );
};
export default StripeLink;
