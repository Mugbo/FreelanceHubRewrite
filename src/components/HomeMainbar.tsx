"use client";
import { Work } from "../payload-types";
import { TQueryValidator } from "../lib/validators/query-validator";
import { trpc } from "../trpc/client";
import Link from "next/link";
import WorkListings from "./WorkListings";
import { Separator } from "./ui/separator";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";




interface HomeMainBarProps {
  title: string;
  sub: string;
  href?: string;
  query: TQueryValidator;

}

const FALLBACK_LIMIT = 4;

const HomeMainbar = (props: HomeMainBarProps) => {

  const { title, sub, href, query , } = props;

  const { data: queryResults } = trpc.getAllWorkForMarketplace.useInfiniteQuery(
    {
      limit: query.limit ?? FALLBACK_LIMIT,
      query,
    },
    { getNextPageParam: (lastPage) => lastPage.nextPage }
  );

  const workItems = queryResults?.pages.flatMap((page) => page.items);

  let map: (Work | null)[] = [];
  if (workItems && workItems.length) {
    map = workItems;
  } else if (!(workItems && workItems.length)) {
    map = new Array<null>(query.limit ?? FALLBACK_LIMIT).fill(null);
  }

  return (
    <section className="py-12">
   
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="text-center ">
          {title ? (
            <>
              <div className="mx-auto text-centre flex flex-col items-center max-w-3xl">
                <h1 className="text-xl font-bold tracking-tight text-black-900">
                  {title} available {""}
                  <span className="text-red-600">jobs</span>
                  {""} awaiting your {""}
                  <span className="text-red-600">expertise</span>
                </h1>
              </div>
            </>
          ) : null}
          {sub ? (
            <p className="mx-auto text-md font-bold text-gray-500  max-w-3xl">
              {sub}
            </p>
          ) : null}
        </div>
        {(href ) ? (
          <div className="text-center pb-5">
            <Link
              href={href}
              className="text-base font-medium text-red-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              find more you can work on
            </Link>
          </div>
        ) : null}
        <Separator />
      </div>
      

      <div className="relative mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {map.map((workItems, i) => (
            <WorkListings
              workItem={workItems}
              index={i}
              key={`workItem-${i}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeMainbar;
