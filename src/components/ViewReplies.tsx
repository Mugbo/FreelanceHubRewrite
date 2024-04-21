"use client"
import { TReplyQueryValidator } from "@/lib/validators/replies-query-validator";
import { trpc } from "@/trpc/client";
import { Reply } from "../payload-types";
import ReplyListing from "./ReplyListing";

interface ViewRepliesProps {
  query: TReplyQueryValidator;
}

const ViewReplies = (props: ViewRepliesProps) => {
  const { query } = props;

  const { data: queryResults } =
    trpc.reply.getAllRepliesOnWork.useInfiniteQuery(
      {
        query,
        limit: 100,
      },
      { getNextPageParam: (lastPage) => lastPage.nextPage }
    );


    const repliesView = queryResults?.pages.flatMap((page) => page.items);

    let map: (Reply | null)[] = [];
    if (repliesView && repliesView.length){
        map = repliesView;
    } else if (!(repliesView && repliesView.length)){
        map = new Array<null>(100 ?? 100).fill(null);
    }

    return(
      
    <div className="relative mt-12">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {map.map((repliesView, i) => (
        <ReplyListing
          replyItem={repliesView}
          index={i}
          key={`repliesView-${i}`}
        />
      ))}
    </div>
  </div>
    )



};

export default ViewReplies;
