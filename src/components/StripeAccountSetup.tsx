"use client"
import { useState } from "react";
import { trpc } from "../trpc/client";
import { toast } from "sonner";
import { Button } from "./ui/button";

const StripeAccountSetup = () => {

    const { mutate, isLoading } = trpc.pay.createStripeAccount.useMutation({
        onError: (error) => {
          toast.error(error.message || "Failed to create Stripe account. Please try again!");
        },
        onSuccess: (data) => {
          toast.success(`Stripe account created successfully! Account ID: ${data.accountId}`);
        },
      });
    
      const handleCreateAccount = () => {
        mutate(); // No need to pass any parameters
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

// "use client"
// import { useState } from "react";
// import { trpc } from "../trpc/client";
// import { toast } from "sonner";

// const StripeAccountSetup = () => {
//     const { mutate, isLoading } = trpc.pay.createStripeAccount.useMutation({
//       onError: (error) => {
//         // Customize error handling as needed
//         if (error.message) {
//           toast.error(error.message);
//         } else {
//           toast.error("Failed to create Stripe account. Please try again!");
//         }
//       },
//       onSuccess: (data) => {
//         // Optionally, handle any follow-up actions
//         toast.success(`Stripe account created successfully! Account ID: ${data.accountId}`);
//       },
//     });
  
//     const handleCreateAccount = () => {
//       mutate();
//     };
  
//     return (
//       <div>
//         <h1>Create Stripe Account</h1>
//         <button onClick={handleCreateAccount} disabled={isLoading}>
//           {isLoading ? 'Creating...' : 'Create Stripe Account'}
//         </button>
//       </div>
//     );
//   };
// export default StripeAccountSetup