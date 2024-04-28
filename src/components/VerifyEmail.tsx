"use client";

import { trpc } from "@/trpc/client";
import { XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

interface verifyEmailProps {
  token: string;
}

const VerifyEmail = ({ token }: verifyEmailProps) => {
  //destructure from trpc beu
  const { data, isError } = trpc.auth.verifyEmail.useQuery({
    token,
  });

  if (isError) {
    return (
      <div className="flex flex-col items-center gap -2">
        <XCircle className="h-8 w-8 text-red-600" />
        <h3 className="font-semibold text-xl">There has been a Problem</h3>
        <p className="text-muted-foreground text-sm">
          invalid token. try again
        </p>
      </div>
    );
  }

  if (data?.success) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <div className="relative mb-4 h-60 w-60 text-muted-foreground">
          <Image src="/screenshot.io" fill alt="email sent" />
        </div>

        <h3 className="font-semibold text-2xl">You are all ready to go </h3>
        <Link className={buttonVariants({className: "mt-4"})}
        href="/sign-in">
            Sign in
        </Link>
      </div>
    );
  }
};

export default VerifyEmail;
