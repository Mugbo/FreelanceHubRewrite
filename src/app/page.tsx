import HomeMainbar from "@/components/HomeMainbar";
import MaxWidthWrapper from "@/components/maxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { getServerSideUser } from "@/lib/payload-utils";
import { ArrowDownToLineIcon, CheckCircle, Leaf } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

const perks = [
  {
    name: "download repos",
    icon: ArrowDownToLineIcon,
    description: "Get help with you coding needs",
  },
  {
    name: "guarandeed quality",
    icon: CheckCircle,
    description: "Code review from admins available to ensure code quality",
  },
  {
    name: "For your development needs",
    icon: Leaf,
    description: "Hire delevopers anytime from anywhere",
  },
];

export default async function Home() {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);
  return (
    <>
      <MaxWidthWrapper>
        <div className="mt-20 mx-auto text-centre flex flex-col items-center max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-black-900">
            The worlds marketplace for {""}
            <span className="text-red-600">Coding Collaboration</span>
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Welcome to FreelaneHUB.{" "}
          </p>
          <div className="flex flex-row gap-4 mt-6">
            <Link href="/market" className={buttonVariants()}>
              View the market
            </Link>
            {user && <Link href="/posting" className={buttonVariants()}>
              Create a post
            </Link>}
          </div>
          <div className="mt-6">
            <Button variant="ghost">
              Expert development at your fingertips &rarr;
            </Button>
          </div>
        </div>
        <HomeMainbar
          title="newest"
          sub="Help others and earn simultaneously"
          href="/work"
          query={{ sort: "desc", limit: 4 }}
          type="none"
        />
      </MaxWidthWrapper>

      <section className="'border-t border-gray-200 bg-gray-50">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => (
              <div
                key={perk.name}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              >
                <div className="md: flex-shrink-0 flex justify-center ">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-red-100 text-red-900">
                    {<perk.icon className="w-1/3 h-1/3" />}
                  </div>
                </div>
                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6"></div>
                <h3 className="text-base font medium text-gray-900">
                  {perk.name}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  {perk.description}
                </p>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
