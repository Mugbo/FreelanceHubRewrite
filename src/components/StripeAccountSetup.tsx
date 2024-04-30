"use client"
import { useState } from "react";
import { trpc } from "../trpc/client";
import { toast } from "sonner";
import { Button } from "./ui/button";

const StripeAccountSetup = () => {

    const { mutate} = trpc.pay.createStripeAccount.useMutation({
        onError: (error) => {
          toast.error(error.message || "Failed to create Stripe account. Please try again!");
        },
        onSuccess: (data) => {
          toast.success(`Stripe account created successfully! Account ID: ${data.accountId}`);
        },
      });
    
      const handleCreateAccount = () => {
        mutate(); 
      };
    
      return (
        <div>
          <Button onClick={handleCreateAccount}>
            {'Create Stripe Account'}
          </Button>
        </div>
      );
    };
export default StripeAccountSetup